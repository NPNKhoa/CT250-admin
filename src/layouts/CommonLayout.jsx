import PropTypes from 'prop-types';
import SideBar from '../components/common/SideBar';
import Header from '../components/common/Header';
import { useLocation } from 'react-router-dom';
import pages from '../configs/sidebarElements';

const CommonLayout = ({ children }) => {
  const currentPath = useLocation().pathname;

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
        <Header currentPage={currentPageName} loggedInUserName={'Khoa'} />
        <div className="no-scrollbar absolute bottom-0 right-0 h-6/7 w-4/5 overflow-auto p-4 pb-0">
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
