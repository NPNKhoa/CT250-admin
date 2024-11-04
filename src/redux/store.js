import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slice/productSlice';
import brandSlice from './slice/brandSlice';
import productTypeSlice from './slice/productTypeSlice';
import promotionSlice from './slice/promotionSlice';
import discountSlice from './slice/discountSlice';
import voucherSlice from './slice/voucherSlice';
import specificationSlice from './slice/specificationSlice';
import serviceSlice from './slice/serviceSlice';
import systemConfigSlice from './slice/systemConfigSlice';
import priceFilterSlice from './slice/priceFilter';
import coreValueSlice from './slice/coreValueSlice';
import founderSlice from './slice/founderSlice';
import orderSlice from './slice/orderSlice';
import categorySlice from './slice/categorySlice';
import userSlice from './slice/userSlice';
import authSlice from './slice/authSlice';
import articleSlice from './slice/articleSlice';

const store = configureStore({
  reducer: {
    product: productSlice,
    brand: brandSlice,
    productType: productTypeSlice,
    promotion: promotionSlice,
    discount: discountSlice,
    voucher: voucherSlice,
    specification: specificationSlice,
    service: serviceSlice,
    systemConfigs: systemConfigSlice,
    priceFilters: priceFilterSlice,
    coreValues: coreValueSlice,
    founders: founderSlice,
    order: orderSlice,
    category: categorySlice,
    users: userSlice,
    auth: authSlice,
    article: articleSlice,
  },
});

export default store;
