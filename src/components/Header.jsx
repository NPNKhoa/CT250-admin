import PropTypes from 'prop-types';

const Header = ({ currentPage, loggedInUserName }) => {
  return (
    <div className="h-1/7 absolute right-0 top-0 w-4/5 bg-slate-200 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{currentPage}</h2>
        <div>
          Xin chào,
          <span className="text-lg font-semibold">
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
