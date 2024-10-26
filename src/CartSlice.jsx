// import { createSlice } from '@reduxjs/toolkit';

// export const CartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [], // Initialize items as an empty array
//   },
//   reducers: {
//     addItem: (state, action) => {

//     },
//     removeItem: (state, action) => {
//     },
//     updateQuantity: (state, action) => {

//     },
//   },
// });

// export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// export default CartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    increaseItemQuantity(state, action) {
      const itemToIncrease = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
      }
    },
    decreaseItemQuantity(state, action) {
      const itemToDecrease = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;
