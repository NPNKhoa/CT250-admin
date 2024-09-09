import PropTypes from 'prop-types';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const SideBarItem = ({ icon, title, childItems, isToggled, onClick }) => {
  console.log('render', title);

  return (
    <>
      <div
        className='flex justify-between items-center hover:cursor-pointer hover:bg-slate-300 rounded-md pr-2'
        onClick={() => onClick()}
      >
        <div className='flex justify-start items-center gap-4 rounded-2xl p-4'>
          {icon}
          {title}
        </div>
        {childItems.length !== 0 &&
          (isToggled ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
      </div>

      {isToggled && (
        <div>
          {childItems.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className='p-4 hover:cursor-pointer hover:bg-slate-300 rounded-md ps-14'
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

SideBarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  childItems: PropTypes.array.isRequired,
  isToggled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SideBarItem;
