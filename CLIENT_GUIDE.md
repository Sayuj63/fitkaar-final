# Fitkaar Theme - Complete Client Guide

Welcome! This guide covers everything you need to manage your Fitkaar Shopify store. From adding products to customizing your storefront, you'll find step-by-step instructions below.

---

## Table of Contents

1. [Product Management](#product-management)
2. [Pricing & Offers](#pricing--offers)
3. [Collections](#collections)
4. [Store Customization](#store-customization)
5. [FAQ & Troubleshooting](#faq--troubleshooting)

---

## Product Management

### Adding Products

#### Step 1: Create a New Product
1. Go to **Shopify Admin** → **Products** → **Add product**
2. Enter product title (e.g., "Navy Blue Oversized Tee")
3. Add product description
4. Upload product images
5. Set status to **Active** (green toggle in top right)

#### Step 2: Set Up Product Options (Colors, Types, Sizes)

The Fitkaar theme supports three main option types:

**Colors (Swatches Display)**
- Option name: `Color` (or `Colour`)
- Fitkaar auto-displays as clickable color swatches
- Supported colors: Black, White, Beige, Red, Blue, Brown, Navy, Bottle Green, Grey
- The system will show each color with its actual hex value
- **Example**: If you add "Navy Blue" as a color, it automatically displays as a navy swatch

**Type (Icon Display)**
- Option name: `Type`
- Fitkaar displays with product category icons
- Supported types: Hoodie, Boxy Vest, Regular Tee, Sweatshirt, Oversized Tee, Cropped Tee
- **Each type has a branded icon**

**Size (Button Display)**
- Option name: `Size`
- Fitkaar displays as clickable buttons
- Common sizes: XS, S, M, L, XL, XXL
- You can add custom sizes as needed

#### Step 3: Create Variants (Combining Options)

Products are created by combining options:

**Example: "Navy Oversized Tee in All Sizes"**

1. Click **+ Add variants** (or use **Variant** form)
2. Set up like this:
   - **Option 1**: Type = "Oversized Tee"
   - **Option 2**: Colour = "Navy"
   - **Option 3**: Size = XS, S, M, L, XL, XXL
3. You'll get **6 variants** (Navy-Oversized-XS through Navy-Oversized-XXL)
4. Set SKU, barcode, and price for each variant

### Managing Colors

#### Adding a New Color

1. Go to **Products** → select your product
2. Click **Options** section
3. Click on the color option name
4. Click **+ Add color option**
5. Type color name (e.g., "Burgundy")
6. **Important**: The color name must match one of these for auto-display:
   - Black, White, Beige, Red, Blue, Brown, Navy, Bottle Green, Grey
   - **If your color name doesn't match**, it will show as a grey swatch (no auto-styling)

#### If a Color Doesn't Exist in Some SKUs

**Problem**: You have "Navy" in some products but not others
**Solution**: SKUs without that color simply won't appear as an option

**Example**:
- Navy Oversized Tee: Available in XS, S, M, L, XL
- Navy Boxy Vest: Available in S, M, L only

When customer selects "Navy" + "Boxy Vest", only S, M, L will show as available sizes. ✓ This works automatically!

#### Adding Custom Swatches (Advanced)

If you want a custom color swatch that isn't pre-mapped, contact your developer. They can add it to the theme color mapping.

### Managing Sizes

#### Adding Custom Sizes

Standard sizes: XS, S, M, L, XL, XXL

To add custom sizes (e.g., "One Size", "Free Size"):

1. Go to **Products** → select product
2. Click **Options** section
3. Click on Size option
4. Click **+ Add size option**
5. Type your custom size name

✓ Custom sizes will display as buttons just like standard sizes

#### If a Size Doesn't Exist in Some SKUs

**Example Scenario**:
- Regular Tee: XS, S, M, L, XL, XXL
- Oversized Tee: M, L, XL, XXL only (no XS, S)

**Fitkaar handles this automatically**:
1. Customer selects "Oversized Tee"
2. XS and S buttons become disabled (greyed out)
3. Only available sizes (M, L, XL, XXL) are clickable

#### Size Chart

Customers can click **"Sizing guide"** to see your size chart:

1. Go to **Products** → select product
2. Scroll to **Media** section
3. Upload a size chart image for that product
4. Customers will see this when they click the sizing guide link

---

## Pricing & Offers

### Setting Product Prices

1. **Go to Products** → select your product
2. **Scroll to Pricing section**
3. Set **Price** (final price customers pay)
4. Set **Compare at price** (optional - shows strikethrough if higher)

**Example**:
- Price: ₹899
- Compare at: ₹1,299
- Display: ₹899 ~~₹1,299~~ (shows 31% off)

### First Order Discount

All first-time customers automatically get a discount (set by admin):

1. Go to **Customize theme** → **Product page settings**
2. Find **"First Order Discount %"** field
3. Enter percentage (e.g., 10 for 10% off)
4. This automatically displays on product page

### Free T-Shirt Offer

Customers get a free t-shirt when they spend above a threshold:

1. Go to **Customize theme** → **Product page settings**
2. Find **"Free T-shirt Threshold (in INR)"** field
3. Enter amount (e.g., 3000 for ₹3,000+)
4. Message displays: "Shop for ₹3,000 or more and get a FREE T-shirt"

---

## Collections

### Creating a Collection

#### Method 1: Automatic Collection (Smart)

1. **Go to Products** → **Collections** → **Create collection**
2. Choose **"Automated"**
3. Enter collection title (e.g., "Oversized Tees")
4. Set conditions (e.g., "Type = Oversized Tee")
5. Products matching this condition auto-appear
6. **Click Save**

**Example**: Create an automated collection for all Navy products
- Title: "Navy Collection"
- Condition: "Color contains Navy"
- Products: Auto-updated whenever you add navy items

#### Method 2: Manual Collection

1. Go to **Products** → **Collections** → **Create collection**
2. Choose **"Manual"**
3. Enter title
4. Click **Add products**
5. Search and select products to include
6. Click **Save**

### Organizing Collections

**Best Practices**:
- By Type: "Hoodies", "Tees", "Vests"
- By Color: "Navy Collection", "Black Essentials"
- By Season: "Summer Collection", "Winter Wear"
- By Theme: "New Arrivals", "Best Sellers", "On Sale"

### Displaying Collections on Homepage

1. Go to **Customize theme** (Shopify theme editor)
2. Find **"Featured Products"** or **"Products"** section
3. Select collection to display
4. Adjust number of products shown
5. Click **Save**

---

## Store Customization

### Theme Settings (Customize Store)

Go to **Customize theme** in Shopify theme editor to adjust:

#### Product Page Settings
- **Free T-shirt Threshold**: ₹ amount for free gift
- **First Order Discount**: % off for first-time customers
- **Model Size**: Size worn by model in photos (e.g., "M")
- **Support Email**: Email displayed on product page

#### Contact Information
- **WhatsApp Number**: +91 93544 78146
- **Email Address**: Contact form email
- **Customer Service Hours**: Displayed on contact page
- **Social Media Links**: Instagram, Facebook, YouTube, etc.

### Customizing Colors

The theme uses brand colors throughout:

1. Go to **Customize theme**
2. Find **Color Settings** section
3. Adjust:
   - **Primary Color**: Navy (#000c5b) - buttons, titles
   - **Secondary Color**: Teal (#71b6c8) - accents
   - **Accent Color**: Light Blue (#bfdbe3) - backgrounds

### Customizing Fonts

1. Go to **Customize theme**
2. Find **Typography** section
3. Adjust:
   - **Heading Font**: League Spartan
   - **Secondary Font**: Raleway
   - **Body Font**: Helvetica Neue

### Homepage Sections

#### Hero Banner
- Auto-rotates between 7 slides
- Click dots at bottom to jump to any slide
- Hover to pause slideshow
- To change images: Upload in Product page settings or Customize theme

#### Featured Products
- Shows products from selected collection
- Adjust number displayed
- Click to customize product cards

#### Testimonials Carousel
- Shows customer testimonial images
- Auto-scrolls horizontally
- Hover to pause
- **To add testimonials**: Upload images via Customize theme

#### Newsletter Signup
- Collects customer emails
- Customize form text via Customize theme

#### About Us Section
- 3-column layout on desktop, stacked on mobile
- Parallax effect on center column
- Customize text and images

### Contact Page

Contact form accepts:
- Name
- Email
- Phone (WhatsApp)
- Message
- Subject

**To change contact info**:
1. Go to **Customize theme** → **Contact Page**
2. Update WhatsApp number, email, hours
3. Ensure WhatsApp number is in format: +91 XXXXX XXXXX

### FAQ & Returns Policy

To add/edit FAQ:
1. Go to **Pages** → Create or edit
2. Add your FAQs
3. Link to product page (set in Customize theme)

To set returns policy URL:
1. Create a page with returns policy details
2. Go to **Customize theme** → **Product Page**
3. Paste page URL in **"Returns Policy Page URL"** field

---

## Multi-Page Product Display

### Displaying Products on Different Pages

**Option 1: Multiple Collections**
- Create separate collections (e.g., "New Arrivals", "Best Sellers", "Sale")
- Add each to different homepage sections
- Each section can show a different collection

**Option 2: Using Pages**
- Create custom pages for product categories
- Add product collection sections to each page
- Link from navigation menu

**Option 3: Filtering by Type**
- Create a collection using automatic rules
- E.g., "Hoodies" = all products where Type = "Hoodie"
- Display on dedicated page

### Best Practice Example

**Homepage Structure**:
- Hero banner
- Featured Products (All Products) - 8 items
- Testimonials
- Newsletter signup

**Shop Page** (separate page):
- All Products - categorized by type
- Filterable by color, size, price

**Collection Pages** (separate pages):
- Navy Collection: All navy items
- Oversized Tees: All oversized items
- Seasonal collections

---

## Advanced Features

### Size Chart Modal

Customers see a **"Sizing guide"** button next to Size options.

**To customize size chart**:
1. Go to **Products** → select product
2. Scroll to **Media**
3. Upload a size chart image
4. When customers click "Sizing guide", this image displays in a modal

### Pincode Checker

Customers can enter their pincode to check delivery availability.

**This is informational only** - you need to set up delivery zones separately in Shopify settings.

### Product Gallery

Features:
- **Dual carousel**: Side-by-side scrolling galleries
- **All images displayed**: Auto-filtered by color selection
- **Swipe support**: On mobile, swipe left/right
- **Hover preview**: On desktop, hover over small images

**To set which image shows for each color**:
1. When uploading images, set alt text = color name
2. E.g., alt text "Navy" for all navy product images
3. System auto-matches based on selected color

### Cart & Checkout

- Cart is AJAX (no page refresh)
- Customers can update quantities
- Free shipping notice displays automatically
- First-order discount applies at checkout

### Newsletter

Customers can sign up for emails:
- Connects to Shopify email marketing
- Manage lists in **Marketing** → **Email**

---

## FAQ & Troubleshooting

### Q: I added a new color, but the swatch is grey instead of the color I want

**A**: Color swatches auto-match based on color names. Supported color names are:
- Black, White, Beige, Red, Blue, Brown, Navy, Bottle Green, Grey

If you use a name like "Maroon" or "Turquoise", it defaults to grey. Contact your developer to add custom color mappings.

### Q: A size doesn't appear for a particular type/color combination

**A**: This is correct! If you create variants like:
- Navy Oversized Tee: S, M, L, XL (no XS)
- Navy Regular Tee: XS, S, M, L, XL

When customer selects "Oversized Tee", XS button will be disabled. This is automatic and prevents invalid selections.

### Q: How do I add a custom size like "One Size"?

**A**: 
1. Go to **Products** → select product
2. In **Options**, add a size: "One Size"
3. Create variants with "One Size" as the size option
4. It will display as a button just like XS, S, M, etc.

### Q: How do I make a product appear on multiple pages?

**A**: 
- Add product to multiple collections
- Adjust homepage sections to show different collections
- Each product can be in unlimited collections

### Q: The hero banner is showing old images

**A**: 
- Hero images are hardcoded in theme
- Contact your developer to update image URLs in hero section

### Q: How do I add a second color if a color isn't in the Fitkaar color list?

**A**: You can add any color name (e.g., "Burgundy"), but:
- If it matches a pre-set color → shows as color swatch
- If it's custom → shows as grey/neutral swatch
- Customers can still select it, just won't see a color preview

### Q: Can I change the "Compare at" price to show a percentage off?

**A**: Shopify automatically calculates the percentage. If:
- Price: ₹899
- Compare at: ₹1,299
- It shows: "₹899 ~~₹1,299~~ (31% off)"

Just set both prices and it auto-calculates.

### Q: How do I disable or hide a product?

**A**: 
1. Go to **Products** → select product
2. Click **Status** toggle (top right) to turn off (grey)
3. Product will be hidden from storefront (not deleted)

### Q: Can I set different prices for different sizes?

**A**: Yes! Each variant has its own SKU, price, and compare-at price.

**Example**:
- Navy Tee - Size XS: ₹699
- Navy Tee - Size M: ₹799
- Navy Tee - Size XXL: ₹899

Just set different prices for each variant.

### Q: How do I add a discount code?

**A**: 
1. Go to **Discounts** in Shopify admin
2. Click **Create discount**
3. Choose type (% off, ₹ off, Free shipping)
4. Set code and conditions
5. Customers enter code at checkout

---

## Support & Contact

**WhatsApp**: +91 93544 78146
**Email**: fitkaarclothing@gmail.com
**Hours**: Monday-Friday 10:00 AM - 6:00 PM, Saturday 10:00 AM - 2:00 PM

For technical help or to request features, contact your developer.

---

**Last Updated**: April 2026  
**Theme Version**: Fitkaar Final v2  
**Shopify Store**: nca4r0-at.myshopify.com
