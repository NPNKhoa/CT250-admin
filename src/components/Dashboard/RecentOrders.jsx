import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import statictisService from '../../services/statictis.service';
import TableComponent from '../../components/common/TableComponent';
import ActionHeader from '../../components/common/ActionHeader';
import { Eye } from 'lucide-react';
import { toVietnamCurrencyFormat } from '../../helpers/currencyConvertion';

const ServicePage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleViewDetails = async (order) => {
    console.log('Order Data: ', order); // Kiểm tra dữ liệu đầy đủ của order
    console.log('Order ID: ', order.orderNumber);
    console.log('Order Date: ', order.orderDate);
    console.log('Total Price: ', order.price);
    console.log('Shipping Address: ', order.shippingAddress);
    console.log('Order Status: ', order.status);
    console.log('Order Details: ', order.orderDetail);
    setSelectedOrder(order); // Sau khi kiểm tra, lưu lại order được chọn
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  // Fetch data từ API và lưu vào state `orders`
  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const response = await statictisService.getAllOrders();
        const formattedOrders = response.data.map((order) => ({
          orderNumber: `#${order._id}`,
          orderDate: new Date(order.orderDate).toLocaleDateString('vi-VN'),
          price: order.totalPrice,
          status: order.orderStatus.orderStatus,
          shippingAddress: order.shippingAddress,
          shippingMethod: order.shippingMethod,
          shippingFee: order.shippingFee,
          paymentMethod: order.paymentMethod,
          orderDetail: order.orderDetail,
        }));
        setOrders(formattedOrders);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  // Sử dụng `orders` để làm dữ liệu cho `rows`
  const rows = useMemo(
    () =>
      orders.map((order, index) => ({
        id: index + 1,
        ...order, // Truyền toàn bộ dữ liệu của order vào row
        action: (
          <button
            onClick={() => handleViewDetails(order)} // Truyền toàn bộ order vào handleViewDetails
            className="btn btn-primary"
          >
            Xem chi tiết
          </button>
        ),
      })),
    [orders],
  );

  const columns = useMemo(
    () => [
      {
        field: 'orderNumber',
        headerName: 'Mã đơn hàng',
        flex: 1,
        headerAlign: 'center',
        align: 'left',
      },
      {
        field: 'orderDate',
        headerName: 'Ngày đặt',
        type: 'Date',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'price',
        headerName: 'Tổng tiền',
        flex: 0.6,
        headerAlign: 'center',
        align: 'right',
        renderCell: (params) => (
          <p>{Number(params.value).toLocaleString('vi-VN')} đ</p>
        ),
      },
      {
        field: 'status',
        headerName: 'Trạng thái',
        flex: 1.5,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'action',
        headerName: 'Thao tác',
        flex: 1.5,
        headerAlign: 'center',
        align: 'center',
        renderCell: (order) => (
          <button onClick={() => handleViewDetails(order.row)}>
            <Eye className="text-primary" />
          </button>
        ),
      },
    ],
    [],
  );

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <ActionHeader title="Đơn hàng gần nhất" />
      <TableComponent
        loading={loading}
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        handleSelected={() => {}}
      />

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="max-h-[90vh] w-1/2 overflow-y-auto rounded-lg bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-gray-800">
                Chi tiết đơn hàng
              </h3>
              <button
                onClick={handleCloseModal}
                className="rounded bg-orange-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-orange-600"
              >
                Đóng
              </button>
            </div>

            <div className="mb-4">
              <p>
                <strong>Mã đơn hàng:</strong> {selectedOrder.orderNumber}
              </p>
              <p>
                <strong>Ngày đặt:</strong> {selectedOrder.orderDate}
              </p>
              <p>
                <strong>Tổng tiền:</strong>{' '}
                {toVietnamCurrencyFormat(selectedOrder.price)}
              </p>
              <p>
                <strong>Địa chỉ giao hàng:</strong>{' '}
                {selectedOrder?.shippingAddress.detail},{' '}
                {selectedOrder?.shippingAddress.commune},{' '}
                {selectedOrder?.shippingAddress.district},{' '}
                {selectedOrder?.shippingAddress.province}
              </p>
              <p>
                <strong>Trạng thái:</strong> {selectedOrder.status}
              </p>
            </div>

            <div className="mb-4 border-t border-gray-200 pt-4">
              <p>
                <strong>Phí vận chuyển:</strong>{' '}
                {toVietnamCurrencyFormat(selectedOrder.shippingFee)}
              </p>
              <p>
                <strong>Phương thức vận chuyển:</strong>{' '}
                {selectedOrder.shippingMethod.shippingMethod}
              </p>
              <p>
                <strong>Phương thức thanh toán:</strong>{' '}
                {selectedOrder.paymentMethod.paymentMethodName}
              </p>
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              Sản phẩm
            </h2>
            <div className="no-scrollbar mt-4 max-h-64 overflow-y-auto">
              {selectedOrder.orderDetail?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center space-x-4 py-2"
                >
                  <img
                    src={item.product.productImagePath?.[0] || ''}
                    alt={item.product.productName}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="text-gray-900">
                      {item.product.productName}
                    </h3>
                    <p className="text-gray-500">Số lượng: {item.quantity}</p>
                    <p>
                      {toVietnamCurrencyFormat(item.itemPrice * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePage;
