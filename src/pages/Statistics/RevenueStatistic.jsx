import { useState } from 'react';
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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Tạo dữ liệu giả, với tổng doanh thu bằng tổng "Chưa thanh toán" và "Đã thanh toán"
const generateRevenueData = (days, multiplier) => {
  return Array.from({ length: days }, () => {
    const paid = Math.floor(Math.random() * (500000 * multiplier)); // Đã thanh toán
    const unpaid = Math.floor(Math.random() * (500000 * multiplier)); // Chưa thanh toán
    const total = paid + unpaid; // Tổng doanh thu bằng tổng hai giá trị trên
    return { total, unpaid, paid };
  });
};

// Fake dữ liệu doanh thu theo ngày, tháng và năm
const revenueData = {
  day: {
    labels: Array.from({ length: 30 }, (_, i) =>
      format(new Date(2024, 8, i + 1), 'dd/MM/yyyy'),
    ),
    data: generateRevenueData(30, 1),
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
    data: generateRevenueData(12, 10),
  },
  year: {
    labels: ['2023', '2024'],
    data: generateRevenueData(5, 100),
  },
};

const RevenueStatistic = () => {
  const [timeFrame, setTimeFrame] = useState('day');
  const [showDetails, setShowDetails] = useState(false);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Chi tiết doanh thu', 10, 10);

    const tableColumn = [
      'Ngày/Tháng/Năm',
      'Tổng doanh thu (VNĐ)',
      'Chưa thanh toán (VNĐ)',
      'Đã thanh toán (VNĐ)',
    ];
    const tableRows = revenueData[timeFrame].labels.map((label, index) => [
      label,
      revenueData[timeFrame].data[index].total.toLocaleString(),
      revenueData[timeFrame].data[index].unpaid.toLocaleString(),
      revenueData[timeFrame].data[index].paid.toLocaleString(),
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save(`revenue_${timeFrame}.pdf`);
  };

  const exportExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheetData = [
      [
        'Ngày/Tháng/Năm',
        'Tổng doanh thu (VNĐ)',
        'Chưa thanh toán (VNĐ)',
        'Đã thanh toán (VNĐ)',
      ],
      ...revenueData[timeFrame].labels.map((label, index) => [
        label,
        revenueData[timeFrame].data[index].total,
        revenueData[timeFrame].data[index].unpaid,
        revenueData[timeFrame].data[index].paid,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Doanh thu');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(data, `revenue_${timeFrame}.xlsx`);
  };

  const chartData = {
    labels: revenueData[timeFrame].labels,
    datasets: [
      {
        label: 'Tổng doanh thu (VNĐ)',
        data: revenueData[timeFrame].data.map((item) => item.total),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Chưa thanh toán (VNĐ)',
        data: revenueData[timeFrame].data.map((item) => item.unpaid),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Đã thanh toán (VNĐ)',
        data: revenueData[timeFrame].data.map((item) => item.paid),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
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

      {/* Lựa chọn thời gian */}
      <div className="mb-6 flex justify-end">
        <FormControl className="w-1/4">
          {/* Thay đổi kích thước tại đây */}
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

      {/* Biểu đồ doanh thu */}
      <Card className="mb-6">
        <CardHeader title="Biểu đồ doanh thu" />
        <CardContent>
          <Bar data={chartData} options={chartOptions} />
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
        <Button
          variant="contained"
          color="secondary"
          className="ml-4"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'}
        </Button>
      </div>

      {/* Bảng chi tiết doanh thu */}
      {showDetails && (
        <Card>
          <CardHeader
            title={`Chi tiết doanh thu theo ${timeFrame === 'day' ? 'ngày' : timeFrame === 'month' ? 'tháng' : 'năm'}`}
          />
          <CardContent>
            <TableContainer
              component={Paper}
              style={{ maxHeight: 400, overflowY: 'auto' }}
            >
              <Table aria-label="Chi tiết doanh thu">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {timeFrame === 'day'
                        ? 'Ngày'
                        : timeFrame === 'month'
                          ? 'Tháng'
                          : 'Năm'}
                    </TableCell>
                    <TableCell align="right">Tổng doanh thu (VNĐ)</TableCell>
                    <TableCell align="right">Chưa thanh toán (VNĐ)</TableCell>
                    <TableCell align="right">Đã thanh toán (VNĐ)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {revenueData[timeFrame].labels.map((label, index) => (
                    <TableRow key={label}>
                      <TableCell>{label}</TableCell>
                      <TableCell align="right">
                        {revenueData[timeFrame].data[
                          index
                        ].total.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        {revenueData[timeFrame].data[
                          index
                        ].unpaid.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        {revenueData[timeFrame].data[
                          index
                        ].paid.toLocaleString()}
                      </TableCell>
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

export default RevenueStatistic;
