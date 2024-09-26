import { useEffect, useState } from 'react';
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
import statictisService from '../../services/statictis.service';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const RevenueChart = () => {
  const [year, setYear] = useState(2024);
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(true);

  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = startYear; i <= currentYear; i++) {
    years.push(i);
  }

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setLoading(true);
        const data = await statictisService.getRevenueByYear(year);
        setRevenueData(data.revenueData);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu doanh thu:', error);
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, [year]);

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
    datasets: revenueData
      ? [
          {
            label: 'Tổng Doanh Thu',
            data: revenueData.totalRevenueData,
            backgroundColor: 'rgba(0, 123, 255, 0.6)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
          },
          {
            label: 'Đã Thanh Toán',
            data: revenueData.paidRevenueData,
            backgroundColor: 'rgba(40, 167, 69, 0.6)',
            borderColor: 'rgba(40, 167, 69, 1)',
            borderWidth: 1,
          },
          {
            label: 'Chưa Thanh Toán',
            data: revenueData.unpaidRevenueData,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ]
      : [],
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
        <select
          className="rounded border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={year}
          onChange={(e) => setYear(e.target.value)} // Cập nhật năm khi chọn
        >
          {years.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <Bar data={barData} options={barOptions} height={180} />
      )}

      {/* <p className="mt-4 text-sm text-gray-500">(+63%) so với năm ngoái</p> */}
    </div>
  );
};

export default RevenueChart;
