import PropTypes from 'prop-types';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Link } from 'react-router-dom';

const SideBarItem = ({ icon, label, path, childItems, isToggled, onClick }) => {
  return (
    <>
      <Link
        to={path}
        className='flex justify-between items-center hover:cursor-pointer hover:bg-slate-300 rounded-md pr-2'
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
          {childItems.map(({ childId, label, path }) => (
            <Link
              key={childId}
              to={path}
              className='p-4 block hover:cursor-pointer hover:bg-slate-300 rounded-md ps-14'
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
