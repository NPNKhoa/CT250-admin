import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const productData = [
  {
    label: 'Vợt cầu lông',
    value: 120,
    percentage: '27%',
    color: 'bg-green-500',
    chartColor: '#28a745',
  },
  {
    label: 'Balo',
    value: 80,
    percentage: '18%',
    color: 'bg-yellow-500',
    chartColor: '#ffc107',
  },
  {
    label: 'Túi',
    value: 50,
    percentage: '11%',
    color: 'bg-red-500',
    chartColor: '#dc3545',
  },
  {
    label: 'Vợt tennis',
    value: 200,
    percentage: '44%',
    color: 'bg-blue-500',
    chartColor: '#007bff',
  },
];

const TotalSalesChart = () => {
  const totalProducts = productData.reduce((acc, item) => acc + item.value, 0); // Tính tổng sản phẩm

  const doughnutData = {
    labels: productData.map((item) => item.label),
    datasets: [
      {
        data: productData.map((item) => item.value),
        backgroundColor: productData.map((item) => item.chartColor),
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

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Tổng doanh số sản phẩm
      </h2>
      <div className="relative flex h-[260px] w-full justify-center">
        <Doughnut data={doughnutData} options={doughnutOptions} />
        <div className="absolute top-36 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-600">Tổng sản phẩm</p>
            <p className="text-xl font-bold text-gray-900">{totalProducts}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center justify-center">
        <ul className="w-full space-y-2">
          {productData.map((product, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <span
                className={`mr-3 inline-block h-4 w-4 rounded-full ${product.color}`}
              ></span>
              <span className="text-sm font-medium">{`${product.label}`}</span>
              <span className="ml-auto text-gray-500">{`${product.value} sản phẩm`}</span>
              <span className="ml-2 text-xs text-gray-400">{`(${product.percentage})`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TotalSalesChart;
