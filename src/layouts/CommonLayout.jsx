import PropTypes from 'prop-types';
import SideBar from '../components/SideBar';
import Header from '../components/Header';

const CommonLayout = ({ children }) => {
  return (
    <div className='w-screen h-screen flex justify-start items-center'>
      <SideBar />
      <div className='w-4/5'>
        <Header currentPage={'Trang chủ'} loggedInUserName={'Khoa'} />
        <div className='ps-4'>{children}</div>
      </div>
    </div>
  );
};

CommonLayout.propTypes = {
  children: PropTypes.node,
};

export default CommonLayout;
