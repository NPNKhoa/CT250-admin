import { Button } from '@mui/material';
import SideBarItemList from './SideBarItemList';
import LogoutIcon from '@mui/icons-material/Logout';

const SideBar = () => {
  return (
    <div className='h-screen w-1/5 flex flex-col justify-start items-start bg-slate-200 py-2 relative'>
      <div className='w-full flex items-center justify-between px-6 pb-1 border-b-2 border-slate-400'>
        <img className='w-20' src='/logo.svg' alt='logo' />
        <h1 className='uppercase text-xl font-bold'>KaTuBa Shop</h1>
      </div>

      <SideBarItemList />

      <div className='absolute bottom-0 left-0 w-full pb-6 pt-4 border-t-2 bg-slate-200 border-slate-400'>
        <Button className='w-full' sx={{ padding: '1rem' }} variant='text'>
          <span className=' w-1/2 flex justify-between items-center'>
            Đăng xuất <LogoutIcon />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
