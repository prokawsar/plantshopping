import { useState } from "react";
import ProductList from "./ProductList";
import "./assets/App.css";
import AboutUs from "./AboutUs";

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      <div
        className={`flex flex-col h-screen overflow-auto w-full${
          showProductList ? "fade-out" : ""
        }`}
      >
        <div className="background-image"></div>
        <div className="text-white backdrop-blur-sm h-full items-center w-full bg-black bg-opacity-20 gap-5 lg:gap-10 flex flex-col lg:flex-row p-5">
          <div className="flex flex-col w-1/4 text-center items-center">
            <h1 className="text-5xl">Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <p className="text-2xl">Where Green Meets Serenity</p>

            <button
              className="py-4 text-xl px-6 bg-green-600 hover:bg-green-400 rounded-md flex items-center"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
          </div>
          <div className="text-2xl w-3/4 p-10">
            <AboutUs />
          </div>
        </div>
      </div>
      <div
        className={`product-list-container ${showProductList ? "visible" : ""}`}
      >
        <ProductList />
      </div>
    </div>
  );
}

export default App;
