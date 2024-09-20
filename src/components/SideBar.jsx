import { Button } from '@mui/material';
import SideBarItemList from './SideBarItemList';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="relative flex h-screen w-1/5 flex-col items-start justify-start bg-slate-200 py-2">
      <Logo />

      <SideBarItemList />

      <div className="absolute bottom-0 left-0 w-full border-t-2 border-slate-400 bg-slate-200 pb-6 pt-4">
        <Button className="w-full" sx={{ padding: '1rem' }} variant="text">
          <span className="flex w-1/2 items-center justify-between">
            <Link to={'/login'}>
              Đăng xuất <LogoutIcon />
            </Link>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
