# Frontend Mentor — E-commerce Product Page

A pixel-perfect, fully interactive solution to the [E-commerce Product Page challenge](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6) on Frontend Mentor. Built with **React 19**, **Vite 8**, and **Zustand 5**, this project showcases real-world UI patterns including an image lightbox, responsive navigation, and a fully functional cart system.

---

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Design Reference](#design-reference)
  - [Links](#links)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features & Implementation](#features--implementation)
  - [State Management (Zustand)](#state-management-zustand)
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

Design files are located in the [`/design`](./design/) directory:

| File | Description |
|---|---|
| `desktop-design.jpg` | Main desktop layout |
| `desktop-design-lightbox.jpg` | Lightbox modal on desktop |
| `mobile-design.jpg` | Main mobile layout |
| `mobile-menu.jpg` | Open mobile navigation |
| `mobile-design-basket-empty.jpg` | Cart popover — empty state |
| `mobile-design-basket-filled.jpg` | Cart popover — filled state |
| `active-states-*.jpg` | Hover/active state references |

### Links

- **Solution URL:** [Add your Frontend Mentor solution URL here]
- **Live Site URL:** [Add your live deployment URL here]

---

## Tech Stack

| Category | Technology |
|---|---|
| UI Library | [React 19](https://react.dev/) with hooks (`useState`, `useEffect`, `useRef`) |
| State Management | [Zustand 5](https://zustand-demo.pmnd.rs/) — lightweight, single-store |
| Build Tool | [Vite 8](https://vite.dev/) |
| Styling | Vanilla CSS (~1,088 lines, component-scoped, BEM methodology) |
| Linting | ESLint 10 with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` |
| Typography | [Kumbh Sans](https://fonts.google.com/specimen/Kumbh+Sans) (400, 700) |
| Icons/Images | SVG icons and JPG product images (local assets) |

No CSS frameworks, component libraries, or preprocessors — everything is hand-crafted.

---

## Project Structure

```
ecommerce-product-page-main/
├── design/                      # Reference design images from Frontend Mentor
├── public/                      # Static public assets
├── src/
│   ├── assets/                  # SVG icons, product images, thumbnails, logo, avatar
│   ├── components/
│   │   ├── Nav.jsx              # Top navigation bar + mobile drawer
│   │   ├── Nav.css
│   │   ├── Gallery.jsx          # Image gallery + lightbox modal
│   │   ├── Gallery.css
│   │   ├── Description.jsx      # Product info, pricing, quantity selector, add-to-cart
│   │   ├── Description.css
│   │   ├── Cart.jsx             # Cart popover (empty/filled states)
│   │   └── Cart.css
│   ├── store/
│   │   └── cartStore.js         # Zustand store — cart items + visibility state
│   ├── App.jsx                  # Root component — product data + layout
│   ├── App.css                  # Global layout styles
│   ├── index.css                # CSS reset and base styles
│   └── main.jsx                 # React DOM entry point
├── index.html
├── vite.config.js
├── eslint.config.js
├── style-guide.md               # Frontend Mentor style guide (colors, typography)
└── package.json
```

---

## Features & Implementation

### State Management (Zustand)

**Store:** [`src/store/cartStore.js`](./src/store/cartStore.js)

Cart state is managed through a single Zustand store, accessed by three different components without any prop-drilling through `App.jsx`. This keeps the root component clean and focused on layout.

**Store shape:**

| State | Type | Purpose |
|---|---|---|
| `cartItems` | `Array<{ id, title, originalPrice, discountPercent, quantity }>` | All items in the cart |
| `isCartOpen` | `boolean` | Whether the cart popover is visible |

**Actions:**

| Action | Behavior |
|---|---|
| `addToCart(product, quantity)` | If the product already exists (matched by `id`), increments its quantity. Otherwise, appends a new entry. |
| `removeFromCart(productId)` | Filters out the item with the matching `id`. |
| `toggleCart()` | Flips `isCartOpen`. |

**Which components consume the store:**

| Component | Reads | Writes |
|---|---|---|
| `Nav.jsx` | `cartItems` (for badge count) | `toggleCart` |
| `Description.jsx` | — | `addToCart` |
| `Cart.jsx` | `isCartOpen`, `cartItems` | `removeFromCart`, `toggleCart` |

Component-specific UI state (mobile menu, gallery index, quantity selector) stays local with `useState` — a deliberate hybrid approach.

---

### Navigation & Mobile Menu

**Component:** [`src/components/Nav.jsx`](./src/components/Nav.jsx)

- Responsive navbar with logo, navigation links, cart icon, and user avatar
- **Mobile:** Hamburger button toggles a slide-in drawer from the left with a semi-transparent backdrop overlay
- **Desktop (>=1024px):** Nav links are displayed inline; hamburger is hidden
- Cart icon shows a **dynamic badge** with the total item count (hidden when cart is empty)
- The badge count is derived via `.reduce()` on the Zustand `cartItems` array — no redundant state
- Full keyboard support: `aria-expanded` on the menu button, `aria-hidden` on the backdrop

---

### Product Gallery & Lightbox

**Component:** [`src/components/Gallery.jsx`](./src/components/Gallery.jsx)

- Displays **4 product images** with corresponding thumbnails
- **Mobile (<768px):** Previous/Next circular arrow buttons overlay the main image; thumbnails are hidden
- **Desktop (>=768px):** Nav buttons are hidden; thumbnails appear in a row below the main image. Clicking the main image opens a **lightbox modal**
- **Lightbox:** Fixed-position fullscreen overlay with its own close button, prev/next navigation, and thumbnail row. Closes on backdrop click. Animated with CSS `fadeIn` and `slideUp` keyframes
- Active thumbnail is visually highlighted with an orange border and overlay tint
- Navigation wraps around (index 0 goes to last image, and vice versa)

**State managed:**
```js
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [isLightboxOpen, setIsLightboxOpen] = useState(false);
```

---

### Product Description & Pricing

**Component:** [`src/components/Description.jsx`](./src/components/Description.jsx)

- Displays brand label, product title, and description text
- **Star rating** rendered dynamically from a numeric value (e.g. `4.5` → `★★★★½☆`)
- **Pricing block:** Shows discounted price, discount percentage badge, and struck-through original price
- **Quantity selector:** Increment/decrement buttons with a minimum of 1
- **Add to Cart button:** Calls `addToCart(product, quantity)` on the Zustand store and opens the cart popover

Product data is defined as a plain object in [`App.jsx`](./src/App.jsx) and passed as a prop, making the component reusable with different products.

---

### Cart System

**Store:** [`src/store/cartStore.js`](./src/store/cartStore.js) | **UI:** [`src/components/Cart.jsx`](./src/components/Cart.jsx)

- Displays as a **popover** anchored to the nav bar
- Visibility controlled via CSS class toggling (`cart-popover--open`), not conditional rendering — the DOM stays mounted so click-outside detection works reliably
- **Empty state:** "Your cart is empty." message
- **Filled state:** Item thumbnail, name, unit price × quantity = total, delete button, and checkout button
- **Click-outside-to-close:** Uses `useRef` + `useEffect` with a `mousedown` listener. Includes special logic to exclude the cart toggle button from triggering a close (preventing the toggle from firing twice and canceling itself)
- Uses `role="dialog"` and `aria-hidden` to communicate visibility to assistive technologies

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

| Breakpoint | Usage |
|---|---|
| `<640px` | Small mobile adjustments (smaller nav padding/logo) |
| `<1023px` | Mobile menu slide-in, backdrop visible |
| `>=768px` | Gallery thumbnails visible, description actions go horizontal |
| `>=1024px` | Desktop layout: flex-row product container, inline nav links |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/Olamilekan-oluwayomi/ecommerce-product-page-main.git
cd ecommerce-product-page-main

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The dev server starts at `http://localhost:5173` with Hot Module Replacement (HMR).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## What I Learned

### Zustand for Cross-Component State

Replacing prop-drilling with a Zustand store kept cart logic centralized and decoupled from the component tree. Three components can independently read and write cart state without `App.jsx` threading props through — a cleaner architecture than lifting state up for this use case.

### Hybrid State Strategy

Not everything belongs in a global store. Component-specific UI state (mobile menu toggle, gallery index, quantity selector) stays local with `useState`. This hybrid approach avoids over-centralizing state while keeping cross-cutting concerns (cart) in one place.

### CSS Transitions Over Conditional Rendering

The cart popover's DOM stays mounted at all times, with visibility controlled via CSS class toggling. This enabled reliable click-outside detection with `useRef` — something that would require `useEffect` timing hacks with conditional rendering.

### Click-Outside Pattern with Toggle Buttons

The `mousedown` listener in `Cart.jsx` includes special logic to exclude the cart toggle button from triggering a close. Without this, the toggle button's own click would fire twice (once in the button handler, once in the document listener), canceling itself out.

### BEM for Component-Scoped CSS

BEM naming conventions (`.nav-filter__cart-button`, `.gallery__lightbox-thumbnail--active`) prevented style collisions across components without CSS Modules or a CSS-in-JS library. Co-located CSS files keep styles close to their components.

### Accessible Interactive Elements

Using native `<button>` elements instead of styled `<div>` click handlers gave keyboard navigation and screen reader support essentially for free — a pattern worth internalizing.

---

## Continued Development

Areas to improve in future projects:

- **TypeScript** — adding static types to prop interfaces and Zustand store would catch errors earlier and improve editor tooling
- **CSS Custom Properties** — centralising the color palette and spacing scale into `:root` variables to reduce magic numbers across component stylesheets
- **Focus trap in the lightbox** — the current implementation doesn't trap focus inside the modal, which is a WCAG 2.1 requirement for `role="dialog"` elements
- **Animated transitions** — smoother enter/exit animations on the cart popover, mobile menu, and lightbox using CSS transitions
- **Unit testing** — adding component tests with React Testing Library to validate Zustand store logic and UI state transitions

---

## Author

- GitHub — [@olamilekan-oluwayomi](https://github.com/olamilekan-oluwayomi)

---

*Built as part of the [Frontend Mentor](https://www.frontendmentor.io) challenge series.*
