import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const SideBarItem = ({ icon, label, path, childItems, isToggled, onClick }) => {
  const currentPath = useLocation().pathname;

  if (isToggled === true && currentPath !== path) {
    onClick = () => {};
  }

  return (
    <>
      <Link
        to={path}
        className={`flex items-center justify-between rounded-md pr-2 hover:cursor-pointer hover:bg-slate-300 ${
          currentPath === path &&
          'bg-primary font-semibold text-white hover:bg-hover-primary'
        }`}
        onClick={() => onClick()}
      >
        <div className="flex items-center justify-start gap-4 rounded-2xl p-4">
          {icon}
          {label}
        </div>
        {childItems.length !== 0 &&
          (isToggled ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
      </Link>

      {isToggled && (
        <div>
          {childItems.map(({ childId, label, path: childPath }) => (
            <Link
              key={childId}
              to={childPath}
              className={`block rounded-md p-4 ps-14 hover:cursor-pointer hover:bg-slate-300 ${
                currentPath === childPath &&
                'bg-[#e95221] font-semibold text-white hover:bg-[#e78212]'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

SideBarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  childItems: PropTypes.array.isRequired,
  isToggled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SideBarItem;
