import { configureStore } from '@reduxjs/toolkit';
import productSlice from "./slice/productSlice";

const store = configureStore({
    reducer: {
        product: productSlice
    }
});

export default store;