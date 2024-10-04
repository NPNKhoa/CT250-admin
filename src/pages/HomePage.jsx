import Dashboard from '../components/Dashboard/Dashboard';
import RecentOrders from '../components/Dashboard/RecentOrders ';
import RevenueStatistic from '../components/Dashboard/RevenueStatistic';
import TopSellingProduct from '../components/Dashboard/TopSellingProduct';
import TotalSalesChart from '../components/Dashboard/TotalSalesChart';

const HomePage = () => {
  return (
    <>
      <div className="px-6">
        <Dashboard />
        <div className="mt-6 grid grid-cols-1 gap-6">
          <div className="flex flex-col">
            <div className="h-full">
              <RevenueStatistic />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="h-full">
              <TotalSalesChart />
            </div>
            <div className="col-span-2 h-full">
              <TopSellingProduct />
            </div>
          </div>
        </div>
        <RecentOrders />
      </div>
    </>
  );
};

export default HomePage;
