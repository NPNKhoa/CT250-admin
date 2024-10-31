import PropTypes from 'prop-types';
import SideBar from '../components/common/SideBar';
import Header from '../components/common/Header';
import { useLocation } from 'react-router-dom';
import useRoutes from '../configs/sidebarElements'; // Cập nhật import
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../redux/slice/authSlice';
import { getLoggedInUser } from '../redux/thunk/userThunk';
import PrivateRoute from '../configs/PrivateRoute';

const CommonLayout = ({ children }) => {
  const dispatch = useDispatch();
  const userExist = useSelector((state) => state.users?.user);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken && accessToken) {
      dispatch(setCredentials({ accessToken, refreshToken }));
    }

    if (accessToken) {
      dispatch(getLoggedInUser(accessToken));
    }
  }, [dispatch]);

  const currentPath = useLocation().pathname;
  const pages = useRoutes(); // Lấy pages từ useRoutes

  const findLabelInChildren = (childItems, currentPath) => {
    for (const child of childItems) {
      if (child.path === currentPath) {
        return child.label;
      }

      if (Array.isArray(child.childItems) && child.childItems.length > 0) {
        const foundInSubChildren = findLabelInChildren(
          child.childItems,
          currentPath,
        );
        if (foundInSubChildren) {
          return foundInSubChildren;
        }
      }
    }
    return null;
  };

  const currentPage = pages
    .map((item) => {
      if (item.path === currentPath) {
        return item.label;
      }

      if (Array.isArray(item.childItems) && item.childItems.length > 0) {
        const foundInChildren = findLabelInChildren(
          item.childItems,
          currentPath,
        );
        if (foundInChildren) {
          return foundInChildren;
        }
      }

      return null;
    })
    .filter(Boolean);

  const currentPageName = currentPage.length > 0 ? currentPage[0] : null;

  return (
    <div className="flex h-screen w-screen items-start justify-start">
      <SideBar />
      <div>
        <Header
          currentPage={currentPageName}
          loggedInUserName={userExist?.fullname}
        />
        <div className="no-scrollbar absolute bottom-0 right-0 h-6/7 w-4/5 overflow-auto p-4 pb-0">
          <PrivateRoute>{children}</PrivateRoute>
        </div>
      </div>
    </div>
  );
};

CommonLayout.propTypes = {
  children: PropTypes.node,
};

export default CommonLayout;
