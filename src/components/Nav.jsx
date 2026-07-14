import { useState } from "react";
import "./Nav.css";
import menuOpen from "../assets/icon-menu.svg";
import menuClose from "../assets/icon-close.svg";
import logo from "../assets/logo.svg";
import cart from "../assets/icon-cart.svg";
import avatar from "../assets/image-avatar.png";
import useCartStore from "./store/cartStore";
import Cart from "./Cart.jsx";

function Nav() {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const cartItems = useCartStore((state) => state.cartItems);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ["Collections", "Men", "Women", "About", "Contact"];

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="nav-filter" aria-label="Navigation menu">
      <div
        className={`nav-filter__backdrop ${isMenuOpen ? "nav-filter__backdrop--open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      />
      <div className="nav-filter__left">
        <button
          type="button"
          className="nav-filter__menu-button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <img
            className="nav-filter__menu-icon"
            src={isMenuOpen ? menuClose : menuOpen}
            alt="Menu toggle"
          />
        </button>

        <img className="nav-filter__logo" src={logo} alt="Brand Logo" />

        <ul
          className={`nav-filter__list ${isMenuOpen ? "nav-filter__list--open" : ""}`}
        >
          {navItems.map((item) => (
            <li key={item} className="nav-filter__item">
              <a className="nav-filter__link" href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="nav-filter__actions">
        <div className="nav-filter__cart">
          <button
            type="button"
            className="nav-filter__cart-button"
            aria-label="Toggle cart"
            onClick={toggleCart}
          >
            <img
              className="nav-filter__action-icon"
              src={cart}
              alt="Cart Icon"
            />
            {cartCount > 0 && (
              <span className="nav-filter__cart-count">{cartCount}</span>
            )}
          </button>
          <Cart
            open={isCartOpen}
            items={cartItems}
            onRemoveItem={removeFromCart}
          />
        </div>

        <img className="nav-filter__avatar" src={avatar} alt="Avatar" />
      </div>
    </nav>
  );
}

export default Nav;
