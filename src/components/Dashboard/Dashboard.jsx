import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const statsData = [
  {
    title: 'Thu nhập',
    value: '100.000.000đ',
    description: 'Doanh thu hàng tháng',
    color: 'text-pink-500',
    icon: <LocalAtmIcon className="text-2xl text-white" />,
  },
  {
    title: 'Tổng đơn hàng',
    value: '1,339',
    description: 'Hơn 35 lần bán hàng mới',
    color: 'text-yellow-500',
    icon: <NewspaperIcon className="text-2xl text-white" />,
  },
  {
    title: 'Tổng khách hàng',
    value: '1,354',
    description: '30+ mới trong 7 ngày',
    color: 'text-blue-500',
    icon: <PersonOutlineIcon className="text-2xl text-white" />,
  },
];

const Dashboard = () => {
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
