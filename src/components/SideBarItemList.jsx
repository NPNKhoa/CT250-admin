import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import SideBarItem from './SideBarItem';

const SideBarItemList = () => {
  const itemList = [
    {
      icon: <HomeIcon />,
      title: 'Trang chủ',
      canToggle: false,
    },
    {
      icon: <InventoryIcon />,
      title: 'Quản lý Sản phẩm',
      canToggle: true,
    },
    {
      icon: <ListAltIcon />,
      title: 'Quản lý Đơn hàng',
      canToggle: true,
    },
    {
      icon: <PeopleIcon />,
      title: 'Quản lý Người dùng',
      canToggle: true,
    },
    {
      icon: <SettingsIcon />,
      title: 'Cấu hình hệ thống',
      canToggle: false,
    },
  ];

  return (
    <div className='overflow-auto mt-4 w-full pr-6 pl-4'>
      {itemList.map((item, index) => (
        <SideBarItem
          key={index}
          icon={item.icon}
          title={item.title}
          canToggle={item.canToggle}
        />
      ))}
    </div>
  );
};

export default SideBarItemList;
