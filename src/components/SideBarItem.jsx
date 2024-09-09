import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SideBarItem = ({ icon, title, canToggle }) => {
  return (
    <div className='flex justify-between items-center hover:cursor-pointer hover:bg-slate-300 rounded-md pr-2'>
      <div className='flex justify-start items-center gap-4 rounded-2xl p-4'>
        {icon}
        {title}
      </div>
      {canToggle && <KeyboardArrowDownIcon />}
    </div>
  );
};

SideBarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  canToggle: PropTypes.bool.isRequired,
};

export default SideBarItem;
