import "./Cart.css";
import thumbnail from "../assets/image-product-1-thumbnail.jpg";
import deleteIcon from "../assets/icon-delete.svg";

export default function Cart({ open = false, items = [], onRemoveItem }) {
  return (
    <div
      className={`cart-popover ${open ? "cart-popover--open" : ""}`}
      role="dialog"
      aria-hidden={!open}
    >
      <h3 className="cart-popover__title">Cart</h3>

      <div className="cart-popover__content">
        {items.length === 0 ? (
          <p className="cart-popover__empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.id} className="cart-list__item">
                  <img
                    className="cart-list__thumb"
                    src={thumbnail}
                    alt="Product thumbnail"
                  />
                  <div className="cart-list__meta">
                    <div className="cart-list__name">{item.name}</div>
                    <div className="cart-list__price">
                      <span>${item.unitPrice.toFixed(2)}</span> x{" "}
                      <span>{item.quantity}</span>
                      <strong>
                        {" "}
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                  <button
                    className="cart-list__delete"
                    aria-label="Remove item"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <img src={deleteIcon} alt="Delete icon" />
                  </button>
                </li>
              ))}
            </ul>

            <button className="cart-popover__checkout">Checkout</button>
          </>
        )}
      </div>
    </div>
  );
}
