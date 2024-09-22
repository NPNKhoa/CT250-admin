import PropTypes from 'prop-types';
import SideBar from '../components/SideBar';
import Header from '../components/Header';

const CommonLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen items-start justify-start">
      <SideBar />
      <div>
        <Header currentPage={'Trang chủ'} loggedInUserName={'Khoa'} />
        <div className="h-6/7 absolute bottom-0 right-0 w-4/5 overflow-auto py-4 ps-4">
          {children}
        </div>
      </div>
    </div>
  );
};

CommonLayout.propTypes = {
  children: PropTypes.node,
};

export default CommonLayout;
