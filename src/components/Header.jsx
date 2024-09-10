import PropTypes from 'prop-types';

const Header = ({ currentPage, loggedInUserName }) => {
  return (
    <div className='w-full float-end bg-slate-200 p-8 mb-4'>
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
