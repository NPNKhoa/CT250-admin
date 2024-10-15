import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import { toVietnamCurrencyFormat } from '../../helpers/currencyConvertion';
// import { toast } from 'react-toastify';

function Dashboard({
  totalRevenue,
  totalOrders,
  totalUsers,
  totalProductsSold,
}) {
  const statsData = [
    {
      title: 'Tổng doanh thu',
      value: toVietnamCurrencyFormat(totalRevenue),
      color: 'text-pink-500',
      icon: <LocalAtmIcon className="text-2xl text-white" />,
    },
    {
      title: 'Tổng đơn hàng',
      value: totalOrders,
      color: 'text-yellow-500',
      icon: <NewspaperIcon className="text-2xl text-white" />,
    },
    {
      title: 'Tổng sản phẩm',
      value: totalProductsSold,
      color: 'text-yellow-500',
      icon: <SportsTennisIcon className="text-2xl text-white" />,
    },
    {
      title: 'Tổng khách hàng',
      value: `${totalUsers} người dùng`,
      color: 'text-blue-500',
      icon: <PersonOutlineIcon className="text-2xl text-white" />,
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Stats Cards */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg bg-white p-4 shadow-md transition hover:shadow-lg"
          >
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-700">{stat.title}</h2>
              <p className="rounded-full bg-primary p-2">{stat.icon}</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">{stat.value}</p>
              <p className="mt-2 text-gray-500">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
