import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalSalesChart = () => {
  const doughnutData = {
    labels: ['Shippings', 'Refunds', 'Order', 'Income'],
    datasets: [
      {
        label: 'Total Sales',
        data: [32.98, 11, 14.87, 3271],
        backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#007bff'],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <div className="rounded-lg bg-white shadow">
      <h2 className="mb-4 text-xl font-bold">Total Sales</h2>
      <div className="relative">
        <Doughnut data={doughnutData} options={doughnutOptions} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-semibold">Total Sales</p>
            <p className="text-2xl font-bold">9600</p>
          </div>
        </div>
      </div>
      <ul className="mt-4 space-y-1">
        <li className="flex items-center text-green-500">
          <span className="mr-2 inline-block h-4 w-4 rounded-full bg-green-500"></span>
          Shippings $32.98 (2%)
        </li>
        <li className="flex items-center text-yellow-500">
          <span className="mr-2 inline-block h-4 w-4 rounded-full bg-yellow-500"></span>
          Refunds $11 (11%)
        </li>
        <li className="flex items-center text-red-500">
          <span className="mr-2 inline-block h-4 w-4 rounded-full bg-red-500"></span>
          Order $14.87 (1%)
        </li>
        <li className="flex items-center text-blue-500">
          <span className="mr-2 inline-block h-4 w-4 rounded-full bg-blue-500"></span>
          Income $3271 (86%)
        </li>
      </ul>
    </div>
  );
};

export default TotalSalesChart;
