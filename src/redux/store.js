import { configureStore } from '@reduxjs/toolkit';
import productSlice from "./slice/productSlice";
import brandSlice from './slice/brandSlice';
import productTypeSlice from './slice/productTypeSlice';
import promotionSlice from './slice/promotionSlice';
import discountSlice from './slice/discountSlice';
import voucherSlice from './slice/voucherSlice';
import specificationSlice from './slice/specificationSlice';

const store = configureStore({
    reducer: {
        product: productSlice,
        brand: brandSlice,
        productType: productTypeSlice,
        promotion: promotionSlice,
        discount: discountSlice,
        voucher: voucherSlice,
        specification: specificationSlice
    }
});

export default store;