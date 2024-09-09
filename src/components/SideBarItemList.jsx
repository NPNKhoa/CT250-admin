import { useState } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import SideBarItem from './SideBarItem';
import RedeemIcon from '@mui/icons-material/Redeem';

const SideBarItemList = () => {
  const itemList = [
    {
      icon: <HomeIcon />,
      title: 'Trang chủ',
      label: 'home',
      childItems: [],
    },
    {
      icon: <InventoryIcon />,
      title: 'Quản lý Sản phẩm',
      label: 'product',
      childItems: [
        'Ưu đãi',
        'Giảm giá',
        'Nhãn hàng',
        'Loại thông số',
        'Loại sản phẩm',
      ],
    },
    {
      icon: <ListAltIcon />,
      title: 'Quản lý Đơn hàng',
      label: 'order',
      childItems: ['Trạng thái', 'Thanh toán', 'Vận chuyển'],
    },
    {
      icon: <PeopleIcon />,
      title: 'Quản lý Người dùng',
      label: 'user',
      childItems: [],
    },
    {
      icon: <RedeemIcon />,
      title: 'Voucher',
      label: 'voucher',
      childItems: [],
    },
    {
      icon: <SettingsIcon />,
      title: 'Cấu hình hệ thống',
      label: 'settings',
      childItems: [],
    },
  ];

  const [isToggled, setIsToggled] = useState({});

  const handleClickedItem = (label) => {
    label !== '' &&
      setIsToggled((prevState) => ({
        ...prevState,
        [label]: !prevState[label],
      }));
  };

  return (
    <div className='overflow-auto h-3/4 mt-4 w-full pr-6 pl-4 no-scrollbar'>
      {itemList.map(({ icon, title, label, childItems }, index) => (
        <SideBarItem
          key={index}
          label={label}
          icon={icon}
          title={title}
          childItems={childItems}
          isToggled={isToggled[label] || false}
          onClick={() => handleClickedItem(label)}
        />
      ))}
    </div>
  );
};

export default SideBarItemList;
