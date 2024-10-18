import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategory } from '../../redux/thunk/categoryThunk';
import { useEffect, useState, useMemo, Fragment } from 'react';
import Button from '@mui/material/Button';
import CategoryPopup from '../../components/Popup/CategoryPopup';
import { toast } from 'react-toastify';
import AlertDialog from '../../components/common/AlertDialog';
import TableComponent from '../../components/common/TableComponent';
import ActionHeader from '../../components/common/ActionHeader';

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [alertConfig, setAlertConfig] = useState({
    open: false,
    title: '',
    action: null,
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSelected = (index) => {
    const selected = index.map((i) => categories[i - 1]);
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
              const result = await dispatch(deleteCategory(id)).unwrap();
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
        flex: 1,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'categoryName',
        headerName: 'Tên danh mục',
        flex: 3,
        headerAlign: 'center',
      },
      {
        field: 'updatedAt',
        headerName: 'Ngày cập nhật',
        type: 'Date',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'createdAt',
        headerName: 'Ngày tạo',
        type: 'Date',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
      },
    ],
    [],
  );

  const rows = useMemo(
    () =>
      categories.map((category, index) => ({
        ...category,
        id: index + 1,
        updatedAt: category.updatedAt
          ? new Date(category.updatedAt).toLocaleDateString('vi-VN')
          : '',
        createdAt: category.createdAt
          ? new Date(category.createdAt).toLocaleDateString('vi-VN')
          : '',
      })),
    [categories],
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
      <CategoryPopup
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

export default CategoryPage;
