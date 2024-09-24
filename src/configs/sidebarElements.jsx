import { v4 as uuidv4 } from 'uuid';

import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessibilityIcon from '@mui/icons-material/Accessibility';

import {
  BrandPage,
  DeliveryPage,
  DiscountPage,
  HomePage,
  OrderPage,
  OrderStatusPage,
  PaymentPage,
  ProductPage,
  ProductTypePage,
  PromotionPage,
  SettingsPage,
  SpecificationPage,
  UserPage,
  VoucherPage,
  AuthorizationPage,
  StatPage,
  RevenueStatistic,
  OrderStatistic,
} from '../pages';

export default [
  {
    id: uuidv4(),
    path: '/',
    element: <HomePage />,
    icon: <HomeIcon />,
    label: 'Trang chủ',
    childItems: [],
  },
  {
    id: uuidv4(),
    path: '/statistics',
    element: <StatPage />,
    icon: <AssessmentIcon />,
    label: 'Thống kê',
    childItems: [
      {
        label: 'Doanh Thu',
        path: '/revenue-stats',
        element: <RevenueStatistic />,
      },
      {
        label: 'Đơn hàng',
        path: '/order-stats',
        element: <OrderStatistic />,
      },
      {
        label: 'Sản phẩm',
        path: '/product-stats',
        element: <DeliveryPage />,
      },
    ],
  },
  {
    id: uuidv4(),
    path: '/product',
    element: <ProductPage />,
    icon: <InventoryIcon />,
    label: 'Quản lý Sản phẩm',
    childItems: [
      {
        childId: `${uuidv4()}-child`,
        label: 'Ưu đãi',
        path: '/promotion',
        element: <PromotionPage />,
      },
      {
        childId: `${uuidv4()}-child`,
        label: 'Voucher',
        path: '/voucher',
        element: <VoucherPage />,
      },
      {
        childId: `${uuidv4()}-child`,
        label: 'Giảm giá',
        path: '/discount',
        element: <DiscountPage />,
      },
      {
        childId: `${uuidv4()}-child`,
        label: 'Nhãn hàng',
        path: '/brand',
        element: <BrandPage />,
      },
      {
        childId: `${uuidv4()}-child`,
        label: 'Loại thông số',
        path: '/specification',
        element: <SpecificationPage />,
      },
      {
        childId: `${uuidv4()}-child`,
        label: 'Loại sản phẩm',
        path: '/product-type',
        element: <ProductTypePage />,
      },
    ],
  },
  {
    id: uuidv4(),
    path: '/order',
    element: <OrderPage />,
    icon: <ListAltIcon />,
    label: 'Quản lý Đơn hàng',
    childItems: [
      {
        label: 'Trạng thái',
        path: '/order-status',
        element: <OrderStatusPage />,
      },
      {
        label: 'Thanh toán',
        path: '/payment',
        element: <PaymentPage />,
      },
      {
        label: 'Vận chuyển',
        path: '/delivery',
        element: <DeliveryPage />,
      },
    ],
  },
  {
    id: uuidv4(),
    path: '/user',
    element: <UserPage />,
    icon: <PeopleIcon />,
    label: 'Quản lý Người dùng',
    childItems: [],
  },
  {
    id: uuidv4(),
    path: '/authorization',
    element: <AuthorizationPage />,
    icon: <AccessibilityIcon />,
    label: 'Phân quyền người dùng',
    childItems: [],
  },
  {
    id: uuidv4(),
    path: '/settings',
    element: <SettingsPage />,
    icon: <SettingsIcon />,
    label: 'Cấu hình hệ thống',
    childItems: [],
  },
];
