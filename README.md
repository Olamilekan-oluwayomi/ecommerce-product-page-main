# Frontend Mentor — E-commerce Product Page

A pixel-perfect, fully interactive solution to the [E-commerce product page challenge](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6) on Frontend Mentor. Built with **React 19** and **Vite**, this project showcases real-world UI patterns including an image lightbox, responsive navigation, and a fully functional cart system.

---

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Design Reference](#design-reference)
  - [Links](#links)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features & Implementation](#features--implementation)
  - [Navigation & Mobile Menu](#navigation--mobile-menu)
  - [Product Gallery & Lightbox](#product-gallery--lightbox)
  - [Product Description & Pricing](#product-description--pricing)
  - [Cart System](#cart-system)
- [Accessibility](#accessibility)
- [Style Guide](#style-guide)
- [Getting Started](#getting-started)
- [What I Learned](#what-i-learned)
- [Continued Development](#continued-development)
- [Author](#author)

---

## Overview

### The Challenge

Users should be able to:

- View the **optimal layout** depending on their device's screen size (mobile: 375px / desktop: 1440px)
- See **hover and focus states** for all interactive elements
- **Open a lightbox gallery** by clicking the main product image (desktop only)
- **Navigate the lightbox** with previous/next buttons and thumbnail clicks
- **Switch the active image** via thumbnail clicks in both the main gallery and the lightbox
- **Adjust item quantity** with increment/decrement controls (minimum of 1)
- **Add items to the cart** and have the cart badge update with the total quantity
- **View the cart popover** by clicking the cart icon in the nav
- **Remove individual items** from the cart
- Toggle a **mobile slide-in navigation** with a backdrop overlay

### Design Reference

Design files are located in the [`/design`](./design/) directory, covering:

| File | Description |
|---|---|
| `desktop-design.jpg` | Main desktop layout |
| `desktop-design-lightbox.jpg` | Lightbox modal on desktop |
| `mobile-design.jpg` | Main mobile layout |
| `mobile-menu.jpg` | Open mobile navigation |
| `mobile-design-basket-empty.jpg` | Cart popover – empty state |
| `mobile-design-basket-filled.jpg` | Cart popover – filled state |
| `active-states-*.jpg` | Hover/active state references |

### Links

- **Solution URL:** [Add your Frontend Mentor solution URL here]
- **Live Site URL:** [Add your live deployment URL here]

---

## Tech Stack

| Category | Technology |
|---|---|
| UI Library | [React 19](https://react.dev/) with hooks (`useState`) |
| Build Tool | [Vite 8](https://vite.dev/) |
| Styling | Vanilla CSS (component-scoped, BEM methodology) |
| Linting | ESLint 10 with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` |
| Typography | [Kumbh Sans](https://fonts.google.com/specimen/Kumbh+Sans) (400, 700) |
| Icons/Images | SVG icons and JPG product images (local assets) |

No CSS frameworks or third-party component libraries were used — everything is hand-crafted.

---

## Project Structure

```
ecommerce-product-page-main/
├── design/                  # Reference design images from Frontend Mentor
├── public/                  # Static public assets
├── src/
│   ├── assets/              # SVG icons, product images, thumbnails, logo, avatar
│   ├── components/
│   │   ├── Nav.jsx          # Top navigation bar + mobile drawer
│   │   ├── Nav.css
│   │   ├── Gallery.jsx      # Image gallery + lightbox modal
│   │   ├── Gallery.css
│   │   ├── Description.jsx  # Product info, pricing, quantity selector, add-to-cart
│   │   ├── Description.css
│   │   ├── Cart.jsx         # Cart popover (empty/filled states)
│   │   └── Cart.css
│   ├── App.jsx              # Root component — state & prop wiring
│   ├── App.css              # Global layout styles
│   ├── index.css            # CSS reset and base styles
│   └── main.jsx             # React DOM entry point
├── index.html
├── vite.config.js
├── eslint.config.js
├── style-guide.md           # Frontend Mentor style guide (colors, typography)
└── package.json
```

---

## Features & Implementation

### Navigation & Mobile Menu

**Component:** [`src/components/Nav.jsx`](./src/components/Nav.jsx)

- Responsive navbar with logo, navigation links, cart icon, and avatar
- Mobile: hamburger button toggles a **slide-in drawer** with a semi-transparent backdrop
- Cart icon shows a **dynamic badge** with the total item count (hidden when cart is empty)
- Full keyboard support: `aria-expanded` on the menu button, `aria-hidden` on the backdrop
- The mobile drawer closes when clicking the backdrop overlay

```jsx
// aria-expanded keeps screen readers informed about menu state
<button aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen}>
```

---

### Product Gallery & Lightbox

**Component:** [`src/components/Gallery.jsx`](./src/components/Gallery.jsx)

- Displays **4 product images** with corresponding thumbnails
- **Mobile:** Previous/Next arrow buttons navigate between images; lightbox is disabled
- **Desktop:** Clicking the main image opens a **lightbox modal** with full navigation
- Lightbox closes on backdrop click or the close button; navigation within the lightbox is independent
- Active thumbnail is visually highlighted with an orange border and overlay tint
- All nav buttons use `aria-label`; decorative images use `alt=""` to be skipped by screen readers

**State managed:**
```js
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [isLightboxOpen, setIsLightboxOpen] = useState(false);
```

---

### Product Description & Pricing

**Component:** [`src/components/Description.jsx`](./src/components/Description.jsx)

- Displays brand label, product title, and description text
- **Star rating** rendered dynamically from a numeric value (e.g. `4.5 → ★★★★½`)
- **Pricing block:** Shows discounted price, discount percentage badge, and struck-through original price
- **Quantity selector:** Increment/decrement buttons with a minimum of 1; quantity persists between interactions
- **Add to Cart button:** Fires the `onAddToCart(quantity)` callback and opens the cart

```js
// Discounted price calculation
const discountedPrice = product.originalPrice * (1 - product.discountPercent / 100);
```

Product data is defined as a plain object in [`App.jsx`](./src/App.jsx) and passed as a prop — making the component fully reusable with different products.

---

### Cart System

**Components:** [`App.jsx`](./src/App.jsx) (state) + [`Cart.jsx`](./src/components/Cart.jsx) (UI)

State lives in the root `App` component and is passed down via props — a classic **lifting state up** pattern.

**Cart logic (in `App.jsx`):**
- Adding an item that already exists **updates its quantity** instead of duplicating it
- Adding a new item **appends it** to the cart array
- Cart automatically **opens** when an item is added
- `cartCount` is derived via `.reduce()` — no redundant state

```js
const handleAddToCart = (quantity) => {
  setCartItems((currentItems) => {
    const existingItem = currentItems.find((item) => item.id === product.id);
    if (existingItem) {
      return currentItems.map((item) =>
        item.id === product.id ? { ...item, quantity } : item
      );
    }
    return [...currentItems, { id: product.id, name: product.title, unitPrice: discountedPrice, quantity }];
  });
  setIsCartOpen(true);
};
```

**Cart UI (`Cart.jsx`):**
- Displays as a **popover** anchored to the nav bar
- **Empty state:** "Your cart is empty." message
- **Filled state:** Item thumbnail, name, unit price × quantity = total, delete button, and checkout button
- Uses `role="dialog"` and `aria-hidden` to correctly communicate visibility to assistive technologies

---

## Accessibility

This project was built with accessibility as a first-class concern:

| Feature | Implementation |
|---|---|
| Semantic HTML | `<nav>`, `<ul>`, `<li>`, `<main>`, `<h1>`, `<h3>`, `<button>` |
| ARIA attributes | `aria-label`, `aria-expanded`, `aria-hidden`, `aria-current`, `role="dialog"` |
| Keyboard navigable | All interactive elements are reachable and operable via keyboard |
| Decorative images | Navigation arrows and icons use `alt=""` to be skipped by screen readers |
| Focus management | Native `<button>` elements used throughout (not `<div>` click handlers) |

---

## Style Guide

Taken from [`style-guide.md`](./style-guide.md):

### Colors

| Role | Value |
|---|---|
| Primary Orange | `hsl(26, 100%, 55%)` |
| Pale Orange | `hsl(25, 100%, 94%)` |
| Very Dark Blue | `hsl(220, 13%, 13%)` |
| Dark Grayish Blue | `hsl(219, 9%, 45%)` |
| Grayish Blue | `hsl(220, 14%, 75%)` |
| Light Grayish Blue | `hsl(223, 64%, 98%)` |
| White | `hsl(0, 0%, 100%)` |

### Typography

- **Font family:** Kumbh Sans
- **Weights:** 400 (regular), 700 (bold)
- **Base font size:** 16px

### Breakpoints

- **Mobile:** 375px
- **Desktop:** 1440px

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation & Development

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd ecommerce-product-page-main

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The dev server starts at `http://localhost:5173` with Hot Module Replacement (HMR).

### Other Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## What I Learned

### Lifting State Up Cleanly

Managing cart state in `App.jsx` and passing handlers down as props kept each component focused on its own responsibility. `Gallery` only knows about images; `Description` only knows about quantity — cart logic stays centralized and predictable.

### Functional State Updates

Using the updater function form of `setState` (e.g. `setCartItems((current) => ...)`) avoids stale closure bugs when reads and writes to state happen in the same operation — particularly important in the add-to-cart handler.

### BEM for Component-Scoped CSS

BEM naming conventions (`.nav-filter__cart-button`, `.description__quantity-selector`) prevented style collisions across components without needing CSS Modules or a CSS-in-JS library.

### Accessible Interactive Elements

Using native `<button>` elements instead of styled `<div>` click handlers gave keyboard navigation and screen reader support essentially for free — a pattern worth internalizing early.

---

## Continued Development

Areas to improve in future projects:

- **TypeScript** — adding static types to prop interfaces and state shapes would catch errors earlier and improve editor tooling
- **CSS Custom Properties** — centralising the color palette and spacing scale into `:root` variables to reduce magic numbers scattered across component stylesheets
- **Focus trap in the lightbox** — the current implementation doesn't trap focus inside the modal, which is a WCAG 2.1 requirement for `role="dialog"` elements
- **Animated transitions** — smoother enter/exit animations on the cart popover, mobile menu, and lightbox using CSS transitions
- **Unit testing** — adding component tests with React Testing Library to validate cart logic and UI state transitions

---

## Author

- Frontend Mentor — [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- GitHub — [@yourusername](https://github.com/yourusername)

---

*Built as part of the [Frontend Mentor](https://www.frontendmentor.io) challenge series.*
