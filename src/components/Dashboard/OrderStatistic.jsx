import { Card, CardContent } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// eslint-disable-next-line react/prop-types
const OrderStatistics = ({ totalOrderByTime, timeFrame }) => {
  // Chuyển đổi dữ liệu thành định dạng phù hợp với biểu đồ
  const chartData = totalOrderByTime?.map((item) => {
    const orderStatusSummary = item.orderStatusSummary.reduce((acc, status) => {
      acc[status.orderStatus] = status.totalOrders;
      return acc;
    }, {});

    return {
      label:
        timeFrame === 'day' || timeFrame === 'month'
          ? item.time
          : timeFrame === 'year'
            ? item.month
            : [],
      'Chờ xử lý': orderStatusSummary['Chờ xử lý'] || 0, // Tổng đơn hàng chờ xử lý
      'Đã giao hàng': orderStatusSummary['Đã giao hàng'] || 0, // Tổng đơn hàng đã giao
      'Đã hủy': orderStatusSummary['Đã hủy'] || 0, // Tổng đơn hàng đã hủy (nếu có)
    };
  });

  return (
    <div className="container mx-auto px-2 py-6">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">
        Thống kê đơn hàng đơn hàng
      </h1>

      {/* Biểu đồ đơn hàng */}
      <Card className="mb-6">
        <CardContent>
          <ResponsiveContainer width="100%" height={450}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: '12px' }} />
              <YAxis
                tick={{ fontSize: '12px' }}
                allowDecimals={false}
                tickFormatter={(value) => Math.round(value)}
              />
              <Tooltip />
              {/* Vẽ các đường biểu diễn cho các trạng thái đơn hàng */}
              <Line type="monotone" dataKey="Chờ xử lý" stroke="#ff7300" />
              <Line type="monotone" dataKey="Đã giao hàng" stroke="#00ff00" />
              <Line type="monotone" dataKey="Đã hủy" stroke="#ff0000" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderStatistics;
