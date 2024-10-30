import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, CardHeader } from '@mui/material';
import { format } from 'date-fns';

ChartJS.register(ArcElement, Tooltip, Legend);

const softColors = [
  'rgba(255, 99, 71, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 99, 132, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
  'rgba(54, 235, 162, 0.6)',
  'rgba(255, 86, 206, 0.6)',
  'rgba(102, 153, 255, 0.6)',
  'rgba(192, 75, 75, 0.6)',
  'rgba(86, 255, 159, 0.6)',
];
// eslint-disable-next-line react/prop-types
const TotalSalesChart = ({
  productTypeSummary = [],
  totalProductsSold,
  time,
  year,
  timeFrame,
}) => {
  // Kiểm tra nếu productTypeSummary tồn tại và không phải là mảng trống
  const doughnutData = {
    labels: productTypeSummary.map((item) => item.productType),
    datasets: [
      {
        data: productTypeSummary.map((item) => item.totalSold),
        backgroundColor: productTypeSummary.map(
          (_, index) => softColors[index % softColors.length],
        ),
        hoverOffset: 6,
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 10,
          },
          color: '#333',
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} sản phẩm`;
          },
        },
      },
    },
  };

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

  return (
    <div className="container mx-auto px-2 py-6">
      <Card className="mb-6">
        <CardHeader
          title={
            <span className="text-xl font-semibold italic">
              {`Danh mục sản phẩm ${
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
        <CardContent className="grid h-[458px] rounded-lg bg-white shadow-xl">
          <div className="relative flex h-[340px] w-full justify-center">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="absolute top-40 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-600">
                  Tổng sản phẩm
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {totalProductsSold}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="mt-2 flex h-[125px] flex-col items-center justify-center p-4">
            <ul className="w-full space-y-1 overflow-y-auto">
              {productTypeSummary.map((product, index) => (
                <li
                  key={index}
                  className="mx-auto flex items-center text-gray-700"
                >
                  <span
                    className="mr-3 inline-block h-4 w-4 rounded-full"
                    style={{
                      backgroundColor: softColors[index % softColors.length],
                    }}
                  ></span>
                  <span className="text-sm font-medium">
                    {product.productType}
                  </span>
                  <span className="ml-auto text-gray-500">{`${product.totalSold} sản phẩm`}</span>
                  <span className="ml-2 text-xs text-gray-400">
                    {`(${((product.totalSold / totalProductsSold) * 100).toFixed(2)}%)`}
                  </span>
                </li>
              ))}
            </ul>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default TotalSalesChart;
