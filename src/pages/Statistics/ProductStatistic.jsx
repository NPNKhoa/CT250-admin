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
const generateProductSalesData = (numPeriods, products, baseFactor) => {
  return Array.from({ length: numPeriods }, () => {
    return products.map((product, index) => ({
      name: product.name,
      sold: Math.floor(
        baseFactor * (Math.random() * 0.5 + 0.5) * (1 + index * 0.3),
      ), // Thay đổi để tạo sự lệch
    }));
  });
};
// Dữ liệu thống kê sản phẩm giả với mức cơ sở hợp lý
const salesData = {
  day: {
    labels: Array.from({ length: 30 }, (_, i) => `Ngày ${i + 1}`),
    // Base factor cho mỗi ngày sẽ nhỏ hơn tháng
    data: generateProductSalesData(30, productData, 3),
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
    // Base factor cho mỗi tháng lớn hơn ngày
    data: generateProductSalesData(12, productData, 100),
  },
  year: {
    labels: ['2023', '2024'],
    // Base factor cho mỗi năm sẽ lớn hơn tháng
    data: generateProductSalesData(2, productData, 1200),
  },
};
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

    fetchProductData();
  }, []);
  // Xuất dữ liệu sang PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Thống kê sản phẩm', 20, 10);
    doc.autoTable({ html: '#product-table' });
    doc.save('thong_ke_san_pham.pdf');
  };

  // Xuất dữ liệu sang Excel
  // Xuất dữ liệu sang Excel
  const exportExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Dữ liệu cho worksheet
    const worksheetData = [
      [
        'Thời gian', // Cột thời gian
        'Tên sản phẩm', // Cột tên sản phẩm
        'Số lượng bán', // Cột số lượng bán
      ],
    ];

    // Lặp qua dữ liệu để tổ chức theo cách mong muốn
    salesData[timeFrame].data.forEach((salesArray, dateIndex) => {
      let firstProduct = true; // Biến để theo dõi sản phẩm đầu tiên của ngày

      salesArray.forEach((item) => {
        if (firstProduct) {
          worksheetData.push([
            timeFrame === 'day'
              ? `Ngày ${dateIndex + 1}`
              : timeFrame === 'month'
                ? `Tháng ${dateIndex + 1}`
                : `Năm ${2023 + dateIndex}`, // Gán thời gian tương ứng
            item.name || '', // Tên sản phẩm
            item.sold || 0, // Số lượng bán
          ]);
          firstProduct = false; // Đánh dấu rằng sản phẩm đầu tiên đã được thêm
        } else {
          worksheetData.push([
            '', // Ô trống cho thời gian
            item.name || '', // Tên sản phẩm
            item.sold || 0, // Số lượng bán
          ]);
        }
      });
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Gộp các ô cho thời gian
    let rowIndex = 1; // Bắt đầu từ hàng thứ hai (hàng tiêu đề)
    salesData[timeFrame].data.forEach((salesArray, dateIndex) => {
      if (salesArray.length > 0) {
        // Gộp ô cho ngày
        const cellRange = XLSX.utils.encode_range({
          s: { r: rowIndex, c: 0 }, // Cột thời gian
          e: { r: rowIndex + salesArray.length - 1, c: 0 }, // Cột thời gian
        });
        worksheet[cellRange] = {
          v:
            timeFrame === 'day'
              ? `Ngày ${dateIndex + 1}`
              : timeFrame === 'month'
                ? `Tháng ${dateIndex + 1}`
                : `Năm ${2023 + dateIndex}`,
          t: 's', // Kiểu dữ liệu là string
        };
        worksheet['!merges'] = worksheet['!merges'] || [];
        worksheet['!merges'].push({
          s: { r: rowIndex, c: 0 },
          e: { r: rowIndex + salesArray.length - 1, c: 0 },
        });
        rowIndex += salesArray.length; // Cập nhật chỉ số hàng
      }
    });

    // Tùy chỉnh chiều rộng cột
    worksheet['!cols'] = [
      { wch: 20 }, // Chiều rộng cột Thời gian
      { wch: 30 }, // Chiều rộng cột Tên sản phẩm
      { wch: 15 }, // Chiều rộng cột Số lượng bán
    ];

    // Tùy chỉnh kiểu chữ cho tiêu đề
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cell = worksheet[XLSX.utils.encode_cell({ r: 0, c: col })];
      if (cell) {
        cell.s = {
          fill: { fgColor: { rgb: 'FFFF00' } }, // Màu nền vàng
          font: { bold: true, color: { rgb: '000000' }, sz: 12 }, // Chữ đen, đậm và kích thước 12
          alignment: { horizontal: 'center', vertical: 'center' }, // Căn giữa
        };
      }
    }

    // Căn giữa cho ô thời gian và các ô dữ liệu khác
    for (let row = 1; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })];
        if (cell) {
          cell.s = {
            alignment: { horizontal: 'center', vertical: 'center' }, // Căn giữa cho ô dữ liệu
          };
        }
      }
    }

    // Đặt căn giữa cho ô thời gian
    for (let row = 1; row <= range.e.r; row++) {
      const timeCell = worksheet[XLSX.utils.encode_cell({ r: row, c: 0 })];
      if (timeCell) {
        timeCell.s = {
          alignment: { horizontal: 'center', vertical: 'center' }, // Căn giữa cho ô thời gian
        };
      }
    }

    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Thống kê sản phẩm');

    // Xuất file Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(data, `product_${timeFrame}.xlsx`);
  };

  // Chuẩn bị dữ liệu cho biểu đồ Line
  // const lineChartData = {
  //   labels: salesData[timeFrame]?.labels || [], // Bổ sung xử lý nếu không có dữ liệu
  //   datasets: productData.map((product, index) => ({
  //     label: product.name,
  //     data:
  //       salesData[timeFrame]?.data.map(
  //         (sales) => sales.find((s) => s.name === product.name)?.sold || 0,
  //       ) || [], // Bổ sung xử lý nếu không có dữ liệu
  //     borderColor: `rgba(${75 + index * 20}, ${192 - index * 30}, 192, 1)`,
  //     backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //     fill: true,
  //   })),
  // };

  // Chuẩn bị dữ liệu cho biểu đồ Doughnut
  const totalSales = productData.map((product) => ({
    name: product.name,
    sold: salesData[timeFrame].data.reduce(
      (total, sales) =>
        total + sales.find((s) => s.name === product.name)?.sold || 0,
      0,
    ),
  }));

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
  const chartOptions = {
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
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //     ticks: {
    //       callback: (value) => value.toLocaleString(),
    //     },
    //   },
    // },
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
                    options={{ ...chartOptions, maintainAspectRatio: false }}
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
