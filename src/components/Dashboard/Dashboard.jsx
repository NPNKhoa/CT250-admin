import { useEffect, useState } from 'react';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import statictisService from '../../services/statictis.service';
// import { toast } from 'react-toastify';

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState('0đ');
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const result = await statictisService.getMonthlyRevenue();
        setTotalRevenue(`${result.totalRevenue.toLocaleString()}đ`);
        // toast.success(`${result.message}`);
      } catch (error) {
        console.error('Lỗi khi lấy tổng doanh thu:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTotalOrder = async () => {
      try {
        const result = await statictisService.getTotalOrdersByMonth(
          currentMonth,
          currentYear,
        );

        setTotalOrders(
          `${result.totalOrdersByMonth.toLocaleString()} đơn hàng`,
        );
        // toast.success(`${result.message}`);
      } catch (error) {
        console.error('Lỗi khi lấy tổng số đơn hàng của tháng:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalOrder();
    fetchTotalRevenue();
  }, [currentMonth, currentYear]);

  const statsData = [
    {
      title: 'Thu nhập',
      value: loading ? 'Đang tải...' : totalRevenue,
      description: `Doanh thu tháng ${currentMonth}/${currentYear}`,
      color: 'text-pink-500',
      icon: <LocalAtmIcon className="text-2xl text-white" />,
    },
    {
      title: 'Tổng đơn hàng',
      value: loading ? 'Đang tải...' : totalOrders,
      // description: 'Hơn 35 lần bán hàng mới',
      description: 'Heheheh',
      color: 'text-yellow-500',
      icon: <NewspaperIcon className="text-2xl text-white" />,
    },
    {
      title: 'Tổng khách hàng',
      value: '1,354', // Giá trị này bạn cũng có thể cập nhật từ API
      description: '30+ mới trong 7 ngày',
      color: 'text-blue-500',
      icon: <PersonOutlineIcon className="text-2xl text-white" />,
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="mb-6 flex-col items-center justify-between rounded-lg bg-white shadow-md sm:flex-row">
        <div className="relative h-64 overflow-hidden rounded-lg bg-white p-6 shadow-md">
          <img
            src="https://cdn.luongsport.com/wp-content/uploads/2020/10/vot-cau-long-lining-banner.jpg"
            alt="Sport Banner"
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 z-10 bg-black opacity-25"></div>

          <div className="relative z-20 flex h-full flex-col items-start justify-center gap-3">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Chào mừng trở lại! Thể thao KTB
            </h1>
            <p className="max-w-md text-white">
              Thể thao đóng vai trò quan trọng trong việc nâng cao sức khỏe thể
              chất, tăng cường tinh thần thoải mái, thúc đẩy tinh thần đồng đội
              và tính kỷ luật
            </p>
            <button className="mt-4 rounded-lg bg-primary px-5 py-2 text-white transition hover:bg-hover-primary sm:mt-0">
              Tạo đơn hàng ngay
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
          >
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-700">{stat.title}</h2>
              <p className="rounded-full bg-primary p-2">{stat.icon}</p>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              <p className="mt-2 text-gray-500">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
