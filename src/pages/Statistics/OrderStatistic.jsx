import { useEffect, useState } from 'react';
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
import 'jspdf-autotable';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DatePicker from 'react-datepicker';
import statictisService from '../../services/statictis.service';

// Dữ liệu thống kê theo tháng
// const monthlyStatistics = [
//   {
//     month: 1,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//     'Chờ xử lý': 0,
//   },
//   {
//     month: 2,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//     'Chờ xử lý': 0,
//   },
//   {
//     month: 3,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//     'Chờ xử lý': 0,
//   },
//   {
//     month: 4,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//     'Chờ xử lý': 0,
//   },
//   {
//     month: 5,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//     'Chờ xử lý': 0,
//   },
//   {
//     month: 6,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//     'Chờ xử lý': 0,
//   },
//   {
//     month: 7,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//     'Chờ xử lý': 0,
//   },
//   {
//     month: 8,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//     'Chờ xử lý': 0,
//   },
//   {
//     month: 9,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//     'Chờ xử lý': 1,
//   },
//   {
//     month: 10,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//     'Chờ xử lý': 4,
//   },
//   {
//     month: 11,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//     'Chờ xử lý': 0,
//   },
//   {
//     month: 12,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//     'Chờ xử lý': 0,
//   },
// ];

// Dữ liệu thống kê theo năm
// const yearlyStatistics = [
//   {
//     year: 2023,
//     'Đã giao hàng': 0,
//     'Đã hủy': 0,
//     'Chờ xử lý': 1,
//   },
//   {
//     year: 2024,
//     'Đã giao hàng': 0,
//     'Đã hủy': 0,
//     'Chờ xử lý': 5,
//   },
// ];

// const orderStatistics = [
//   {
//     date: '2024-10-01',
//     'Chờ xử lý': 0,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//   },
//   {
//     date: '2024-10-02',
//     'Chờ xử lý': 0,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//   },
//   {
//     date: '2024-10-03',
//     'Chờ xử lý': 4,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//   },
//   {
//     date: '2024-10-04',
//     'Chờ xử lý': 0,
//     'Đã hủy': 0,
//     'Đã giao hàng': 0,
//   },
//   // Có thể thêm dữ liệu cho các tháng khác ở đây
// ];

const OrderStatistics = () => {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const years = [];
  const [timeFrame, setTimeFrame] = useState('day'); // Mặc định chọn theo tháng
  const [year, setYear] = useState(currentYear);
  const [showDetails, setShowDetails] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalOrderPerYear, setTotalOrderPerYear] = useState([]);
  const [totalOrderAllYear, setTotalOrderAllYear] = useState([]);
  const [totalOrderByTime, setTotalOrderBytime] = useState([]);

  useEffect(() => {
    const today = new Date();

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng 0-11
      const year = date.getFullYear();
      return `${year}/${month}/${day}`;
    };

    setStartDate(formatDate(sevenDaysAgo));
    setEndDate(formatDate(today));
  }, []);
  for (let i = startYear; i <= currentYear; i++) {
    years.push(i);
  }

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    const fetchTotalOrdersPerYear = async () => {
      try {
        const response =
          await statictisService.getTotalOrdersPerYear(currentYear);

        setTotalOrderPerYear(response);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API', error);
      }
    };

    const fetchTotalOrdersAllYear = async () => {
      try {
        const response = await statictisService.getTotalOrdersPerMonthByYear();

        setTotalOrderAllYear(response);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API', error);
      }
    };

    const fetchTotalOrdersByTime = async () => {
      try {
        const response = await statictisService.getTotalOrdersByDateRange(
          startDate,
          endDate,
        );

        setTotalOrderBytime(response);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API', error);
      }
    };
    if (timeFrame === 'month' || timeFrame === 'year') {
      fetchTotalOrdersAllYear();
      fetchTotalOrdersPerYear();
    } else {
      fetchTotalOrdersByTime();
    }
  }, [currentYear, startDate, endDate, timeFrame]);

  console.log(totalOrderPerYear.statistics);
  console.log(totalOrderAllYear.statistics);
  console.log(totalOrderByTime.statistics);

  const handleStartDateChange = (date) => {
    if (date) {
      setStartDate(format(date, 'yyyy/MM/dd'));
    }
  };

  const handleEndDateChange = (date) => {
    if (date) {
      setEndDate(format(date, 'yyyy/MM/dd'));
    }
  };

  const chartData =
    timeFrame === 'month'
      ? totalOrderPerYear.statistics?.map((item) => ({
          label: `Tháng ${item.month}`,
          'Đã hủy': item['Đã hủy'],
          'Đã giao hàng': item['Đã giao hàng'],
          'Chờ xử lý': item['Chờ xử lý'],
        }))
      : timeFrame === 'year'
        ? totalOrderAllYear.statistics?.map((item) => ({
            label: item.year.toString(),
            'Đã hủy': item['Đã hủy'],
            'Đã giao hàng': item['Đã giao hàng'],
            'Chờ xử lý': item['Chờ xử lý'],
          }))
        : totalOrderByTime.statistics?.map((item) => ({
            label: item.date.toString(),
            'Đã hủy': item['Đã hủy'],
            'Đã giao hàng': item['Đã giao hàng'],
            'Chờ xử lý': item['Chờ xử lý'],
          }));

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-6 text-4xl font-bold text-gray-800">
        Thống kê đơn hàng
      </h1>

      {/* Lựa chọn thời gian */}
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
            onChange={(e) => setYear(e.target.value)}
          >
            {totalOrderAllYear.statistics?.map((stat) => (
              <option key={stat.year} value={stat.year}>
                {stat.year}
              </option>
            ))}
          </select>
        )}

        {timeFrame === 'day' && (
          <div className="flex items-center space-x-4">
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Ngày bắt đầu"
              className="rounded border p-2"
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="Ngày kết thúc"
              className="rounded border p-2"
            />
          </div>
        )}
      </div>

      {/* Biểu đồ đơn hàng */}
      <Card className="mb-6">
        <CardHeader title="Biểu đồ đơn hàng" />
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Đã hủy" stroke="#ff0000" />
              <Line type="monotone" dataKey="Đã giao hàng" stroke="#00ff00" />
              <Line type="monotone" dataKey="Chờ xử lý" stroke="#0000ff" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="my-6 flex justify-end gap-5">
        <Button
          variant="contained"
          color="secondary"
          className="ml-4"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'}
        </Button>
      </div>

      {/* Bảng chi tiết đơn hàng */}
      {showDetails && (
        <Card>
          <CardHeader
            title={`Chi tiết đơn hàng theo ${timeFrame === 'month' ? 'tháng' : 'năm'}`}
          />
          <CardContent>
            <TableContainer
              component={Paper}
              style={{ maxHeight: 400, overflowY: 'auto' }}
            >
              <Table aria-label="Chi tiết đơn hàng">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {timeFrame === 'month' ? 'Tháng' : 'Năm'}
                    </TableCell>
                    <TableCell align="right">Đã hủy</TableCell>
                    <TableCell align="right">Đã giao hàng</TableCell>
                    <TableCell align="right">Chờ xử lý</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timeFrame === 'month' &&
                    totalOrderPerYear.statistics?.map((stat) => (
                      <TableRow key={stat.month}>
                        <TableCell>{`Tháng ${stat.month}`}</TableCell>
                        <TableCell>{stat['Đã hủy']}</TableCell>
                        <TableCell>{stat['Đã giao hàng']}</TableCell>
                        <TableCell>{stat['Chờ xử lý']}</TableCell>
                      </TableRow>
                    ))}
                  {timeFrame === 'year' &&
                    totalOrderAllYear.statistics?.map((stat) => (
                      <TableRow key={stat.year}>
                        <TableCell>{stat.year}</TableCell>
                        <TableCell>{stat['Đã hủy']}</TableCell>
                        <TableCell>{stat['Đã giao hàng']}</TableCell>
                        <TableCell>{stat['Chờ xử lý']}</TableCell>
                      </TableRow>
                    ))}
                  {timeFrame === 'day' &&
                    totalOrderByTime.statistics?.map((stat) => (
                      <TableRow key={stat.date}>
                        <TableCell>
                          {format(new Date(stat.date), 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell>{stat['Đã hủy']}</TableCell>
                        <TableCell>{stat['Đã giao hàng']}</TableCell>
                        <TableCell>{stat['Chờ xử lý']}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderStatistics;
