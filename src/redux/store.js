import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

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

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users', 'auth'],
};

const rootReducer = combineReducers({
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
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
