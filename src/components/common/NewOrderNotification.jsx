import { useState, useEffect } from 'react';
import {
  IconButton,
  Badge,
  Popover,
  Typography,
  Box,
  Divider,
  ListItemText,
  List,
  ListItem,
  Button,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import orderService from '../../services/order.service';
import { useNavigate } from 'react-router-dom';

const NewOrderNotification = () => {
  const [newOrders, setNewOrders] = useState([]); // Lưu danh sách đơn hàng mới
  const [anchorEl, setAnchorEl] = useState(null);
  const [lastCheckedOrderIds, setLastCheckedOrderIds] = useState(new Set()); // Sử dụng Set để theo dõi các ID đơn hàng đã kiểm tra

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewOrders = async () => {
      try {
        const latestOrdersData = await orderService.getLastOrders(); // Giả sử đây là phương thức trả về danh sách đơn hàng mới

        if (latestOrdersData) {
          const newOrdersList = latestOrdersData.filter(
            (order) => !lastCheckedOrderIds.has(order._id),
          );

          if (newOrdersList.length > 0) {
            setNewOrders(newOrdersList);
            setLastCheckedOrderIds(
              (prevIds) =>
                new Set([
                  ...prevIds,
                  ...newOrdersList.map((order) => order._id),
                ]),
            );
          }
        }
      } catch (error) {
        console.error('Lỗi khi lấy đơn hàng mới:', error);
      }
    };

    const interval = setInterval(fetchNewOrders, 30000);
    fetchNewOrders();

    return () => clearInterval(interval);
  }, [lastCheckedOrderIds]);

  const handlePopoverToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        color="inherit"
        onClick={(event) => {
          handlePopoverToggle(event);
        }}
      >
        <Badge badgeContent={newOrders.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 1, width: 500 }}>
          <List sx={{ maxHeight: 400, overflowY: 'auto' }}>
            {newOrders.slice(0, 3).map(
              // Hiển thị chỉ 3 đơn hàng
              (order) => (
                <Box key={order._id}>
                  <ListItem>
                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                    <ListItemText primary={order.user.fullname} />
                    <CalendarTodayIcon
                      color="secondary"
                      sx={{ mr: 1, ml: 1 }}
                    />
                    <ListItemText
                      primary={new Date(order.orderDate).toLocaleDateString()}
                    />
                    <AttachMoneyIcon color="success" sx={{ mr: 1, ml: 1 }} />
                    <ListItemText
                      primary={`${order.totalPrice.toLocaleString()} VND`}
                    />
                  </ListItem>
                  <ListItem>
                    <LocationOnIcon color="error" sx={{ mr: 1 }} />
                    <ListItemText
                      primary={`${order.shippingAddress.fullname}, ${order.shippingAddress.phone}`}
                    />
                    <ListItemText
                      primary={`${order.shippingAddress.province}, ${order.shippingAddress.district}`}
                    />
                  </ListItem>

                  <ListItem>
                    <PaymentIcon color="warning" sx={{ mr: 1 }} />
                    <ListItemText
                      primary={order.paymentMethod.paymentMethodName}
                    />
                  </ListItem>
                  <Divider sx={{ width: '100%', my: 1 }} />
                </Box>
              ),
            )}
          </List>
          {newOrders.length && ( // Hiển thị nút "Xem thêm" nếu có nhiều hơn 3 đơn hàng
            <Button
              sx={{ mt: 1 }}
              onClick={() => {
                setAnchorEl(null); // Ẩn popover
                navigate('/order'); // Chuyển hướng đến trang đơn hàng
              }}
            >
              Xem chi tiết
            </Button>
          )}
          {newOrders.length === 0 && (
            <Typography sx={{ p: 2 }}>Không có đơn hàng mới</Typography>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default NewOrderNotification;
