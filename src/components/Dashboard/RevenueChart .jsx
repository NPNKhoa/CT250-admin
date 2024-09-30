import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import statictisService from '../../services/statictis.service';
import { toVietnamCurrencyFormat } from '../../helpers/currencyConvertion';

const RevenueChart = () => {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const years = [];
  const [year, setYear] = useState(currentYear);
  const [revenueData, setRevenueData] = useState(null);

  for (let i = startYear; i <= currentYear; i++) {
    years.push(i);
  }

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const data = await statictisService.getRevenueByYear(year);
        setRevenueData(data.revenueData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu doanh thu:', error);
      }
    };

    fetchRevenueData();
  }, [year]);

  const initialChartData = Array.from({ length: 12 }, (_, index) => ({
    name: `Tháng ${index + 1}`,
    totalRevenue: 0,
    paidRevenue: 0,
    unpaidRevenue: 0,
  }));

  const chartData = revenueData
    ? initialChartData.map((item, index) => ({
        ...item,
        totalRevenue: revenueData.totalRevenueData[index] || 0,
        paidRevenue: revenueData.paidRevenueData[index] || 0,
        unpaidRevenue: revenueData.unpaidRevenueData[index] || 0,
      }))
    : initialChartData;

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Doanh thu hàng tháng
        </h2>
        <select
          className="w-[150px] rounded border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {years.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} />
          <YAxis tickFormatter={(value) => toVietnamCurrencyFormat(value)} />
          <Tooltip
            formatter={(value) => toVietnamCurrencyFormat(value)}
            labelFormatter={(label) => `Tháng: ${label}`}
          />
          <Legend />
          <Bar
            dataKey="paidRevenue"
            stackId="a"
            fill="#8884d8"
            name="Đã Thanh Toán"
          />
          <Bar
            dataKey="unpaidRevenue"
            stackId="a"
            fill="#82ca9d"
            name="Chưa Thanh Toán"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
