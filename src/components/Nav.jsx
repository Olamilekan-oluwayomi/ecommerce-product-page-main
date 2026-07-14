import { useEffect, useState } from "react";
import "./Nav.css";

import menuOpen from "../assets/icon-menu.svg";
import menuClose from "../assets/icon-close.svg";
import logo from "../assets/logo.svg";
import cart from "../assets/icon-cart.svg";
import avatar from "../assets/image-avatar.png";

import useCartStore from "../store/cartStore";
import Cart from "./Cart";

function Nav() {
  const cartItems = useCartStore((state) => state.cartItems);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ["Collections", "Men", "Women", "About", "Contact"];

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // useEffect(() => {
  //   document.body.style.overflow = isMenuOpen ? "hidden" : "";

  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [isMenuOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`nav-backdrop ${isMenuOpen ? "nav-backdrop--open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <aside className={`nav-drawer ${isMenuOpen ? "nav-drawer--open" : ""}`}>
        <button
          className="nav-drawer__close"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <img src={menuClose} alt="" />
        </button>

        <ul className="nav-drawer__list">
          {navItems.map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Navbar */}
      <nav className="nav-filter">
        <div className="nav-filter__left">
          <button
            className="nav-filter__menu-button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <img src={menuOpen} alt="" />
          </button>

          <img src={logo} className="nav-filter__logo" alt="Sneakers" />

          <ul className="nav-filter__desktop-list">
            {navItems.map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-filter__actions">
          <div className="nav-filter__cart">
            <button className="nav-filter__cart-button" onClick={toggleCart}>
              <img src={cart} alt="" />

              {cartCount > 0 && (
                <span className="nav-filter__cart-count">{cartCount}</span>
              )}
            </button>

            <Cart />
          </div>

          <img src={avatar} className="nav-filter__avatar" alt="User Avatar" />
        </div>
      </nav>
    </>
  );
}

export default Nav;
