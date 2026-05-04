/**
 * Fitkaar Wishlist (#15)
 * localStorage-backed wishlist with heart-fill toggling on product cards + product page,
 * and a renderer for /pages/wishlist.
 */
(function() {
  var STORAGE_KEY = 'fitkaar:wishlist';

  function read() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function write(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) {}
    window.dispatchEvent(new CustomEvent('fk-wishlist:updated', { detail: { count: list.length } }));
  }
  function has(id) {
    id = String(id);
    return read().some(function(item) { return String(item.id) === id; });
  }
  function add(item) {
    if (!item || !item.id) return;
    var list = read();
    if (list.some(function(i) { return String(i.id) === String(item.id); })) return;
    list.unshift({
      id:      String(item.id),
      handle:  item.handle  || '',
      url:     item.url     || '',
      title:   item.title   || '',
      price:   item.price   != null ? item.price   : null,
      compare: item.compare != null ? item.compare : null,
      image:   item.image   || ''
    });
    if (list.length > 60) list = list.slice(0, 60);
    write(list);
  }
  function remove(id) {
    id = String(id);
    var list = read().filter(function(i) { return String(i.id) !== id; });
    write(list);
  }
  function toggle(item) {
    if (has(item.id)) { remove(item.id); return false; }
    add(item); return true;
  }

  // Public API
  window.FkWishlist = { read: read, has: has, add: add, remove: remove, toggle: toggle };

  // Update visual state of every wishlist heart on the page
  function syncAllHearts() {
    document.querySelectorAll('[data-wishlist-heart]').forEach(function(el) {
      var id = el.getAttribute('data-wishlist-id');
      el.classList.toggle('is-active', has(id));
    });
  }

  // Wire click handlers on every heart with data-wishlist-heart
  function bindHearts() {
    document.querySelectorAll('[data-wishlist-heart]:not([data-wishlist-bound])').forEach(function(btn) {
      btn.setAttribute('data-wishlist-bound', '1');
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var item = {
          id:      btn.getAttribute('data-wishlist-id'),
          handle:  btn.getAttribute('data-wishlist-handle')  || '',
          url:     btn.getAttribute('data-wishlist-url')     || '',
          title:   btn.getAttribute('data-wishlist-title')   || '',
          price:   parseInt(btn.getAttribute('data-wishlist-price')   || '0', 10) || 0,
          compare: parseInt(btn.getAttribute('data-wishlist-compare') || '0', 10) || 0,
          image:   btn.getAttribute('data-wishlist-image')   || ''
        };
        toggle(item);
        syncAllHearts();
      });
    });
  }

  // ── Server-side product lookup (injected by wishlist-page.liquid) ──────────
  // Keyed by product ID string → { image, price, compare }
  // Used to get fresh CDN URLs and current pricing on the wishlist page.
  function getProductLookup() {
    try {
      var el = document.getElementById('FkProductLookup');
      return el ? JSON.parse(el.textContent) : {};
    } catch (e) { return {}; }
  }

  // Wishlist page renderer — looks for #FkWishlistGrid
  function renderWishlistPage() {
    var grid  = document.getElementById('FkWishlistGrid');
    var empty = document.getElementById('FkWishlistEmpty');
    if (!grid) return;

    var items = read();
    if (items.length === 0) {
      grid.innerHTML = '';
      if (empty) empty.style.display = 'block';
      return;
    }
    if (empty) empty.style.display = 'none';

    var lookup = getProductLookup();

    grid.innerHTML = items.map(function(it) {
      // Prefer fresh server-side data for image/price/compare
      var fresh   = lookup[String(it.id)] || {};
      var imgUrl  = (fresh.image && fresh.image !== '')
                      ? fresh.image
                      : (it.image || '');
      var price   = (fresh.price   != null) ? fresh.price   : (it.price   || 0);
      var compare = (fresh.compare != null) ? fresh.compare : (it.compare || 0);

      var imgHtml = imgUrl
        ? '<img src="' + escapeAttr(imgUrl) + '" alt="' + escapeAttr(it.title) + '" loading="eager">'
        : '<div class="fk-wl-noimg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9l4-4 4 4 4-4 4 4"/><circle cx="8.5" cy="13.5" r="1.5"/></svg></div>';

      var priceHtml = '';
      if (price > 0) {
        if (compare > 0 && compare > price) {
          var pct = Math.round((compare - price) * 100 / compare);
          priceHtml = '<div class="fk-wl-card__price">' +
            '<span class="fk-wl-price-sale">₹' + Math.round(price / 100) + '/-</span>' +
            '<span class="fk-wl-price-compare">₹' + Math.round(compare / 100) + '/-</span>' +
            '<span class="fk-wl-price-off">' + pct + '% OFF</span>' +
          '</div>';
        } else {
          priceHtml = '<div class="fk-wl-card__price">₹' + Math.round(price / 100) + '/-</div>';
        }
      }

      return '<article class="fk-wl-card" data-wl-id="' + escapeAttr(it.id) + '">' +
               '<a href="' + escapeAttr(it.url || '#') + '" class="fk-wl-card__link">' +
                 '<div class="fk-wl-card__image">' + imgHtml + '</div>' +
                 '<div class="fk-wl-card__info">' +
                   '<h3 class="fk-wl-card__title">' + escapeHtml(it.title) + '</h3>' +
                   priceHtml +
                 '</div>' +
               '</a>' +
               '<button type="button" class="fk-wl-card__remove is-active" aria-label="Remove from wishlist" ' +
                 'data-wishlist-heart data-wishlist-id="' + escapeAttr(it.id) + '">' +
                 '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
               '</button>' +
             '</article>';
    }).join('');

    bindHearts();
    syncAllHearts();

    // Remove card when heart is clicked on wishlist page
    grid.querySelectorAll('[data-wishlist-heart]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var card = btn.closest('[data-wl-id]');
        if (card) card.remove();
        if (grid.children.length === 0 && empty) empty.style.display = 'block';
      });
    });
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
  function escapeAttr(s) { return escapeHtml(s).replace(/"/g, '&quot;'); }

  function init() {
    bindHearts();
    syncAllHearts();
    renderWishlistPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // If wishlist updates on another tab, sync UI here too
  window.addEventListener('storage', function(e) {
    if (e.key === STORAGE_KEY) {
      syncAllHearts();
      renderWishlistPage();
    }
  });

  window.addEventListener('fk-wishlist:updated', renderWishlistPage);
})();
