import { useEffect, useState } from 'react';
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

// Đăng ký các thành phần cần thiết
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import statictisService from '../../services/statictis.service';
import TopSellingProduct from '../../components/Dashboard/TopSellingProduct';

// Dữ liệu giả cho sản phẩm
const productData = [
  { name: 'Vợt cầu lông', sold: 12 },
  { name: 'Túi cầu lông', sold: 8 },
  { name: 'Balo cầu lông', sold: 15 },
  { name: 'Phụ kiện cầu lông', sold: 7 },
  { name: 'Vợt tennis', sold: 2 },
  { name: 'Túi tennis', sold: 6 },
  { name: 'Balo tennis', sold: 10 },
  { name: 'Phụ kiện tennis', sold: 9 },
];

// Hàm tạo dữ liệu thống kê hợp lý hơn

// Dữ liệu thống kê sản phẩm giả với mức cơ sở hợp lý

const softColors = [
  'rgba(255, 99, 71, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 99, 132, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
  'rgba(54, 235, 162, 0.6)',
  'rgba(255, 86, 206, 0.6)',
  'rgba(102, 153, 255, 0.6)',
  'rgba(192, 75, 75, 0.6)',
  'rgba(86, 255, 159, 0.6)',
];
const ProductStatistic = () => {
  const [timeFrame, setTimeFrame] = useState('day');
  const [showDetails, setShowDetails] = useState(false);
  const [productData, setProductData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [productTypeFerYear, setProductTypeFerYear] = useState([]);
  const year = 2024;

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    const fetchProductData = async () => {
      try {
        const response = await statictisService.getQuantityPerProductType();
        const data = response.data;

        const formattedData = data.map((item, index) => ({
          label: item.productType,
          value: item.totalSold,
          percentage: `${item.percentage}%`,
          chartColor: softColors[index % softColors.length],
        }));

        setProductData(formattedData);

        // Tính tổng sản phẩm
        const total = formattedData.reduce((acc, item) => acc + item.value, 0);
        setTotalProducts(total);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API', error);
      }
    };
    const fetchProductDataPerYear = async () => {
      try {
        const response =
          await statictisService.getQuantityPerProductTypePerYear(year);

        setProductTypeFerYear(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API', error);
      }
    };

    fetchProductDataPerYear();
    fetchProductData();
  }, []);

  console.log(productTypeFerYear);

  // const generateProductSalesData = (numPeriods, products, baseFactor) => {
  //   return Array.from({ length: numPeriods }, () => {
  //     return products.map((product, index) => ({
  //       name: product.name,
  //       sold: Math.floor(
  //         baseFactor * (Math.random() * 0.5 + 0.5) * (1 + index * 0.3),
  //       ), // Thay đổi để tạo sự lệch
  //     }));
  //   });
  // };
  // const productTypeForYear = {
  //   data: [
  //     {
  //       productType: 'Balo cầu lông',
  //       monthlySales: [
  //         { month: 1, totalSold: 0 },
  //         { month: 2, totalSold: 0 },
  //         { month: 3, totalSold: 0 },
  //         { month: 4, totalSold: 0 },
  //         { month: 5, totalSold: 0 },
  //         { month: 6, totalSold: 0 },
  //         { month: 7, totalSold: 0 },
  //         { month: 8, totalSold: 0 },
  //         { month: 9, totalSold: 0 },
  //         { month: 10, totalSold: 1 },
  //         { month: 11, totalSold: 0 },
  //         { month: 12, totalSold: 0 },
  //       ],
  //     },
  //     {
  //       productType: 'Túi vợt cầu lông',
  //       monthlySales: [
  //         { month: 1, totalSold: 0 },
  //         { month: 2, totalSold: 0 },
  //         { month: 3, totalSold: 0 },
  //         { month: 4, totalSold: 0 },
  //         { month: 5, totalSold: 0 },
  //         { month: 6, totalSold: 0 },
  //         { month: 7, totalSold: 0 },
  //         { month: 8, totalSold: 0 },
  //         { month: 9, totalSold: 0 },
  //         { month: 10, totalSold: 6 },
  //         { month: 11, totalSold: 0 },
  //         { month: 12, totalSold: 0 },
  //       ],
  //     },
  //     {
  //       productType: 'Vợt cầu lông',
  //       monthlySales: [
  //         { month: 1, totalSold: 0 },
  //         { month: 2, totalSold: 0 },
  //         { month: 3, totalSold: 0 },
  //         { month: 4, totalSold: 0 },
  //         { month: 5, totalSold: 0 },
  //         { month: 6, totalSold: 0 },
  //         { month: 7, totalSold: 0 },
  //         { month: 8, totalSold: 0 },
  //         { month: 9, totalSold: 0 },
  //         { month: 10, totalSold: 5 },
  //         { month: 11, totalSold: 0 },
  //         { month: 12, totalSold: 0 },
  //       ],
  //     },
  //   ],
  //   error: false,
  // };

  // const productTypeAllYears = {
  //   data: [
  //     {
  //       productTypes: [
  //         {
  //           productType: 'Túi vợt cầu lông',
  //           totalSold: 6,
  //         },
  //         {
  //           productType: 'Vợt cầu lông',
  //           totalSold: 5,
  //         },
  //         {
  //           productType: 'Balo cầu lông',
  //           totalSold: 1,
  //         },
  //       ],
  //       year: 2024,
  //     },
  //   ],
  //   error: false,
  // };

  // Dữ liệu cho từng tháng
  // const monthSalesData = productTypeForYear.data.map((item) => {
  //   return {
  //     productType: item.productType,
  //     monthlySales: item.monthlySales.map((sales) => sales.totalSold),
  //   };
  // });

  // Dữ liệu cho biểu đồ
  // const lineChartData = {
  //   labels: Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`), // Nhãn cho tháng
  //   datasets: monthSalesData.map((product, index) => ({
  //     label: product.productType,
  //     data: product.monthlySales, // Lấy số lượng bán hàng cho từng tháng
  //     borderColor: softColors[index % softColors.length],
  //     backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //     fill: true,
  //   })),
  // };

  // const chartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: { position: 'top' },
  //     tooltip: {
  //       callbacks: {
  //         label: function (tooltipItem) {
  //           return `${tooltipItem.raw.toLocaleString()} sản phẩm`;
  //         },
  //       },
  //     },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       ticks: {
  //         callback: (value) => value.toLocaleString(),
  //       },
  //     },
  //   },
  // };

  const doughnutData = {
    labels: productData.map((item) => item.label),
    datasets: [
      {
        data: productData.map((item) => item.value),
        backgroundColor: productData.map((item) => item.chartColor),
        hoverOffset: 6,
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw.toLocaleString()} sản phẩm`;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h1 className="mb-6 text-4xl font-bold text-gray-800">
          Thống kê sản phẩm
        </h1>

        {/* Lựa chọn thời gian */}
        {/* <div className="mb-6 flex justify-end">
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
        </div> */}

        {/* Biểu đồ đường số lượng sản phẩm bán ra */}
        {/* <Card className="mb-6">
          <CardHeader title="Biểu đồ đường số lượng loại sản phẩm bán ra" />
          <CardContent>
            <Line data={lineChartData} options={chartOptions} />
          </CardContent>
        </Card> */}

        {/* Biểu đồ donut thống kê số lượng sản phẩm */}

        <Card className="mb-6">
          {/* <CardHeader title="Thống kê số lượng loại sản phẩm bán ra" /> */}
          <div className="flex items-start justify-between">
            {/* Cột bên trái: Biểu đồ */}
            <div className="w-1/2 p-4">
              <CardContent>
                <div
                  style={{ width: '450px', height: '450px', margin: '0 auto' }}
                >
                  <Doughnut
                    data={doughnutData}
                    options={{ ...doughnutOptions, maintainAspectRatio: false }}
                  />
                </div>
              </CardContent>
            </div>

            {/* Cột bên phải: Thông tin chi tiết */}
            <div className="w-1/2 p-2">
              <div className="mt-4 flex flex-col">
                <ul className="w-full space-y-4">
                  {productData.map((product, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-between rounded-lg bg-gray-100 p-2 shadow-sm"
                      >
                        {/* Thông tin sản phẩm */}
                        <div className="flex items-center">
                          <span
                            className={`mr-3 inline-block h-4 w-4 rounded-full`}
                            style={{
                              backgroundColor:
                                doughnutData.datasets[0].backgroundColor[index], // Màu sắc cho từng sản phẩm
                            }}
                          ></span>
                          <span className="text-sm font-medium">
                            {product.label}
                          </span>
                        </div>

                        {/* Số lượng bán ra và tỷ lệ phần trăm */}
                        <div className="flex items-center">
                          <span className="text-gray-500">{`${product.value} sản phẩm`}</span>
                          <span className="ml-2 text-xs text-gray-400">{`(${product.percentage}%)`}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* <div className="my-6 flex justify-end gap-5">
          <Button
            variant="contained"
            color="default"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'}
          </Button>
        </div> */}

        {/* Bảng chi tiết sản phẩm bán chạy */}
        {!showDetails ? (
          <Card>
            <CardHeader
              sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}
              title={`Chi tiết số lượng từng sản phẩm theo ${timeFrame === 'day' ? 'ngày' : timeFrame === 'month' ? 'tháng' : 'năm'}`}
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
                    {productData.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>{product.label}</TableCell>
                        <TableCell>{product.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader
              title={`Chi tiết số lượng sản phẩm theo ${timeFrame === 'day' ? 'ngày' : timeFrame === 'month' ? 'tháng' : 'năm'}`}
            />
            <CardContent>
              <TableContainer
                component={Paper}
                style={{ maxHeight: 400, overflowY: 'auto' }}
              >
                <Table id="product-table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {timeFrame === 'day'
                          ? 'Ngày'
                          : timeFrame === 'month'
                            ? 'Tháng'
                            : 'Năm'}
                      </TableCell>
                      {productData.map((product) => (
                        <TableCell key={product.name} align="right">
                          {product.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salesData[timeFrame].data.map((sales, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {salesData[timeFrame].labels[index]}
                        </TableCell>
                        {productData.map((product) => (
                          <TableCell key={product.name} align="right">
                            {sales.find((s) => s.name === product.name)?.sold ||
                              0}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="container mx-auto px-4 py-4">
        <TopSellingProduct />
      </div>
    </>
  );
};

export default ProductStatistic;
