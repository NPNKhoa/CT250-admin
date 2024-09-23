import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const RevenueChart = () => {
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Total Income',
        data: [20000, 25000, 40000, 60000, 50000, 70000, 120000],
        fill: true,
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        borderColor: 'rgba(0, 255, 0, 1)',
        pointBackgroundColor: 'green',
        pointBorderColor: '#fff',
      },
      {
        label: 'Total Expense',
        data: [80000, 60000, 40000, 50000, 30000, 20000, 10000],
        fill: true,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        pointBackgroundColor: 'orange',
        pointBorderColor: '#fff',
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Revenue</h2>
        <select className="rounded border p-1">
          <option>2019</option>
          <option>2020</option>
          <option>2021</option>
        </select>
      </div>
      <Line data={lineData} options={lineOptions} />
      <p className="mt-2 text-gray-600">(+63%) than last year</p>
    </div>
  );
};

export default RevenueChart;
