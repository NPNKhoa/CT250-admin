import { Card, CardContent, CardHeader } from '@mui/material';
import { format } from 'date-fns';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { curveCardinal } from 'd3-shape';

// eslint-disable-next-line react/prop-types
const UserStatistic = ({
  statictisByTime,
  timeFrame,
  year,
  time,
  totalUsers,
}) => {
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
      'Người dùng': item.totalUsers || 0,
    };
  });

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };
  const cardinal = curveCardinal.tension(0.2);
  return (
    <div className="container mx-auto px-2">
      <Card className="mb-6">
        <CardHeader
          title={
            <span className="text-xl font-semibold italic">
              {`Số người dùng ${
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
              } (${totalUsers} người dùng)`}
            </span>
          }
        />
        <CardContent>
          <ResponsiveContainer width="100%" height={450}>
            <AreaChart
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
              <Area
                type="monotone"
                dataKey="Người dùng"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
              <Area
                type={cardinal}
                dataKey="Người dùng"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatistic;
