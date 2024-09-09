import CircularProgress from '@mui/material/CircularProgress';

const LoadingPage = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <CircularProgress color='inherit' />
    </div>
  );
};

export default LoadingPage;
