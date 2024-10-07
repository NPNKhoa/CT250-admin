import { useEffect, useState } from 'react';
import { toVietnamCurrencyFormat } from '../../helpers/currencyConvertion';
import DataTable from '../common/DataTable';
import statictisService from '../../services/statictis.service';

const columns = [
  {
    id: `orderNumber`,
    label: 'Mã đơn hàng',
    type: 'text',
  },
  {
    id: `orderDate`,
    label: 'Ngày đặt',
    type: 'text',
  },
  {
    id: `price`,
    label: 'Tổng tiền',
    type: 'text',
  },
  {
    id: `status`,
    label: 'Trạng thái',
    type: 'text',
  },
];

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = async (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await statictisService.getAllOrders();

        const formattedOrders = response.data.map((order) => ({
          orderNumber: `#${order._id}`,
          orderDate: new Date(order.orderDate).toLocaleDateString('vi-VN'),
          price: toVietnamCurrencyFormat(order.totalPrice),
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <DataTable
        title={'Đơn hàng gần nhất'}
        columns={columns}
        data={orders}
        sortable={true}
        filterable={true}
        actions={{ delete: false, view: true }}
        pagination={{
          rowsPerPageOptions: [5, 10],
          defaultRowsPerPage: 5,
        }}
        onView={(order) => handleViewDetails(order)}
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
                <strong>Tổng tiền:</strong> {selectedOrder.price}
              </p>
              <p>
                <strong>Địa chỉ giao hàng:</strong>{' '}
                {selectedOrder.shippingAddress.detail},{' '}
                {selectedOrder.shippingAddress.commune},{' '}
                {selectedOrder.shippingAddress.district},{' '}
                {selectedOrder.shippingAddress.province}
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

export default RecentOrders;
