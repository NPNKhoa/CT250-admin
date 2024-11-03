import { v4 as uuidv4 } from 'uuid';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import GradeIcon from '@mui/icons-material/Grade';
import {
  BrandPage,
  DiscountPage,
  HomePage,
  OrderPage,
  ProductPage,
  ProductTypePage,
  PromotionPage,
  SettingPageWrapper,
  SpecificationPage,
  UserPage,
  VoucherPage,
  ServicePage,
  CategoryPage,
} from '../pages';
import { useSelector } from 'react-redux';
import RatingPage from '../pages/RatingPage';

// Tạo component để lấy role người dùng và định nghĩa routes
const useRoutes = () => {
  const userRole = useSelector((state) => state.users?.user?.role?.role);

  const routes = [
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
      path: '/product',
      element: <ProductPage />,
      icon: <InventoryIcon />,
      label: 'Quản lý Sản phẩm',
      childItems: [
        {
          childId: `${uuidv4()}-child`,
          label: 'Giảm giá',
          path: '/discount',
          element: <DiscountPage />,
        },
        {
          childId: `${uuidv4()}-child`,
          label: 'Ưu đãi',
          path: '/promotion',
          element: <PromotionPage />,
        },
        {
          childId: `${uuidv4()}-child`,
          label: 'Dịch vụ',
          path: '/service',
          element: <ServicePage />,
        },
        {
          childId: `${uuidv4()}-child`,
          label: 'Voucher',
          path: '/voucher',
          element: <VoucherPage />,
        },
        {
          childId: `${uuidv4()}-child`,
          label: 'Danh mục',
          path: '/category',
          element: <CategoryPage />,
        },
        {
          childId: `${uuidv4()}-child`,
          label: 'Thương hiệu',
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
      childItems: [],
    },
    {
      id: uuidv4(),
      path: '/rating',
      element: <RatingPage />,
      icon: <GradeIcon />,
      label: 'Quản lý Đánh giá',
      childItems: [],
    },
  ];

  if (userRole === 'admin') {
    routes.push(
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
        path: '/settings',
        element: <SettingPageWrapper />,
        icon: <SettingsIcon />,
        label: 'Cấu hình hệ thống',
        childItems: [],
      },
    );
  }

  return routes;
};

export default useRoutes;
