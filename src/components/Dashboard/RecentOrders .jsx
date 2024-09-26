import { toVietnamCurrencyFormat } from '../../helpers/currencyConvertion';
import DataTable from '../common/DataTable';

const columns = [
  {
    id: `orderNumber`,
    label: 'Mã đơn hàng',
    type: 'text',
  },
  {
    id: `productName`,
    label: 'Tên sản phẩm',
    type: 'text',
  },
  {
    id: `orderDate`,
    label: 'Ngày đặt hàng',
    type: 'text',
  },
  {
    id: `price`,
    label: 'Tổng giá trị đơn hàng',
    type: 'text',
  },
  {
    id: `status`,
    label: 'Trạng thái',
    type: 'text',
  },
];

const RecentOrders = () => {
  const orders = [
    {
      // id: 1,
      orderNumber: 'ORD001',
      productName: 'Vợt cầu lông',
      orderDate: '2024-09-01',
      price: toVietnamCurrencyFormat(200000),
      status: 'Đã giao',
    },
    {
      // id: 2,
      orderNumber: 'ORD002',
      productName: 'Balo',
      orderDate: '2024-09-03',
      price: toVietnamCurrencyFormat(200000),
      status: 'Đang vận chuyển',
    },
    {
      // id: 3,
      orderNumber: 'ORD003',
      productName: 'Túi xách',
      orderDate: '2024-09-05',
      price: toVietnamCurrencyFormat(200000),
      status: 'Đã hủy',
    },
    {
      // id: 4,
      orderNumber: 'ORD004',
      productName: 'Vợt tennis',
      orderDate: '2024-09-07',
      price: toVietnamCurrencyFormat(200000),
      status: 'Đã giao',
    },
    {
      // id: 5,
      orderNumber: 'ORD004',
      productName: 'Vợt tennis',
      orderDate: '2024-09-07',
      price: toVietnamCurrencyFormat(200000),
      status: 'Đã giao',
    },
    {
      // id: 1,
      orderNumber: 'ORD001',
      productName: 'Vợt cầu lông',
      orderDate: '2024-09-01',
      price: toVietnamCurrencyFormat(200000),
      status: 'Đã giao',
    },
    {
      // id: 2,
      orderNumber: 'ORD002',
      productName: 'Balo',
      orderDate: '2024-09-03',
      price: toVietnamCurrencyFormat(200000),
      status: 'Đang vận chuyển',
    },
    {
      // id: 3,
      orderNumber: 'ORD003',
      productName: 'Túi xách',
      orderDate: '2024-09-05',
      price: toVietnamCurrencyFormat(500000),
      status: 'Đã hủy',
    },
    {
      // id: 4,
      orderNumber: 'ORD004',
      productName: 'Vợt tennis',
      orderDate: '2024-09-07',
      price: toVietnamCurrencyFormat(200000),
      status: 'Đã giao',
    },
    {
      // id: 5,
      orderNumber: 'ORD004',
      productName: 'Vợt tennis',
      orderDate: '2024-09-07',
      price: toVietnamCurrencyFormat(200000),
      status: 'Đã giao',
    },
  ];

  return (
    <div className="container mx-auto mt-5">
      <DataTable
        title={'Đơn hàng gần nhất'}
        columns={columns}
        data={orders}
        sortable={true}
        filterable={true}
        actions={{ delete: true, view: true }}
        pagination={{
          rowsPerPageOptions: [2, 4, 6, 8, 10],
          defaultRowsPerPage: 4,
        }}
        showIndex={true}
        onDelete={() => {}}
        onView={() => {}}
      />
    </div>
  );
};

export default RecentOrders;
