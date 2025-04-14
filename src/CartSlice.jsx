import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.items.push({ name, image, cost, quantity: 1 });
        }
      },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload);
    },
    increaseQuantity: (state, action) => {
        const { name } = action.payload;
        const product = state.items.find(item => item.name === name);
        if (product) {
          product.quantity += 1;
        }
      },
      decreaseQuantity: (state, action) => {
        const { name } = action.payload;
        const product = state.items.find(item => item.name === name);
        if (product) {
          if (product.quantity > 1) {
            product.quantity -= 1;
          } else {
            state.items = state.items.filter(item => item.name !== name);
          }
          
        }
        
      },
    
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
          itemToUpdate.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity,decreaseQuantity,increaseQuantity } = CartSlice.actions;

export default CartSlice.reducer;
