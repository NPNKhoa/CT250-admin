import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import statictisService from '../../services/statictis.service';

const generateRevenueData = (days, multiplier) => {
  return Array.from({ length: days }, () => {
    const paid = Math.floor(Math.random() * (500000 * multiplier));
    const unpaid = Math.floor(Math.random() * (500000 * multiplier));
    const total = paid + unpaid;
    return { total, unpaid, paid };
  });
};

const RevenueStatistic = () => {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const years = [];

  const [timeFrame, setTimeFrame] = useState('day');
  const [showDetails, setShowDetails] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [year, setYear] = useState(currentYear);
  const [revenue, setRevenue] = useState(null);
  const [revenueAllYears, setRevenueAllYears] = useState(null);
  const [loading, setLoading] = useState(true);

  for (let i = startYear; i <= currentYear; i++) {
    years.push(i);
  }

  useEffect(() => {
    const fetchRevenueYear = async () => {
      try {
        const response = await statictisService.getRevenueByYear(year);

        if (response) {
          setRevenue(response);
        } else {
          console.error('Không có dữ liệu doanh thu.');
        }
      } catch (error) {
        console.error('Lỗi khi lấy doanh thu:', error);
      }
    };

    const fetchRevenueAllYear = async () => {
      try {
        const response = await statictisService.getRevenueForAllYears();
        // console.log(response);

        if (response) {
          setRevenueAllYears(response);
        } else {
          console.error('Không có dữ liệu doanh thu.');
        }
      } catch (error) {
        console.error('Lỗi khi lấy doanh thu:', error);
      }
    };

    if (timeFrame === 'month' || timeFrame === 'year') {
      fetchRevenueYear();
      fetchRevenueAllYear();
    }
  }, [year, timeFrame]);

  const revenueDataDay = {
    labels: Array.from({ length: 30 }, (_, i) =>
      format(new Date(2024, 8, i + 1), 'dd/MM/yyyy'),
    ),
    data: generateRevenueData(30, 1),
  };

  const filteredDataByDateRange = () => {
    if (timeFrame === 'month' || timeFrame === 'year') {
      return revenue ? revenue : { labels: [], data: [] };
    }

    if (timeFrame === 'day' && startDate && endDate) {
      const formattedStartDate = format(startDate, 'dd/MM/yyyy');
      const formattedEndDate = format(endDate, 'dd/MM/yyyy');

      const startIndex = revenueDataDay.labels.findIndex(
        (date) =>
          format(
            new Date(date.split('/').reverse().join('-')),
            'dd/MM/yyyy',
          ) === formattedStartDate,
      );
      const endIndex = revenueDataDay.labels.findIndex(
        (date) =>
          format(
            new Date(date.split('/').reverse().join('-')),
            'dd/MM/yyyy',
          ) === formattedEndDate,
      );

      if (startIndex === -1 || endIndex === -1) return { labels: [], data: [] };

      return {
        labels: revenueDataDay.labels.slice(startIndex, endIndex + 1),
        data: revenueDataDay.data.slice(startIndex, endIndex + 1),
      };
    }

    return revenueDataDay;
  };

  // const revenueResults = [
  //   {
  //     year: 2023,
  //     totalRevenue: 739000,
  //     paidRevenue: 0,
  //     unpaidRevenue: 739000,
  //   },
  //   {
  //     year: 2024,
  //     totalRevenue: 7430100,
  //     paidRevenue: 4631000,
  //     unpaidRevenue: 2799100,
  //   },
  // ];

  // Hàm để lấy nhãn năm từ revenueResults
  const getYearLabels = (data) => data.map((item) => item.year);

  const getMonthLabels = () => [
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
  ];

  const getDayLabels = (data) => data.map((d) => `Ngày ${d.day}`);

  const getDataset = (data, label, backgroundColor, borderColor) => ({
    label,
    data,
    backgroundColor,
    borderColor,
    borderWidth: 1,
  });

  const chartData = {
    labels:
      timeFrame === 'month'
        ? getMonthLabels()
        : timeFrame === 'year'
          ? getYearLabels(revenueAllYears.revenueResults) // Sử dụng hàm getYearLabels
          : revenueDataDay
            ? getDayLabels(revenueDataDay.data)
            : [],

    datasets:
      timeFrame === 'month' && revenue
        ? [
            getDataset(
              revenue.revenueData.totalRevenueData,
              'Tổng Doanh Thu',
              'rgba(0, 123, 255, 0.6)',
              'rgba(0, 123, 255, 1)',
            ),
            getDataset(
              revenue.revenueData.paidRevenueData,
              'Đã Thanh Toán',
              'rgba(40, 167, 69, 0.6)',
              'rgba(40, 167, 69, 1)',
            ),
            getDataset(
              revenue.revenueData.unpaidRevenueData,
              'Chưa Thanh Toán',
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 99, 132, 1)',
            ),
          ]
        : timeFrame === 'year' && revenueAllYears
          ? [
              getDataset(
                revenueAllYears.revenueResults.map((item) => item.totalRevenue),
                'Tổng Doanh Thu',
                'rgba(0, 123, 255, 0.6)',
                'rgba(0, 123, 255, 1)',
              ),
              getDataset(
                revenueAllYears.revenueResults.map((item) => item.paidRevenue),
                'Đã Thanh Toán',
                'rgba(40, 167, 69, 0.6)',
                'rgba(40, 167, 69, 1)',
              ),
              getDataset(
                revenueAllYears.revenueResults.map(
                  (item) => item.unpaidRevenue,
                ),
                'Chưa Thanh Toán',
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 99, 132, 1)',
              ),
            ]
          : [
              getDataset(
                revenueDataDay.data.map((d) => d.total),
                'Tổng Doanh Thu',
                'rgba(0, 123, 255, 0.6)',
                'rgba(0, 123, 255, 1)',
              ),
              getDataset(
                revenueDataDay.data.map((d) => d.paid),
                'Đã Thanh Toán',
                'rgba(40, 167, 69, 0.6)',
                'rgba(40, 167, 69, 1)',
              ),
              getDataset(
                revenueDataDay.data.map((d) => d.unpaid),
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

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-6 text-4xl font-bold text-gray-800">
        Thống kê doanh thu
      </h1>

      <div className="mb-6 flex justify-between">
        <FormControl className="w-1/4">
          <InputLabel>Chọn thời gian</InputLabel>
          <Select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            label="Chọn thời gian"
          >
            <MenuItem value="day">Theo khoảng thời gian</MenuItem>
            <MenuItem value="month">Theo tháng</MenuItem>
            <MenuItem value="year">Theo năm</MenuItem>
          </Select>
        </FormControl>
        {timeFrame === 'month' && (
          <select
            className="w-[200px] rounded border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={year}
            onChange={(e) => setYear(e.target.value)} // Cập nhật năm khi chọn
          >
            {years.map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>
        )}

        {timeFrame === 'day' && (
          <div className="flex items-center space-x-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Ngày bắt đầu"
              className="rounded border p-2"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="Ngày kết thúc"
              className="rounded border p-2"
            />
          </div>
        )}
      </div>

      <Card className="mb-6">
        <CardHeader title="Biểu đồ doanh thu" />
        <CardContent>
          <Bar data={chartData} options={chartOptions} height={100} />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader
          title="Chi tiết doanh thu"
          action={
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="outlined"
            >
              {showDetails ? 'Ẩn chi tiết' : 'Hiển thị chi tiết'}
            </Button>
          }
        />
        {showDetails && (
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ngày/Tháng</TableCell>
                    <TableCell align="right">Tổng Doanh Thu</TableCell>
                    <TableCell align="right">Đã Thanh Toán</TableCell>
                    <TableCell align="right">Chưa Thanh Toán</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDataByDateRange().labels.map((date, index) => (
                    <TableRow key={date}>
                      <TableCell component="th" scope="row">
                        {date}
                      </TableCell>
                      <TableCell align="right">
                        {filteredDataByDateRange().data[
                          index
                        ].total.toLocaleString()}{' '}
                        VNĐ
                      </TableCell>
                      <TableCell align="right">
                        {filteredDataByDateRange().data[
                          index
                        ].paid.toLocaleString()}{' '}
                        VNĐ
                      </TableCell>
                      <TableCell align="right">
                        {filteredDataByDateRange().data[
                          index
                        ].unpaid.toLocaleString()}{' '}
                        VNĐ
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default RevenueStatistic;
