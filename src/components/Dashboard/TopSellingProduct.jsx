import { useEffect, useState } from 'react';
import { toVietnamCurrencyFormat } from '../../helpers/currencyConvertion';
import DataTable from '../common/DataTable';
import statictisService from '../../services/statictis.service';

const columns = [
  {
    id: `productId`,
    label: 'Mã sản phẩm',
    type: 'text',
  },
  {
    id: `productName`,
    label: 'Tên sản phẩm',
    type: 'text',
  },
  {
    id: `price`,
    label: 'Giá',
    type: 'text',
  },
  {
    id: `totalSold`,
    label: 'Số lượng',
    type: 'text',
  },
];

const TopSellingProduct = () => {
  const [totalSold, setTotalSold] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalSoldPerMonth = async () => {
      try {
        const response = await statictisService.getTotalSoldPerMonth();
        const formattedSold = response.data.topProducts.map((product) => ({
          productId: `#${product.productId}`,
          productName: product.productName,
          price: toVietnamCurrencyFormat(
            product.price * ((100 - product.discountPercent) / 100),
          ),
          totalSold: product.totalSold,
        }));
        setTotalSold(formattedSold);
      } catch (error) {
        console.error('Lỗi khi lấy tổng số tài khoản của tháng:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalSoldPerMonth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto">
      <DataTable
        title={'sản phẩm bán chạy nhất'}
        columns={columns}
        data={totalSold}
        sortable={true}
        filterable={true}
        actions={{ delete: false, view: false }}
        pagination={{
          rowsPerPageOptions: [5, 10],
          defaultRowsPerPage: 5,
        }}
        onView={() => {}}
      />
    </div>
  );
};

export default TopSellingProduct;
