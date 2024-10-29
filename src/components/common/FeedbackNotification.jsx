import { useState, useEffect } from 'react';
import {
  IconButton,
  Badge,
  Popover,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import feedbackService from '../../services/feedback.service'; // Đường dẫn tới service lấy dữ liệu feedback
import { useNavigate } from 'react-router-dom';

const FeedbackNotification = () => {
  const [feedbackMessages, setFeedbackMessages] = useState([]); // Lưu danh sách tin nhắn feedback
  const [anchorEl, setAnchorEl] = useState(null);
  const [lastCheckedFeedbackIds, setLastCheckedFeedbackIds] = useState(
    new Set(),
  ); // Sử dụng Set để theo dõi các ID tin nhắn đã kiểm tra

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbackMessages = async () => {
      try {
        const latestFeedbackData = await feedbackService.getLatestFeedback(); // Lấy dữ liệu feedback mới nhất từ service

        // console.log(latestFeedbackData);

        if (latestFeedbackData) {
          const newFeedbackList = latestFeedbackData.filter(
            (feedback) => !lastCheckedFeedbackIds.has(feedback._id),
          );

          if (newFeedbackList.length > 0) {
            setFeedbackMessages((prevMessages) => [
              ...newFeedbackList,
              ...prevMessages,
            ]);
            setLastCheckedFeedbackIds(
              (prevIds) =>
                new Set([
                  ...prevIds,
                  ...newFeedbackList.map((feedback) => feedback._id),
                ]),
            );
          }
        }
      } catch (error) {
        console.error('Lỗi khi lấy tin nhắn feedback:', error);
      }
    };

    const interval = setInterval(fetchFeedbackMessages, 30000);
    fetchFeedbackMessages();

    return () => clearInterval(interval);
  }, [lastCheckedFeedbackIds]);

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
        <Badge badgeContent={feedbackMessages.length} color="error">
          <EmailIcon />
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
        <Box sx={{ p: 1, width: 300 }}>
          <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
            {feedbackMessages.map((feedback) => (
              <Box key={feedback._id}>
                <ListItem>
                  <ListItemText
                    primary={`${feedback.senderName} đã gửi đến bạn một phản hồi`} // Hiển thị tên người gửi kèm thông báo
                    // secondary={feedback.question}
                  />
                </ListItem>
                <Divider sx={{ width: '100%', my: 1 }} />
              </Box>
            ))}
          </List>
          {feedbackMessages.length > 0 && ( // Hiển thị nút "Xem thêm" nếu có tin nhắn
            <Button
              sx={{ mt: 1 }}
              onClick={() => {
                setAnchorEl(null); // Ẩn popover
                navigate('/feedback'); // Chuyển hướng đến trang tin nhắn feedback
              }}
            >
              Xem chi tiết
            </Button>
          )}
          {feedbackMessages.length === 0 && (
            <Typography sx={{ p: 2 }}>Không có tin nhắn mới</Typography>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default FeedbackNotification;
