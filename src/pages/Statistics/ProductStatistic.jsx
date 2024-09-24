import { useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
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
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Dữ liệu giả cho sản phẩm
const productData = [
  { name: 'Vợt cầu lông', sold: 120 },
  { name: 'Túi cầu lông', sold: 80 },
  { name: 'Balo cầu lông', sold: 150 },
  { name: 'Phụ kiện cầu lông', sold: 70 },
  { name: 'Vợt tennis', sold: 20 },
  { name: 'Túi tennis', sold: 60 },
  { name: 'Balo tennis', sold: 100 },
  { name: 'Phụ kiện tennis', sold: 90 },
];

// Tạo dữ liệu thống kê sản phẩm theo ngày, tháng, năm
const generateProductSalesData = (days, products) => {
  return Array.from({ length: days }, () => {
    const sales = products.map((product) => ({
      name: product.name,
      sold: Math.floor(Math.random() * 200),
    }));
    return sales;
  });
};

// Dữ liệu thống kê sản phẩm giả
const salesData = {
  day: {
    labels: Array.from({ length: 30 }, (_, i) => `Ngày ${i + 1}`),
    data: generateProductSalesData(30, productData),
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
    data: generateProductSalesData(12, productData),
  },
  year: {
    labels: ['2023', '2024'],
    data: generateProductSalesData(2, productData),
  },
};

const ProductStatistic = () => {
  const [timeFrame, setTimeFrame] = useState('day');
  const [showDetails, setShowDetails] = useState(false);

  // Xuất dữ liệu sang PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Thống kê sản phẩm', 20, 10);
    doc.autoTable({ html: '#product-table' });
    doc.save('thong_ke_san_pham.pdf');
  };

  // Xuất dữ liệu sang Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      salesData[timeFrame].data.flat(),
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Doanh thu');
    XLSX.writeFile(workbook, 'thong_ke_san_pham.xlsx');
  };

  // Chuẩn bị dữ liệu cho biểu đồ Line
  const lineChartData = {
    labels: salesData[timeFrame].labels,
    datasets: productData.map((product, index) => ({
      label: product.name,
      data: salesData[timeFrame].data.map(
        (sales) => sales.find((s) => s.name === product.name)?.sold || 0,
      ),
      borderColor: `rgba(${75 + index * 20}, ${192 - index * 30}, 192, 1)`,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    })),
  };

  // Chuẩn bị dữ liệu cho biểu đồ Doughnut
  const totalSales = productData.map((product) => ({
    name: product.name,
    sold: salesData[timeFrame].data.reduce(
      (total, sales) =>
        total + sales.find((s) => s.name === product.name)?.sold || 0,
      0,
    ),
  }));

  const donutChartData = {
    labels: totalSales.map((product) => product.name),
    datasets: [
      {
        data: totalSales.map((product) => product.sold),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-6 text-4xl font-bold text-gray-800">
        Thống kê sản phẩm
      </h1>

      {/* Lựa chọn thời gian */}
      <div className="mb-6 flex justify-end">
        <FormControl variant="outlined" className="w-1/4">
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

      {/* Biểu đồ đường số lượng sản phẩm bán ra */}
      <Card className="mb-6">
        <CardHeader title="Biểu đồ đường số lượng loại sản phẩm bán ra" />
        <CardContent>
          <Line data={lineChartData} options={chartOptions} />
        </CardContent>
      </Card>

      {/* Biểu đồ donut thống kê số lượng sản phẩm */}
      <Card className="mb-6">
        <CardHeader title="Thống kê số lượng loại sản phẩm bán ra" />
        <CardContent>
          <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
            <Doughnut
              data={donutChartData}
              options={{ ...chartOptions, maintainAspectRatio: false }}
            />
          </div>
        </CardContent>
        <div className="mt-4 flex flex-col items-center justify-center">
          <ul className="w-full space-y-2">
            {totalSales.map((product, index) => {
              const totalSold = totalSales.reduce(
                (acc, prod) => acc + prod.sold,
                0,
              );
              const percentage = totalSold
                ? ((product.sold / totalSold) * 100).toFixed(2)
                : 0; // Tính tỷ lệ phần trăm
              return (
                <li key={index} className="flex items-center text-gray-700">
                  <span
                    className={`mr-3 inline-block h-4 w-4 rounded-full`}
                    style={{
                      backgroundColor:
                        donutChartData.datasets[0].backgroundColor[index], // Màu sắc cho từng sản phẩm
                    }}
                  ></span>
                  <span className="text-sm font-medium">{`${product.name}`}</span>
                  <span className="ml-auto text-gray-500">{`${product.sold} sản phẩm`}</span>
                  <span className="ml-2 text-xs text-gray-400">{`(${percentage}%)`}</span>{' '}
                  {/* Hiển thị tỷ lệ phần trăm */}
                </li>
              );
            })}
          </ul>
        </div>
      </Card>

      <div className="my-6 flex justify-end gap-5">
        <Button variant="contained" color="primary" onClick={exportPDF}>
          Xuất file PDF
        </Button>
        <Button variant="contained" color="secondary" onClick={exportExcel}>
          Xuất file Excel
        </Button>
        <Button
          variant="contained"
          color="default"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'}
        </Button>
      </div>

      {/* Bảng chi tiết sản phẩm bán chạy */}
      {showDetails && (
        <Card>
          <CardHeader
            title={`Chi tiết số lượng sản phẩm theo ${timeFrame === 'day' ? 'ngày' : timeFrame === 'month' ? 'tháng' : 'năm'}`}
          />
          <CardContent>
            <TableContainer component={Paper}>
              <Table id="product-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Số lượng bán ra</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {totalSales.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.sold}</TableCell>
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

export default ProductStatistic;
