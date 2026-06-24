import { useState } from "react";
import "./Description.css";
import plusIcon from "../assets/icon-plus.svg";
import minusIcon from "../assets/icon-minus.svg";
import cartIcon from "../assets/icon-cart.svg";

function Description({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const discountedPrice =
    product.originalPrice * (1 - product.discountPercent / 100);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(quantity);
  };

  return (
    <div className="description">
      {/* Brand and Title */}
      <div className="description__header">
        <span className="description__brand">{product.brand}</span>
        <h1 className="description__title">{product.title}</h1>
      </div>

      {/* Description */}
      <p className="description__text">{product.description}</p>

      {/* Rating */}
      <div className="description__rating">
        <span className="description__stars">
          {"★".repeat(Math.floor(product.rating))}
          {product.rating % 1 !== 0 && "½"}
          {"☆".repeat(5 - Math.ceil(product.rating))}
        </span>
        <span className="description__review-count">
          ({product.reviews} Reviews)
        </span>
      </div>

      {/* Pricing */}
      <div className="description__pricing">
        <div className="description__price-row">
          <span className="description__current-price">
            ${discountedPrice.toFixed(2)}
          </span>
          <span className="description__discount">
            {product.discountPercent}%
          </span>
        </div>
        <span className="description__original-price">
          ${product.originalPrice.toFixed(2)}
        </span>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="description__actions">
        <div className="description__quantity-selector">
          <button
            type="button"
            className="description__quantity-button"
            onClick={handleDecrease}
            aria-label="Decrease quantity"
          >
            <img src={minusIcon} alt="" />
          </button>
          <span className="description__quantity">{quantity}</span>
          <button
            type="button"
            className="description__quantity-button"
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            <img src={plusIcon} alt="" />
          </button>
        </div>

        <button
          type="button"
          className="description__add-to-cart"
          onClick={handleAddToCart}
          aria-label={`Add ${quantity} item(s) to cart`}
        >
          <img src={cartIcon} alt="" />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
}

export default Description;
