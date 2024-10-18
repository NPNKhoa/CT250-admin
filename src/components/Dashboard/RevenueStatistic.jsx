import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format } from 'date-fns';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
// eslint-disable-next-line react/prop-types
const RevenueStatistic = ({ timeFrame, year, statictisByTime, time }) => {
  const getDataset = (data, label, backgroundColor, borderColor) => ({
    label,
    data,
    backgroundColor,
    borderColor,
    borderWidth: 1,
  });

  const getDateLabels = (data) => data?.map((item) => item.time);
  const getYearLabels = (data) => data?.map((item) => item.month);
  const chartData = {
    labels:
      timeFrame === 'day' || timeFrame === 'month'
        ? getDateLabels(statictisByTime)
        : timeFrame === 'year'
          ? getYearLabels(statictisByTime)
          : [],

    datasets: [
      getDataset(
        statictisByTime
          ? statictisByTime?.map((item) => item.totalRevenue)
          : [],
        'Tổng Doanh Thu',
        'rgba(0, 123, 255, 0.6)',
        'rgba(0, 123, 255, 1)',
      ),
      getDataset(
        statictisByTime ? statictisByTime.map((item) => item.paidRevenue) : [],
        'Đã Thanh Toán',
        'rgba(40, 167, 69, 0.6)',
        'rgba(40, 167, 69, 1)',
      ),
      getDataset(
        statictisByTime
          ? statictisByTime.map((item) => item.unpaidRevenue)
          : [],
        'Chưa Thanh Toán',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 99, 132, 1)',
      ),
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw.toLocaleString()} VNĐ`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString(),
          color: '#666',
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
      x: {
        ticks: {
          color: '#666',
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
    },
  };

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

  return (
    <div className="container mx-auto pt-6">
      <Card className="mb-6">
        <CardHeader
          title={
            <span className="text-xl font-semibold italic">
              {`Doanh thu ${
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
          <Bar data={chartData} options={chartOptions} height={100} />
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueStatistic;
