import { Card, CardContent, CardHeader } from '@mui/material';
import { format } from 'date-fns';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from 'recharts';

// eslint-disable-next-line react/prop-types
const ProductSalesChart = ({ statictisByTime, timeFrame, year, time }) => {
  const chartData = statictisByTime?.map((item) => {
    // Xác định label dựa trên timeFrame
    const label =
      timeFrame === 'day' || timeFrame === 'month'
        ? item.time
        : timeFrame === 'year'
          ? item.month
          : [];

    return {
      label,
      'Đã bán': item.totalProductsSold || 0,
    };
  });

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

  return (
    <div className="container mx-auto px-2">
      <Card className="mb-6">
        <CardHeader
          title={
            <span className="text-xl font-semibold italic">
              {`Số lượng sản phẩm bán ra ${
                timeFrame === 'day'
                  ? `từ ${
                      time?.startDate
                        ? formatDate(time.startDate)
                        : 'ngày bắt đầu không hợp lệ'
                    } đến ${
                      time?.endDate
                        ? formatDate(time.endDate)
                        : 'ngày kết thúc không hợp lệ'
                    }`
                  : timeFrame === 'month'
                    ? `của tháng ${format(new Date(), ` MM/${year}`)}`
                    : `năm ${year}`
              }`}
            </span>
          }
        />
        <CardContent>
          <ResponsiveContainer width="100%" height={450}>
            <ComposedChart
              width={500}
              height={400}
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: '12px' }} />
              <YAxis
                tick={{ fontSize: '12px' }}
                allowDecimals={false}
                tickFormatter={(value) => Math.round(value)}
              />
              <Tooltip />
              {/* Biểu đồ cột hiển thị tổng số sản phẩm đã bán */}
              <Bar dataKey="Đã bán" barSize={50} fill="#66b0ff" />
              {/* Biểu đồ đường hiển thị tổng số sản phẩm đã bán */}
              <Line type="monotone" dataKey="Đã bán" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductSalesChart;
