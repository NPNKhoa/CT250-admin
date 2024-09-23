import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import icon từ Material-UI

const RecentOrders = () => {
  const orders = [
    {
      id: 1,
      orderNumber: 'ORD001',
      productName: 'Vợt cầu lông',
      orderDate: '2024-09-01',
      price: 120000,
      status: 'Đã giao',
    },
    {
      id: 2,
      orderNumber: 'ORD002',
      productName: 'Balo',
      orderDate: '2024-09-03',
      price: 80000,
      status: 'Đang vận chuyển',
    },
    {
      id: 3,
      orderNumber: 'ORD003',
      productName: 'Túi xách',
      orderDate: '2024-09-05',
      price: 50000,
      status: 'Đã hủy',
    },
    {
      id: 4,
      orderNumber: 'ORD004',
      productName: 'Vợt tennis',
      orderDate: '2024-09-07',
      price: 200000,
      status: 'Đã giao',
    },
  ];

  return (
    <div className="container mx-auto mt-5 px-4">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Đơn hàng gần đây
      </h2>
      <table className="w-full border-collapse overflow-hidden rounded-lg bg-white shadow-md">
        <thead className="bg-primary text-white">
          <tr>
            <th className="border px-4 py-2 text-left">Mã đơn hàng</th>
            <th className="border px-4 py-2 text-left">Tên sản phẩm</th>
            <th className="border px-4 py-2 text-left">Ngày đặt hàng</th>
            <th className="border px-4 py-2 text-left">Giá</th>
            <th className="border px-4 py-2 text-left">Trạng thái</th>
            <th className="border px-4 py-2 text-left">Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(
              ({ id, orderNumber, productName, orderDate, price, status }) => (
                <tr key={id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{orderNumber}</td>
                  <td className="border px-4 py-2">{productName}</td>
                  <td className="border px-4 py-2">{orderDate}</td>
                  <td className="border px-4 py-2">{`${price.toLocaleString()} đ`}</td>
                  <td className="border px-4 py-2">{status}</td>
                  <td className="border px-4 py-2 text-center">
                    <IconButton color="primary">
                      <VisibilityIcon />
                    </IconButton>
                  </td>{' '}
                  {/* Cột cho icon Xem chi tiết */}
                </tr>
              ),
            )
          ) : (
            <tr>
              <td
                colSpan="6"
                className="border px-4 py-2 text-center text-gray-500"
              >
                Không có đơn hàng nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
