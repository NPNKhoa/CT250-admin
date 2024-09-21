import { Link } from 'react-router-dom';

const Logo = ({ ...props }) => {
  return (
    <div {...props}>
      <Link
        to={'/'}
        className="flex w-full items-center justify-between border-b-2 border-slate-400 px-6 pb-1"
      >
        <img className="w-20" src="/logo.svg" alt="logo" />
        <h1 className="text-xl font-bold uppercase">KTB Sport</h1>
      </Link>
    </div>
  );
};

export default Logo;
