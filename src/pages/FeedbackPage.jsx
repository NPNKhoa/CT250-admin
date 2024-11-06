import { Fragment, useEffect, useMemo, useState } from 'react';
import { IconButton, Button, Modal } from '@mui/material';
import { RemoveRedEye } from '@mui/icons-material';
import ActionHeader from '../components/common/ActionHeader';
import TableComponent from '../components/common/TableComponent';
import AlertDialog from '../components/common/AlertDialog';
import feedbackService from '../services/feedback.service';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [alertConfig, setAlertConfig] = useState({
    open: false,
    title: '',
    action: null,
  });

  // Lấy danh sách đánh giá từ API
  const fetchFeebbacks = async () => {
    try {
      setLoading(true);
      const data = await feedbackService.getAllFeedback();
      const formattedFeebbacks = data.map((feedback, index) => ({
        _id: feedback._id,
        id: index + 1,
        senderName: feedback.senderName,
        senderPhone: feedback.senderPhone,
        senderEmail: feedback.senderEmail,
        question: feedback.question,
        answer: feedback.answer,
        createdAt: new Date(feedback.createdAt),
      }));
      setFeedbacks(formattedFeebbacks);
    } catch (err) {
      setError('Failed to fetch Feebbacks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFeebbacks();
  }, []);

  console.log(feedbacks);

  // Xử lý mở Modal chỉnh sửa với dữ liệu của đánh giá được chọn
  const handleEdit = (feedback) => {
    setEditData(feedback);
    setModalOpen(true);
  };

  const rows = useMemo(
    () =>
      feedbacks.map((feedback) => ({
        ...feedback,
        action: (
          <div>
            <IconButton color="primary" onClick={() => handleEdit(feedback)}>
              <RemoveRedEye />
            </IconButton>
          </div>
        ),
      })),
    [feedbacks],
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
        field: 'senderName',
        headerName: 'Người gửi',
        flex: 1.8,
        headerAlign: 'center',
        align: 'left',
      },
      {
        field: 'senderPhone',
        headerName: 'Số điện thoại',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'senderEmail',
        headerName: 'Email',
        flex: 1.8,
        headerAlign: 'center',
        align: 'left',
      },
      {
        field: 'question',
        headerName: 'Nội dung',
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
        align: 'right',
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

  return (
    <>
      <ActionHeader title="Quản lý đánh giá" />
      <TableComponent
        checkbox={false}
        loading={loading}
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        handleSelected={() => {}}
      />
      <AlertDialog
        open={alertConfig.open}
        onClose={() => setAlertConfig({ ...alertConfig, open: false })}
        title={alertConfig.title}
        actions={
          <Fragment>
            <Button
              onClick={() => setAlertConfig({ ...alertConfig, open: false })}
            >
              Hủy
            </Button>
            <Button
              onClick={() => {
                setAlertConfig({ ...alertConfig, open: false });
                alertConfig.action && alertConfig.action();
              }}
              autoFocus
            >
              Chắc chắn
            </Button>
          </Fragment>
        }
      />
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="mx-auto my-10 max-w-xl rounded-md bg-white p-6 shadow-lg">
          <div className="flex justify-between">
            <h2 className="mb-6 text-center text-2xl font-semibold">
              Chi tiết phản hồi
            </h2>
            <Button
              variant="outlined"
              className="h-8"
              color="primary"
              onClick={() => setModalOpen(false)}
            >
              X
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {editData?.senderName}
            <div className="flex flex-col space-y-2">
              <div className="flex gap-3 rounded-md border border-gray-300 p-2 font-medium">
                Email: {editData?.senderEmail || 'Chưa có thông tin'}
              </div>

              <div className="flex gap-3 rounded-md border border-gray-300 p-2 font-medium">
                Số điện thoại: {editData?.senderPhone || 'Chưa có thông tin'}
              </div>

              <div className="flex gap-3 rounded-md border border-gray-300 p-2 font-medium">
                Nội dung: {editData?.question || 'Chưa có thông tin'}
              </div>

              <div className="flex gap-3 rounded-md border border-gray-300 p-2 font-medium">
                Ngày tạo:{' '}
                {editData?.createdAt
                  ? new Date(editData.createdAt).toLocaleDateString('vi-VN')
                  : 'Chưa có thông tin'}
              </div>
            </div>
          </div>

          <div> </div>

          <div className="mt-3 flex justify-end gap-4">
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {}}
            ></Button>
            <Button variant="outlined" color="primary" onClick={() => {}}>
              Xóa
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FeedbackPage;
