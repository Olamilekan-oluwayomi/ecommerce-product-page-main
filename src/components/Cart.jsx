import { useEffect, useRef } from "react";
import "./Cart.css";
import thumbnail from "../assets/image-product-1-thumbnail.jpg";
import deleteIcon from "../assets/icon-delete.svg";
import useCartStore from "../store/cartStore";

export default function Cart() {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartRef = useRef(null);

  useEffect(() => {
    if (!isCartOpen) return;

    function handleClickOutside(event) {
      const clickedToggleButton = event.target.closest(
        ".nav-filter__cart-button",
      );
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        !clickedToggleButton
      ) {
        toggleCart();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCartOpen, toggleCart]);

  return (
    <div
      ref={cartRef}
      className={`cart-popover ${isCartOpen ? "cart-popover--open" : ""}`}
      role="dialog"
      aria-hidden={!isCartOpen}
    >
      <h3 className="cart-popover__title">Cart</h3>

      <div className="cart-popover__content">
        {cartItems.length === 0 ? (
          <p className="cart-popover__empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map((item) => {
                const unitPrice =
                  item.originalPrice * (1 - item.discountPercent / 100);
                return (
                  <li key={item.id} className="cart-list__item">
                    <img
                      className="cart-list__thumb"
                      src={thumbnail}
                      alt="Product thumbnail"
                    />
                    <div className="cart-list__meta">
                      <div className="cart-list__name">{item.title}</div>
                      <div className="cart-list__price">
                        <span>${unitPrice.toFixed(2)}</span> x{" "}
                        <span>{item.quantity}</span>
                        <strong>
                          {" "}
                          ${(unitPrice * item.quantity).toFixed(2)}
                        </strong>
                      </div>
                    </div>
                    <button
                      className="cart-list__delete"
                      aria-label="Remove item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <img src={deleteIcon} alt="Delete icon" />
                    </button>
                  </li>
                );
              })}
            </ul>

            <button className="cart-popover__checkout">Checkout</button>
          </>
        )}
      </div>
    </div>
  );
}
