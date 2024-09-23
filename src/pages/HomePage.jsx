import Dashboard from '../components/Dashboard/Dashboard';
import RecentOrders from '../components/Dashboard/RecentOrders ';
import RevenueChart from '../components/Dashboard/RevenueChart ';
import TotalSalesChart from '../components/Dashboard/TotalSalesChart';

const HomePage = () => {
  return (
    <>
      <div className="px-6">
        <Dashboard />
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-2 flex flex-col">
            <div className="flex-1">
              <RevenueChart />
            </div>
          </div>
          <div className="col-span-1 flex flex-col">
            <div className="flex-1">
              <TotalSalesChart />
            </div>
          </div>
        </div>
        <RecentOrders />
      </div>
    </>
  );
};

export default HomePage;
