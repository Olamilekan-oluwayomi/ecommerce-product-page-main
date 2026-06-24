import { useState } from "react";
import "./App.css";
import Nav from "./components/Nav.jsx";
import Gallery from "./components/Gallery.jsx";
import Description from "./components/Description.jsx";

const product = {
  id: 1,
  brand: "Sneaker Company",
  title: "Fall Limited Edition Sneakers",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
  originalPrice: 250.0,
  discountPercent: 50,
  rating: 4.5,
  reviews: 88,
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const discountedPrice =
    product.originalPrice * (1 - product.discountPercent / 100);

  const handleAddToCart = (quantity) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity } : item,
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.title,
          unitPrice: discountedPrice,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="app">
      <Nav
        cartCount={cartCount}
        cartOpen={isCartOpen}
        onToggleCart={() => setIsCartOpen((prev) => !prev)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
      />
      <div className="app__product-container">
        <Gallery />
        <Description product={product} onAddToCart={handleAddToCart} />
      </div>
    </main>
  );
}

export default App;
