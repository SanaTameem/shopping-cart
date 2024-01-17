import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProduct = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data.map((item) => (
    {
      id: item.id,
      name: item.title,
      price: item.price,
      img: item.image,
      addedToCart: false,
    }
  ));
});

export const addToCart = createAsyncThunk('products/addToCart', (id) => id);
export const removeFromCart = createAsyncThunk('products/removeFromCart', (id) => id);

const productsFromLocalStorage = localStorage.getItem('allProducts') !== null ? JSON.parse(localStorage.getItem('allProducts')) : [];

const initialState = {
  products: productsFromLocalStorage,
  error: null,
  isLoading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      const id = action.payload;
      const newState = state.products.map((product) => (
        product.id === id ? { ...product, addedToCart: true } : product
      ));
      state.products = newState;
      localStorage.setItem('allProducts', JSON.stringify(state.products));
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.isLoading = false;
      const id = action.payload;
      const newState = state.products.map((product) => (
        product.id === id ? { ...product, addedToCart: false } : product
      ));
      state.products = newState;
      localStorage.setItem('allProducts', JSON.stringify(state.products));
      localStorage.removeItem(`quantity-${id}`);
    });
    // builder.addCase(fetchProductsFromLocalStorage.fulfilled, (state, action) => {
    //   state.products = action.payload;
    //   state.isLoading = false;
    // });
  },
});

export default productsSlice.reducer;
