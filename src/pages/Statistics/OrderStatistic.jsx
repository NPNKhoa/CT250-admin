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

// Tạo dữ liệu giả
const generateOrderData = (days, multiplier) => {
  return Array.from({ length: days }, () => {
    const total = Math.floor(Math.random() * (500 * multiplier)); // Tổng đơn hàng
    return total;
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

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Chi tiết đơn hàng', 10, 10);

    const tableColumn = ['Ngày/Tháng/Năm', 'Tổng đơn hàng'];
    const tableRows = orderData[timeFrame].labels.map((label, index) => [
      label,
      orderData[timeFrame].data[index].toLocaleString(),
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
      ['Ngày/Tháng/Năm', 'Tổng đơn hàng'],
      ...orderData[timeFrame].labels.map((label, index) => [
        label,
        orderData[timeFrame].data[index],
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

  const chartData = {
    labels: orderData[timeFrame].labels,
    datasets: [
      {
        label: 'Tổng đơn hàng',
        data: orderData[timeFrame].data,
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
      <div className="mb-6 flex justify-end">
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
        </Button>
      </div>

      {/* Bảng chi tiết đơn hàng */}
      <Card>
        <CardHeader
          title={`Chi tiết đơn hàng theo ${timeFrame === 'day' ? 'ngày' : timeFrame === 'month' ? 'tháng' : 'năm'}`}
        />
        <CardContent>
          <TableContainer component={Paper}>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData[timeFrame].labels.map((label, index) => (
                  <TableRow key={label}>
                    <TableCell>{label}</TableCell>
                    <TableCell align="right">
                      {orderData[timeFrame].data[index].toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderStatistics;
