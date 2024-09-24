import { useState } from 'react';
import { Line } from 'react-chartjs-2';
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

// Đăng ký các thành phần Chart.js cần thiết
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

// Tạo dữ liệu giả
const generateOrderData = (days, multiplier) => {
  return Array.from({ length: days }, () => {
    // Tạo số ngẫu nhiên cho tổng đơn hàng với phân phối lệch
    const total = Math.floor(
      Math.random() * (50 * multiplier) + 25 * multiplier,
    ); // Tổng đơn hàng có thể nằm trong khoảng 250 đến 750

    // Tạo phân phối lệch cho trạng thái
    const statusOptions = ['Đã xử lý', 'Chờ xử lý', 'Đã hủy'];
    let status;

    // Sử dụng xác suất để xác định trạng thái
    const randomValue = Math.random();
    if (randomValue < 0.6) {
      // 60% khả năng cho 'Đã xử lý'
      status = statusOptions[0];
    } else if (randomValue < 0.9) {
      // 30% khả năng cho 'Chờ xử lý'
      status = statusOptions[1];
    } else {
      // 10% khả năng cho 'Đã hủy'
      status = statusOptions[2];
    }

    return { total, status };
  });
};

// Dữ liệu đơn hàng theo ngày, tháng và năm
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
  const [timeFrame, setTimeFrame] = useState('day');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [showDetails, setShowDetails] = useState(false);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Chi tiết đơn hàng', 10, 10);

    const tableColumn = ['Ngày/Tháng/Năm', 'Tổng đơn hàng', 'Trạng thái'];
    const tableRows = orderData[timeFrame].labels.map((label, index) => [
      label,
      orderData[timeFrame].data[index].total.toLocaleString(),
      orderData[timeFrame].data[index].status,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save(`order_${timeFrame}.pdf`);
  };

  const exportExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheetData = [
      ['Ngày/Tháng/Năm', 'Tổng đơn hàng', 'Trạng thái'],
      ...orderData[timeFrame].labels.map((label, index) => [
        label,
        orderData[timeFrame].data[index].total,
        orderData[timeFrame].data[index].status,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Đơn hàng');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(data, `order_${timeFrame}.xlsx`);
  };

  const filteredData = orderData[timeFrame].data.filter(
    (item) => statusFilter === 'Tất cả' || item.status === statusFilter,
  );

  const chartData = {
    labels: orderData[timeFrame].labels,
    datasets: [
      {
        label: 'Tổng đơn hàng',
        data: filteredData.map((item) => item.total),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw.toLocaleString()} đơn hàng`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString(),
        },
      },
    },
  };

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
            <MenuItem value="day">Theo ngày</MenuItem>
            <MenuItem value="month">Theo tháng</MenuItem>
            <MenuItem value="year">Theo năm</MenuItem>
          </Select>
        </FormControl>

        {/* Lựa chọn trạng thái */}
        <FormControl className="w-1/4">
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
        </FormControl>
      </div>

      {/* Biểu đồ đơn hàng */}
      <Card className="mb-6">
        <CardHeader title="Biểu đồ đơn hàng" />
        <CardContent>
          <Line data={chartData} options={chartOptions} />
        </CardContent>
      </Card>

      <div className="my-6 flex justify-end gap-5">
        <Button variant="contained" color="primary" onClick={exportPDF}>
          Xuất file PDF
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={exportExcel}
          className="ml-4"
        >
          Xuất file Excel
        </Button>{' '}
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
