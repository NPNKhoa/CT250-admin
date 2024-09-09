import PropTypes from 'prop-types';

const Header = ({ currentPage, loggedInUserName }) => {
  return (
    <div className='absolute top-0 right-0 w-full bg-slate-100 p-8'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>{currentPage}</h2>
        <div>
          Xin chào,
          <span className='text-lg font-semibold'>
            {' ' + loggedInUserName}
          </span>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  currentPage: PropTypes.string,
  loggedInUserName: PropTypes.string,
};

export default Header;
