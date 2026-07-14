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
  return (
    <main className="app">
      <Nav />
      <div className="app__product-container">
        <Gallery />
        <Description product={product} />
      </div>
    </main>
  );
}

export default App;
