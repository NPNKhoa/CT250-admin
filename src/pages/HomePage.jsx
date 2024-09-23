import Dashboard from '../components/Dashboard/Dashboard';
import RevenueChart from '../components/Dashboard/RevenueChart ';
import TotalSalesChart from '../components/Dashboard/TotalSalesChart';

const HomePage = () => {
  return (
    <>
      <div className="p-6">
        <Dashboard />
        <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-2">
          <RevenueChart />
          <TotalSalesChart />
        </div>
      </div>
    </>
  );
};

export default HomePage;
