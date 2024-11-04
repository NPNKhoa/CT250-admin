import { useDispatch, useSelector } from 'react-redux';
import { getArticles, deleteArticle } from '../redux/thunk/articleThunk';
import { useEffect, useState, useMemo, Fragment } from 'react';
import Button from '@mui/material/Button';
import ArticlePopup from '../components/Popup/ArticlePopup';
import { toast } from 'react-toastify';
import AlertDialog from '../components/common/AlertDialog';
import TableComponent from '../components/common/TableComponent';
import ActionHeader from '../components/common/ActionHeader';

const ArticlePage = () => {
  const dispatch = useDispatch();
  const { articles, loading } = useSelector((state) => state.article);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [alertConfig, setAlertConfig] = useState({
    open: false,
    title: '',
    action: null,
  });

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  const handleSelected = (index) => {
    const selected = index.map((i) => articles[i - 1]);
    setSelectedRows(selected);
  };

  const handleUpdate = () => {
    if (selectedRows.length !== 1) {
      toast.error('Vui lòng chọn 1 thương hiệu để cập nhật!');
    } else {
      setIsPopupOpen(true);
    }
  };

  const handleDelete = (ids) => {
    if (ids.length === 0) {
      toast.error('Vui lòng chọn ít nhất một thương hiệu để xóa');
      return;
    }

    setAlertConfig({
      open: true,
      title: 'Bạn có chắc chắn muốn xóa những thương hiệu đã chọn không?',
      action: async () => {
        try {
          await Promise.all(
            ids.map(async (id) => {
              const result = await dispatch(deleteArticle(id)).unwrap();
              return result;
            }),
          );

          toast.success('Xóa thành công!');
          setSelectedRows([]);
        } catch (err) {
          toast.error('Có lỗi xảy ra!');
          console.log(err);
        }
      },
    });
  };

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'STT',
        flex: 0.75,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'thumbnail',
        headerName: 'Ảnh',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
          <img
            src={
              params.value.startsWith('http') ||
              params.value.startsWith('blob:')
                ? params.value
                : `http://localhost:5000/${params.value.replace(/\\/g, '/')}`
            }
            alt="Product"
            style={{
              width: '50px',
              height: '50px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
        ),
      },
      {
        field: 'title',
        headerName: 'Tiêu đề',
        flex: 6,
        headerAlign: 'center',
        align: 'left',
      },
      {
        field: 'updatedAt',
        headerName: 'Ngày cập nhật',
        type: 'Date',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) =>
          new Date(params.value).toLocaleDateString('vi-VN'),
      },
      {
        field: 'createdAt',
        headerName: 'Ngày tạo',
        type: 'Date',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) =>
          new Date(params.value).toLocaleDateString('vi-VN'),
      },
    ],
    [],
  );

  const rows = useMemo(
    () =>
      articles.map((article, index) => ({
        ...article,
        id: index + 1,
        updatedAt: article.updatedAt,
        createdAt: article.createdAt,
      })),
    [articles],
  );

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <ActionHeader
        title="Thương hiệu"
        onAdd={() => {
          setSelectedRows([]);
          setIsPopupOpen(true);
        }}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        selectedRows={selectedRows.map((row) => row._id)}
      />
      <TableComponent
        loading={loading}
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        handleSelected={handleSelected}
      />
      <ArticlePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        data={selectedRows}
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
    </div>
  );
};

export default ArticlePage;
