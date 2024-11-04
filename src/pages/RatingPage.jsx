import { useEffect, useMemo, useState } from 'react';
import { Rating, IconButton, Button, TextField, Modal } from '@mui/material';
import { RemoveRedEye } from '@mui/icons-material';
import commentService from '../services/comment.service';
import ActionHeader from '../components/common/ActionHeader';
import TableComponent from '../components/common/TableComponent';
import { Send } from 'lucide-react';

const RatingPage = () => {
  const [ratings, setRatings] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách đánh giá từ API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await commentService.getAllComments();
        const formattedComments = data.data.map((comment, index) => ({
          _id: comment.id,
          id: index + 1,
          productImage: comment.productImage[0],
          productName: comment.productName,
          fullname: comment.reviewer,
          star: comment.rating,
          comment: comment.comment,
          createdAt: new Date(comment.createdAt),
          replies: comment.replies,
        }));
        setRatings(formattedComments);
      } catch (err) {
        setError('Failed to fetch comments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  console.log(ratings);

  // Xử lý mở Modal chỉnh sửa với dữ liệu của đánh giá được chọn
  const handleEdit = (rating) => {
    setEditData(rating);
    setModalOpen(true);
  };

  // Xử lý xóa đánh giá
  const handleDelete = async (id) => {
    try {
      await commentService.deleteComment(id);
      setRatings((prevRatings) =>
        prevRatings.filter((rating) => rating._id !== id),
      );
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  // Đóng modal và xóa dữ liệu chỉnh sửa
  const closeModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  const rows = useMemo(
    () =>
      ratings.map((rating) => ({
        ...rating,
        action: (
          <div>
            <IconButton color="primary" onClick={() => handleEdit(rating)}>
              <RemoveRedEye />
            </IconButton>
          </div>
        ),
      })),
    [ratings],
  );

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        flex: 0.3,
        headerAlign: 'center',
        align: 'center',
      },

      {
        field: 'productName',
        headerName: 'Tên sản phẩm',
        flex: 2,
        headerAlign: 'center',
        align: 'left',
      },
      {
        field: 'fullname',
        headerName: 'Người đánh giá',
        flex: 1.8,
        headerAlign: 'center',
        align: 'left',
      },
      {
        field: 'star',
        headerName: 'Đánh giá',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
          <Rating name="read-only" value={params.row.star} readOnly />
        ),
      },
      {
        field: 'comment',
        headerName: 'Nhận xét',
        flex: 2,
        headerAlign: 'center',
        align: 'left',
      },
      {
        field: 'createdAt',
        headerName: 'Ngày tạo',
        flex: 1,
        type: 'date',
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
          return new Date(params.value).toLocaleDateString('vi-VN');
        },
      },
      {
        field: 'action',
        headerName: 'Thao tác',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
          <div>
            <IconButton color="primary" onClick={() => handleEdit(params.row)}>
              <RemoveRedEye />
            </IconButton>
          </div>
        ),
      },
    ],
    [],
  );

  const paginationModel = { page: 0, pageSize: 5 };

  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    try {
      const replyResponse = await commentService.addReply(
        editData._id,
        replyText,
        accessToken,
      );

      setRatings((prevRatings) =>
        prevRatings.map((rating) =>
          rating._id === editData._id
            ? { ...rating, replies: [...rating.replies, replyResponse] } // Cập nhật lại danh sách replies
            : rating,
        ),
      );

      setReplyText(''); // Đặt lại nội dung trả lời
      setIsReplying(false); // Ẩn khung trả lời
    } catch (err) {
      console.error('Failed to add reply:', err);
    }
  };

  return (
    <div>
      <ActionHeader title="Quản lý đánh giá" />
      <TableComponent
        checkbox={false}
        loading={loading}
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        handleSelected={() => {}}
      />

      {/* Modal chi tiết đánh giá */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <div className="mx-auto my-10 max-w-xl rounded-md bg-white p-6 shadow-lg">
          <div className="flex justify-between">
            <h2 className="mb-6 text-center text-2xl font-semibold">
              Chi tiết đánh giá
            </h2>
            <Button
              variant="outlined"
              className="h-8"
              color="primary"
              onClick={closeModal}
            >
              X
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {editData?.productImage && (
              <img
                src={editData.productImage}
                alt="Product"
                className="h-[30vh] w-2/5 rounded-md shadow-md"
              />
            )}
            <div className="flex flex-col space-y-2">
              <div className="flex gap-3 rounded-md border border-gray-300 p-2 font-medium">
                Tên sản phẩm: {editData?.productName || 'Chưa có thông tin'}
              </div>

              <div className="flex gap-3 rounded-md border border-gray-300 p-2 font-medium">
                Người đánh giá: {editData?.fullname || 'Chưa có thông tin'}
              </div>

              <div className="flex gap-3 rounded-md border border-gray-300 p-2 font-medium">
                Đánh giá:{' '}
                <Rating name="rating" value={editData?.star || 0} readOnly />
              </div>

              <div className="flex gap-3 rounded-md border border-gray-300 p-2 font-medium">
                Ngày tạo:{' '}
                {editData?.createdAt
                  ? new Date(editData.createdAt).toLocaleDateString('vi-VN')
                  : 'Chưa có thông tin'}
              </div>
            </div>
          </div>

          <div>
            {' '}
            <div className="my-3 min-h-[80px] rounded-md border border-gray-300 p-2 font-medium">
              Nhận xét:{''} {editData?.comment || 'Chưa có nhận xét'}
            </div>
            {editData?.replies.length > 0 && (
              <div className="my-3 min-h-[80px] rounded-md border border-gray-300 p-2 font-medium">
                <h3 className="text-lg font-semibold">Đã trả lời:</h3>
                {editData.replies.map((reply, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex-col gap-3 rounded-md border border-gray-300 p-2 font-medium">
                      <div className="flex justify-between">
                        <div className="">
                          Người trả lời: {reply?.user || 'Chưa có thông tin'}
                        </div>
                        <div className="">
                          Ngày tạo:{' '}
                          {new Date(reply.createdAt).toLocaleDateString(
                            'vi-VN',
                          ) || 'Chưa có thông tin'}{' '}
                        </div>
                        <br />
                      </div>
                      Nội dung: {reply.content || 'Chưa có thông tin'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {isReplying && (
            <>
              <div className="flex items-center gap-2">
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  placeholder="Nhập câu trả lời của bạn"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1" // Để nút có thể linh hoạt với chiều rộng
                  InputProps={{
                    style: {
                      borderRadius: '8px', // Bo góc cho TextField
                      paddingRight: '50px', // Để không bị chèn nút
                    },
                  }}
                />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleReplySubmit}
                  style={{
                    borderRadius: '8px', // Bo góc cho nút
                    padding: '8px 16px', // Thêm padding cho nút
                    minWidth: '50px',
                  }}
                  startIcon={<Send />}
                >
                  Gửi
                </Button>
              </div>
            </>
          )}

          <div className="mt-3 flex justify-end gap-4">
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setIsReplying(!isReplying)}
            >
              {isReplying ? 'Hủy' : 'Trả lời'}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleDelete(editData._id)}
            >
              Xóa
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RatingPage;
