import PropTypes from 'prop-types';
import SideBar from '../components/SideBar';
import Header from '../components/Header';

const CommonLayout = ({ children }) => {
  return (
    <div className='w-screen h-screen flex justify-start items-center overflow-hidden'>
      <div className='block w-1/5'>
        <SideBar className='w-full' />
      </div>
      <div className='w-4/5 flex flex-col relative'>
        <Header currentPage={'Trang chủ'} loggedInUserName={'Khoa'} />
        {children}
      </div>
    </div>
  );
};

CommonLayout.propTypes = {
  children: PropTypes.node,
};

export default CommonLayout;
