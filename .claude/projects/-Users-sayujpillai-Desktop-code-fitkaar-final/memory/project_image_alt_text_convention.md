---
name: Product Image Alt Text Convention
description: How product media alt text must be formatted for the variant-based gallery filtering to work on product pages, including full type/colour catalog
type: project
---

Product images are filtered in the gallery carousel based on alt text matching against the selected Type and Colour variant options.

**Alt text format:** `"Type Colour"` (e.g., "Sweatshirt Black", "Oversized tshirt Navy Blue")

**Full product type/colour catalog:**
- Regular tshirt: Black, Brown
- Oversized tshirt: Black, Brown, Navy Blue
- Cropped tee: Black
- Boxy vest: Black, Brown
- Sweatshirt: Black, Brown, Bottle green
- Hoodie: Black

**Rules:**
- Alt text values must match the Shopify option values exactly (matching is case-insensitive)
- Only **Type** and **Colour** are used for filtering — **Size is irrelevant** to image filtering
- Images with blank alt text or alt text matching the product title are treated as generic and always visible
- If no images match the current selection, all images show as fallback

**Why:** The `visibleImages` getter in `productPage()` Alpine component (`sections/product-page.liquid`) does `alt.includes(selectedType)` and `alt.includes(selectedColor)` checks to filter the gallery.

**How to apply:** When setting up product media in Shopify Admin, each image's alt text field must contain both the Type value and Colour value that image represents.
