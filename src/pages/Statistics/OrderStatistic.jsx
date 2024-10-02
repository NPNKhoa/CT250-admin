import React, { useEffect, useState } from 'react';
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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DatePicker from 'react-datepicker';

// Tạo dữ liệu giả
const generateOrderData = (days, multiplier) => {
  return Array.from({ length: days }, () => {
    const total = Math.floor(
      Math.random() * (50 * multiplier) + 25 * multiplier,
    );

    const statusOptions = ['Đã xử lý', 'Chờ xử lý', 'Đã hủy'];
    let status;

    const randomValue = Math.random();
    if (randomValue < 0.6) {
      status = statusOptions[0];
    } else if (randomValue < 0.9) {
      status = statusOptions[1];
    } else {
      status = statusOptions[2];
    }

    return { total, status };
  });
};

const orderData = {
  day: {
    labels: Array.from({ length: 30 }, (_, i) =>
      format(new Date(2024, 8, i + 1), 'dd/MM/yyyy'),
    ),
    data: generateOrderData(30, 1),
  },
  month: {
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
    data: generateOrderData(12, 10),
  },
  year: {
    labels: ['2023', '2024'],
    data: generateOrderData(2, 100),
  },
};

const OrderStatistics = () => {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const years = [];

  const [timeFrame, setTimeFrame] = useState('day');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [showDetails, setShowDetails] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [year, setYear] = useState(currentYear);

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

  const filteredData = orderData[timeFrame].data.filter(
    (item) => statusFilter === 'Tất cả' || item.status === statusFilter,
  );

  const chartData = orderData[timeFrame].labels.map((label, index) => ({
    label,
    total: filteredData[index].total,
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
        </FormControl>{' '}
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
        {/* Lựa chọn trạng thái */}
        {/* <FormControl className="w-1/4">
          <InputLabel>Lọc theo trạng thái</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Lọc theo trạng thái"
          >
            <MenuItem value="Tất cả">Tất cả</MenuItem>
            <MenuItem value="Đã xử lý">Đã xử lý</MenuItem>
            <MenuItem value="Chờ xử lý">Chờ xử lý</MenuItem>
            <MenuItem value="Đã hủy">Đã hủy</MenuItem>
          </Select>
        </FormControl> */}
      </div>

      {/* Biểu đồ đơn hàng */}
      <Card className="mb-6">
        <CardHeader title="Biểu đồ đơn hàng" />
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="total" stroke="#8884d8" />
            </AreaChart>
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
            title={`Chi tiết đơn hàng theo ${
              timeFrame === 'day'
                ? 'ngày'
                : timeFrame === 'month'
                  ? 'tháng'
                  : 'năm'
            }`}
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
                      {timeFrame === 'day'
                        ? 'Ngày'
                        : timeFrame === 'month'
                          ? 'Tháng'
                          : 'Năm'}
                    </TableCell>
                    <TableCell align="right">Tổng đơn hàng</TableCell>
                    <TableCell align="right">Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((order, index) => (
                    <TableRow key={orderData[timeFrame].labels[index]}>
                      <TableCell>
                        {orderData[timeFrame].labels[index]}
                      </TableCell>
                      <TableCell align="right">
                        {order.total.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">{order.status}</TableCell>
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
