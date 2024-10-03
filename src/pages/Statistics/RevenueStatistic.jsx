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
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import statictisService from '../../services/statictis.service';
import { toVietnamCurrencyFormat } from '../../helpers/currencyConvertion';

const RevenueStatistic = () => {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const years = [];

  const [timeFrame, setTimeFrame] = useState('day');
  const [showDetails, setShowDetails] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [year, setYear] = useState(currentYear);
  const [revenue, setRevenue] = useState(null);
  const [revenueByTime, setRevenueByTime] = useState(null);
  const [revenueAllYears, setRevenueAllYears] = useState(null);

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

    const fetchRevenueByTime = async () => {
      try {
        const response = await statictisService.getRevenueByTime(
          startDate,
          endDate,
        );

        if (response) {
          setRevenueByTime(response);
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
    } else {
      fetchRevenueByTime();
    }
  }, [year, timeFrame, startDate, endDate]);

  useEffect(() => {
    console.log('Updated revenueByTime:', revenueByTime);
  }, [revenueByTime]);

  // Hàm để lấy nhãn năm từ revenueResults
  const getDateLabels = (data) => data?.map((item) => item.time);
  const getMonthLabels = (data) => data?.map((item) => item.time);
  const getYearLabels = (data) => data?.map((item) => item.time);

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

  // Lấy danh sách các ngày từ `orderDate`

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
        ? getMonthLabels(revenue?.data)
        : timeFrame === 'year'
          ? getYearLabels(revenueAllYears?.data) // Sử dụng hàm getYearLabels
          : timeFrame === 'day'
            ? getDateLabels(revenueByTime)
            : [],

    datasets:
      timeFrame === 'month' && revenue
        ? [
            getDataset(
              revenue.data.map((item) => item.totalRevenue),
              'Tổng Doanh Thu',
              'rgba(0, 123, 255, 0.6)',
              'rgba(0, 123, 255, 1)',
            ),
            getDataset(
              revenue.data.map((item) => item.paidRevenue),
              'Đã Thanh Toán',
              'rgba(40, 167, 69, 0.6)',
              'rgba(40, 167, 69, 1)',
            ),
            getDataset(
              revenue.data.map((item) => item.unpaidRevenue),
              'Chưa Thanh Toán',
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 99, 132, 1)',
            ),
          ]
        : timeFrame === 'year' && revenueAllYears
          ? [
              getDataset(
                revenueAllYears.data.map((item) => item.totalRevenue),
                'Tổng Doanh Thu',
                'rgba(0, 123, 255, 0.6)',
                'rgba(0, 123, 255, 1)',
              ),
              getDataset(
                revenueAllYears.data.map((item) => item.paidRevenue),
                'Đã Thanh Toán',
                'rgba(40, 167, 69, 0.6)',
                'rgba(40, 167, 69, 1)',
              ),
              getDataset(
                revenueAllYears.data.map((item) => item.unpaidRevenue),
                'Chưa Thanh Toán',
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 99, 132, 1)',
              ),
            ]
          : [
              getDataset(
                revenueByTime
                  ? revenueByTime.map((item) => item.totalRevenue)
                  : [],
                'Tổng Doanh Thu',
                'rgba(0, 123, 255, 0.6)',
                'rgba(0, 123, 255, 1)',
              ),
              getDataset(
                revenueByTime
                  ? revenueByTime.map((item) => item.paidRevenue)
                  : [],
                'Đã Thanh Toán',
                'rgba(40, 167, 69, 0.6)',
                'rgba(40, 167, 69, 1)',
              ),
              getDataset(
                revenueByTime
                  ? revenueByTime.map((item) => item.unpaidRevenue)
                  : [],
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

  const exportToExcel = () => {
    const dataToExport =
      timeFrame === 'day'
        ? revenueByTime
        : timeFrame === 'month'
          ? revenue?.data
          : revenueAllYears?.data;

    const formattedData = dataToExport?.map((item) => ({
      'Thời gian': item.time,
      'Tổng Doanh Thu': item.totalRevenue,
      'Đã Thanh Toán': item.paidRevenue,
      'Chưa Thanh Toán': item.unpaidRevenue,
    }));

    const worksheet = XLSX.utils.json_to_sheet([]);

    // Thêm tiêu đề cho file Excel
    const titleRow = ['KTB Sport'];
    let subtitleText = '';

    if (timeFrame === 'day') {
      const startDate = 'Ngày bắt đầu'; // Cần thay thế với giá trị thực tế
      const endDate = 'Ngày kết thúc'; // Cần thay thế với giá trị thực tế
      subtitleText = `Thống kê doanh thu từ ${startDate} đến ${endDate}`;
    } else if (timeFrame === 'month') {
      const year = new Date().getFullYear();
      subtitleText = `Thống kê doanh thu các tháng trong năm ${year}`;
    } else {
      // Cần thay thế với giá trị thực tế
      subtitleText = `Thống kê doanh thu tất cả các năm`;
    }

    const subtitleRow = [subtitleText];

    // Tính số cột cho việc merge
    const mergeColumnCount = Object.keys(formattedData[0] || {}).length;

    // Gộp các ô cho tiêu đề
    const mergedCells = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: mergeColumnCount - 1 } }, // Gộp hàng đầu tiên
      { s: { r: 1, c: 0 }, e: { r: 1, c: mergeColumnCount - 1 } }, // Gộp hàng thứ hai
    ];

    // Thêm tiêu đề vào worksheet
    XLSX.utils.sheet_add_aoa(worksheet, [titleRow], { origin: 'A1' });
    XLSX.utils.sheet_add_aoa(worksheet, [subtitleRow], { origin: 'A2' });

    // Gộp các ô tiêu đề
    worksheet['!merges'] = mergedCells;

    // Thay đổi kiểu chữ cho tiêu đề
    const titleCell = worksheet['A1'];
    const subtitleCell = worksheet['A2'];

    if (titleCell) {
      titleCell.s = {
        font: { bold: true, sz: 16, color: { rgb: 'FFFFFF' } },
        fill: { fgColor: { rgb: '0070C0' } },
        alignment: { horizontal: 'center', vertical: 'center' }, // Căn giữa theo chiều dọc
      };
    }

    if (subtitleCell) {
      subtitleCell.s = {
        font: { bold: true, sz: 12, color: { rgb: '0070C0' } },
        alignment: { horizontal: 'center', vertical: 'center' }, // Căn giữa theo chiều dọc
      };
    }

    // Đặt tiêu đề cho hàng
    const headers = [
      'Thời gian',
      'Tổng Doanh Thu',
      'Đã Thanh Toán',
      'Chưa Thanh Toán',
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A4' });

    // Đặt kiểu chữ cho tiêu đề hàng
    headers.forEach((header, index) => {
      const cell = worksheet[XLSX.utils.encode_cell({ r: 3, c: index })];
      if (cell) {
        cell.s = {
          font: { bold: true, color: { rgb: 'FFFFFF' } },
          fill: { fgColor: { rgb: '4F81BD' } },
          alignment: { horizontal: 'center', vertical: 'center' }, // Căn giữa theo chiều dọc
          border: {
            top: { style: 'thin', color: { rgb: '000000' } },
            bottom: { style: 'thin', color: { rgb: '000000' } },
            left: { style: 'thin', color: { rgb: '000000' } },
            right: { style: 'thin', color: { rgb: '000000' } },
          },
        };
      }
    });

    // Thêm dữ liệu vào worksheet
    formattedData.forEach((item, index) => {
      const row = [
        item['Thời gian'],
        item['Tổng Doanh Thu'].toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }),
        item['Đã Thanh Toán'].toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }),
        item['Chưa Thanh Toán'].toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }),
      ];
      XLSX.utils.sheet_add_aoa(worksheet, [row], { origin: `A${index + 5}` });
    });

    // Điều chỉnh kích thước cột
    const colWidth = [150, 150, 150, 150]; // Chiều rộng cho các cột
    colWidth.forEach((width, index) => {
      worksheet['!cols'] = worksheet['!cols'] || [];
      worksheet['!cols'][index] = { wpx: width };
    });

    // Định dạng dữ liệu trong worksheet
    for (let i = 5; i < 5 + formattedData.length; i++) {
      for (let j = 0; j < headers.length; j++) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: i, c: j })];
        if (cell) {
          cell.s = {
            border: {
              top: { style: 'thin', color: { rgb: '000000' } },
              bottom: { style: 'thin', color: { rgb: '000000' } },
              left: { style: 'thin', color: { rgb: '000000' } },
              right: { style: 'thin', color: { rgb: '000000' } },
            },
            alignment: { horizontal: 'center' }, // Căn giữa cho dữ liệu
          };
        }
      }
    }

    // Tạo tên file dựa trên timeFrame

    const fileName =
      timeFrame === 'day'
        ? `doanh_thu_tu_${startDate}_den_${endDate}.xlsx`
        : timeFrame === 'month'
          ? `doanh_thu_nam_${year}.xlsx`
          : 'doanh_thu_cac_nam.xlsx';
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Doanh Thu');
    XLSX.writeFile(workbook, fileName);
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
            <div className="flex space-x-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="rounded-lg bg-primary p-2 font-bold text-white"
              >
                {showDetails ? 'Ẩn chi tiết' : 'Hiển thị chi tiết'}
              </button>
              <button
                onClick={exportToExcel} // Gọi hàm xuất Excel
                className="mr-2 rounded-lg bg-green-500 p-2 font-bold text-white"
              >
                Xuất Excel
              </button>
            </div>
          }
        />
        {showDetails && (
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Thời gian</TableCell>
                    <TableCell align="right">Tổng Doanh Thu</TableCell>
                    <TableCell align="right">Đã Thanh Toán</TableCell>
                    <TableCell align="right">Chưa Thanh Toán</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(timeFrame === 'day' && revenueByTime) ||
                  (timeFrame === 'month' && revenue?.data) ||
                  (timeFrame === 'year' && revenueAllYears?.data) ? (
                    (
                      (timeFrame === 'day' && revenueByTime) ||
                      (timeFrame === 'month' && revenue.data) ||
                      (timeFrame === 'year' && revenueAllYears.data)
                    ).map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.time}</TableCell>
                        <TableCell align="right">
                          {toVietnamCurrencyFormat(item.totalRevenue)}
                        </TableCell>
                        <TableCell align="right">
                          {toVietnamCurrencyFormat(item.paidRevenue)}
                        </TableCell>
                        <TableCell align="right">
                          {toVietnamCurrencyFormat(item.unpaidRevenue)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        Không có dữ liệu
                      </TableCell>
                    </TableRow>
                  )}
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
