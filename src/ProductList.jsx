import { useState } from "react";
import "./assets/ProductList.css";
import CartItem from "./CartItem";
import { plantsArray } from "./utils/constant";
import { addItem } from "./CartSlice";
import { useDispatch, useSelector } from "react-redux";

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const cart = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const calculateTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const styleObj = {
    backgroundColor: "#4CAF50",
    color: "#fff!important",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignIems: "center",
    fontSize: "20px",
  };
  const styleObjUl = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const styleA = {
    color: "white",
    fontSize: "30px",
    textDecoration: "none",
  };
  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };
  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  return (
    <div>
      <div
        className="navbar flex justify-between w-full flex-row"
        style={styleObj}
      >
        <div className="tag">
          <div className="items-center flex text-xl gap-2">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt=""
            />
            <a href="/plantshopping" style={{ textDecoration: "none" }}>
              <div>
                <h3 style={{ color: "white" }}>Paradise Nursery</h3>
                <i style={{ color: "white" }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div>
          <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>
            Plants
          </a>
        </div>

        <div style={styleObjUl}>
          <div>
            <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
              <h1 className="cart">
                <span className="cart_quantity_count">
                  {calculateTotalItems()}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  id="IconChangeColor"
                  height="68"
                  width="68"
                >
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    id="mainIconPathAttribute"
                  ></path>
                </svg>
              </h1>
            </a>
          </div>
        </div>
      </div>
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index} className="w-full">
              <h1 className="text-2xl font-bold text-center underline py-3">
                <div>{category.category}</div>
              </h1>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                    />
                    <div className="product-title">{plant.name}</div>
                    <p>{plant.cost}</p>
                    {/*Similarly like the above plant.name show other details like description and cost*/}
                    <button
                      disabled={addedToCart[plant.name]}
                      className="product-button disabled:bg-gray-500"
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? "Added" : "Add"} to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem
          onContinueShopping={handleContinueShopping}
          onRemoveItem={setAddedToCart}
        />
      )}
    </div>
  );
}

export default ProductList;
