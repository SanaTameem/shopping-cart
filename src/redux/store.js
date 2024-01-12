import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Products/ProductsSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
