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
  },
});

export default store;
