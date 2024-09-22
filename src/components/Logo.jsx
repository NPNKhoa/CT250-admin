import { Link } from 'react-router-dom';

const Logo = ({ ...props }) => {
  return (
    <div {...props}>
      <Link
        to={'/'}
        className="flex w-full items-center justify-between px-6 pt-2"
      >
        <img className="w-20" src="/logo.svg" alt="logo" />
        <h1 className="text-xl font-bold uppercase">KTB Sport</h1>
      </Link>
    </div>
  );
};

export default Logo;
