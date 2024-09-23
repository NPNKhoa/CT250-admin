import PropTypes from 'prop-types';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';
import pages from '../configs/sidebarElements';

const CommonLayout = ({ children }) => {
  const currentPath = useLocation().pathname;

  const currentPageName = pages.find((item) => item.path === currentPath).label;

  return (
    <div className="flex h-screen w-screen items-start justify-start">
      <SideBar />
      <div>
        <Header currentPage={currentPageName} loggedInUserName={'Khoa'} />
        <div className="no-scrollbar absolute bottom-0 right-0 h-6/7 w-4/5 overflow-auto p-4">
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
