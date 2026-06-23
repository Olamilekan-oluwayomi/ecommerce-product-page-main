import "./Cart.css";
import thumbnail from "../assets/image-product-1-thumbnail.jpg";
import deleteIcon from "../assets/icon-delete.svg";

export default function Cart({ open = false }) {
  return (
    <div
      className={`cart-popover ${open ? "cart-popover--open" : ""}`}
      role="dialog"
      aria-hidden={!open}
    >
      <h3 className="cart-popover__title">Cart</h3>

      <div className="cart-popover__content">
        <ul className="cart-list">
          <li className="cart-list__item">
            <img
              className="cart-list__thumb"
              src={thumbnail}
              alt="Product thumbnail"
            />
            <div className="cart-list__meta">
              <div className="cart-list__name">
                Fall Limited Edition Sneakers
              </div>
              <div className="cart-list__price">
                <span>$125.00</span> x <span>2</span>
                <strong>$250.00</strong>
              </div>
            </div>
            <button className="cart-list__delete" aria-label="Remove item">
              <img src={deleteIcon} alt="Delete icon" />
            </button>
          </li>
        </ul>

        <button className="cart-popover__checkout">Checkout</button>
      </div>
    </div>
  );
}
