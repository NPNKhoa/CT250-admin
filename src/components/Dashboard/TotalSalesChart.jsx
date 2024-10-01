import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import statictisService from '../../services/statictis.service';

ChartJS.register(ArcElement, Tooltip, Legend);

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

const TotalSalesChart = () => {
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
          chartColor: softColors[index % softColors.length], // Lấy màu từ softColors theo index
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
        labels: {
          font: {
            size: 10,
          },
          color: '#333',
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} sản phẩm`;
          },
        },
      },
    },
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <div className="grid gap-5">
        <div className="">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Tổng doanh số sản phẩm
          </h2>
          <div className="relative flex h-[260px] w-full justify-center">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="absolute top-36 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-600">
                  Tổng sản phẩm
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {totalProducts}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center justify-center">
            <ul className="w-full space-y-1">
              {productData.map((product, index) => (
                <li
                  key={index}
                  className="mx-auto flex items-center text-gray-700"
                >
                  <span
                    className="mr-3 inline-block h-4 w-4 rounded-full"
                    style={{ backgroundColor: product.chartColor }}
                  ></span>
                  <span className="text-sm font-medium">{`${product.label}`}</span>
                  <span className="ml-auto text-gray-500">{`${product.value} sản phẩm`}</span>
                  <span className="ml-2 text-xs text-gray-400">{`(${product.percentage})`}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalSalesChart;
