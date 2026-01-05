/**
 * Cart functionality for Fitkaar
 */

class FitkaarCart {
  constructor() {
    this.cart = null;
    this.init();
  }

  async init() {
    await this.fetchCart();
    this.bindEvents();
    this.updateCartUI();
  }

  async fetchCart() {
    try {
      const response = await fetch('/cart.js');
      this.cart = await response.json();
      return this.cart;
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      return null;
    }
  }

  bindEvents() {
    // Add to cart forms
    document.querySelectorAll('form[action="/cart/add"]').forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const variantId = formData.get('id');
        const quantity = formData.get('quantity') || 1;

        await this.addItem(variantId, quantity);
      });
    });

    // Quantity change handlers (for cart page)
    document.addEventListener('change', (e) => {
      if (e.target.matches('.cart-quantity-input')) {
        const line = e.target.dataset.line;
        const quantity = parseInt(e.target.value);
        this.updateItem(line, quantity);
      }
    });

    // Remove item handlers
    document.addEventListener('click', (e) => {
      if (e.target.matches('.cart-remove-item') || e.target.closest('.cart-remove-item')) {
        e.preventDefault();
        const button = e.target.closest('.cart-remove-item');
        const line = button.dataset.line;
        this.removeItem(line);
      }
    });
  }

  async addItem(variantId, quantity = 1) {
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: parseInt(variantId),
          quantity: parseInt(quantity)
        })
      });

      if (!response.ok) {
        const error = await response.json();
        this.showNotification(error.description || 'Failed to add item', 'error');
        return null;
      }

      const item = await response.json();
      await this.fetchCart();
      this.updateCartUI();
      this.showNotification('Added to cart!', 'success');
      return item;
    } catch (error) {
      console.error('Add to cart error:', error);
      this.showNotification('Failed to add item', 'error');
      return null;
    }
  }

  async updateItem(line, quantity) {
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          line: parseInt(line),
          quantity: parseInt(quantity)
        })
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      this.cart = await response.json();
      this.updateCartUI();

      // Refresh page if on cart page
      if (window.location.pathname === '/cart') {
        window.location.reload();
      }

      return this.cart;
    } catch (error) {
      console.error('Update cart error:', error);
      this.showNotification('Failed to update cart', 'error');
      return null;
    }
  }

  async removeItem(line) {
    return this.updateItem(line, 0);
  }

  async clearCart() {
    try {
      const response = await fetch('/cart/clear.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      this.cart = await response.json();
      this.updateCartUI();
      return this.cart;
    } catch (error) {
      console.error('Clear cart error:', error);
      return null;
    }
  }

  updateCartUI() {
    // Update cart count in header
    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(el => {
      const count = this.cart ? this.cart.item_count : 0;
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });

    // Update cart total if element exists
    const cartTotals = document.querySelectorAll('.cart-total');
    cartTotals.forEach(el => {
      if (this.cart) {
        el.textContent = this.formatMoney(this.cart.total_price);
      }
    });

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('cart:updated', {
      detail: { cart: this.cart }
    }));
  }

  formatMoney(cents) {
    const amount = (cents / 100).toFixed(2);
    return '₹' + amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  showNotification(message, type = 'success') {
    // Check if toast element exists (from product page)
    const existingToast = document.querySelector('.toast');
    if (existingToast && existingToast.__x) {
      // Alpine.js toast
      return;
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `cart-notification cart-notification--${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="cart-notification__close">&times;</button>
    `;

    // Add styles if not already present
    if (!document.querySelector('#cart-notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'cart-notification-styles';
      styles.textContent = `
        .cart-notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 16px 24px;
          border-radius: 8px;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: slideIn 0.3s ease;
        }
        .cart-notification--success {
          background: #000c5b;
        }
        .cart-notification--error {
          background: #dc2626;
        }
        .cart-notification__close {
          background: none;
          border: none;
          color: #fff;
          font-size: 1.25rem;
          cursor: pointer;
          opacity: 0.8;
        }
        .cart-notification__close:hover {
          opacity: 1;
        }
        @keyframes slideIn {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Close button
    notification.querySelector('.cart-notification__close').addEventListener('click', () => {
      notification.remove();
    });

    // Auto remove
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Initialize cart on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.fitkaarCart = new FitkaarCart();
});

// Export for ES modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FitkaarCart;
}
