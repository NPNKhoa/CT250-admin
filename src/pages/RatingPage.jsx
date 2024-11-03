import { useEffect, useMemo, useState } from 'react';
import { Rating, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import commentService from '../services/comment.service';
import ActionHeader from '../components/common/ActionHeader';
import TableComponent from '../components/common/TableComponent';

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

  const rows = useMemo(
    () =>
      ratings.map((rating) => ({
        ...rating,
        action: (
          <div>
            <IconButton color="primary" onClick={() => handleEdit(rating)}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={() => handleDelete(rating._id)}>
              <Delete />
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
        flex: 0.5,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'productImage',
        headerName: 'Ảnh sản phẩm',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
          <img
            src={params.row.productImage}
            alt="product"
            className="h-10 w-10 rounded-full"
          />
        ),
      },
      {
        field: 'productName',
        headerName: 'Tên sản phẩm',
        flex: 1,
        headerAlign: 'center',
        align: 'left',
      },
      {
        field: 'fullname',
        headerName: 'Người đánh giá',
        flex: 1,
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
        headerName: 'Hành động',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
          <div>
            <IconButton color="primary" onClick={() => handleEdit(params.row)}>
              <Edit />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDelete(params.row._id)}
            >
              <Delete />
            </IconButton>
          </div>
        ),
      },
    ],
    [],
  );

  const paginationModel = { page: 0, pageSize: 5 };

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
    </div>
  );
};

export default RatingPage;
