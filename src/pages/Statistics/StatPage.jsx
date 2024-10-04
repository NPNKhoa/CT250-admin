import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RevenueStatistic from '../../components/Dashboard/RevenueStatistic';
import OrderStatistics from './OrderStatistic';
import ProductStatistic from './ProductStatistic';

const StatPage = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const shouldRedirect = true;

  //   if (shouldRedirect) {
  //     navigate('/revenue-stats');
  //   }
  // }, [navigate]);

  return (
    <>
      <RevenueStatistic />
      <OrderStatistics />
      <ProductStatistic />
    </>
  );
};

export default StatPage;
