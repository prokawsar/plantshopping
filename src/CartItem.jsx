import { useSelector, useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItem,
} from "./CartSlice";
import "./assets/CartItem.css";

const CartItem = ({ totalItem, onContinueShopping, onRemoveItem }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () =>
    cart.reduce(
      (total, item) =>
        total + Number(item.cost.replace(/[^0-9.-]+/g, "")) * item.quantity,
      0
    );

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    dispatch(increaseItemQuantity(item.name));
  };

  const handleDecrement = (item) => {
    dispatch(decreaseItemQuantity(item.name));
    if (item.quantity == 1) {
      handleRemove(item.name);
    }
  };

  const handleRemove = (item) => {
    onRemoveItem((prevState) => ({
      ...prevState,
      [item]: false,
    }));
    dispatch(removeItem(item));
  };

  const calculateTotalCost = (item) => {
    const price = item.quantity * Number(item.cost.replace(/[^0-9.-]+/g, ""));
    return price;
  };

  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <h2 style={{ color: "black" }}>Total Item: {totalItem()}</h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item.name)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          onClick={handleCheckoutShopping}
          className="get-started-button1"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
