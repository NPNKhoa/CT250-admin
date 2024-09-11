import PropTypes from 'prop-types';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Link, useLocation } from 'react-router-dom';

const SideBarItem = ({ icon, label, path, childItems, isToggled, onClick }) => {
  const currentPath = useLocation().pathname;

  // prevent the child list shrink when move from a child item to parent item
  if (isToggled === true && currentPath !== path) {
    onClick = () => {};
  }

  return (
    <>
      <Link
        to={path}
        className={`flex justify-between items-center hover:cursor-pointer hover:bg-slate-300 rounded-md pr-2 ${
          currentPath === path &&
          'text-white font-semibold bg-[#e95221] hover:bg-[#e78212]'
        }`}
        onClick={() => onClick()}
      >
        <div className='flex justify-start items-center gap-4 rounded-2xl p-4'>
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
              className={`p-4 block hover:cursor-pointer hover:bg-slate-300 rounded-md ps-14 ${
                currentPath === childPath &&
                'text-white font-semibold bg-[#e95221] hover:bg-[#e78212]'
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
