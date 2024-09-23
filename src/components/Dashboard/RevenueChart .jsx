import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const RevenueChart = () => {
  const barData = {
    labels: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],

    datasets: [
      {
        label: 'Tổng Doanh Thu',
        data: [
          20000000, 30000000, 40000000, 60000000, 50000000, 70000000, 120000000,
          150000000, 130000000, 110000000, 90000000, 80000000,
        ],
        backgroundColor: 'rgba(0, 123, 255, 0.6)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Đã Thanh Toán',
        data: [
          15000000, 20000000, 30000000, 40000000, 45000000, 60000000, 80000000,
          100000000, 90000000, 70000000, 50000000, 40000000,
        ],
        backgroundColor: 'rgba(40, 167, 69, 0.6)',
        borderColor: 'rgba(40, 167, 69, 1)',
        borderWidth: 1,
      },
      {
        label: 'Chưa Thanh Toán',
        data: [
          5000000, 10000000, 10000000, 20000000, 5000000, 10000000, 40000000,
          50000000, 40000000, 40000000, 40000000, 40000000,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
          color: '#333',
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ₫${value.toLocaleString()}`;
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
        footerFont: {
          size: 10,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
          },
          callback: (value) => `₫${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Doanh thu hàng tháng
        </h2>
        <select className="rounded border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>2023</option>
          <option>2024</option>
        </select>
      </div>
      <Bar data={barData} options={barOptions} />
      <p className="mt-4 text-sm text-gray-500">(+63%) so với năm ngoái</p>
    </div>
  );
};

export default RevenueChart;
