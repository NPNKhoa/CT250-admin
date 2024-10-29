import { useDispatch, useSelector } from 'react-redux';
import { getBrands, deleteBrand } from '../../redux/thunk/brandThunk';
import { useEffect, useState, useMemo, Fragment } from 'react';
import Button from '@mui/material/Button';
import BrandPopup from '../../components/Popup/BrandPopup';
import { toast } from 'react-toastify';
import AlertDialog from '../../components/common/AlertDialog';
import TableComponent from '../../components/common/TableComponent';
import ActionHeader from '../../components/common/ActionHeader';

const BrandPage = () => {
  const dispatch = useDispatch();
  const { brands, loading } = useSelector((state) => state.brand);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [alertConfig, setAlertConfig] = useState({
    open: false,
    title: '',
    action: null,
  });

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const handleSelected = (index) => {
    const selected = index.map((i) => brands[i - 1]);
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
              const result = await dispatch(deleteBrand(id)).unwrap();
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
        field: 'brandName',
        headerName: 'Tên thương hiệu',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'brandDesc',
        headerName: 'Mô tả',
        flex: 3,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'updatedAt',
        headerName: 'Ngày cập nhật',
        type: 'Date',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
          new Date(params.value).toLocaleDateString('vi-VN')
        ),
      },
      {
        field: 'createdAt',
        headerName: 'Ngày tạo',
        type: 'Date',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
          new Date(params.value).toLocaleDateString('vi-VN')
        ),
      },
    ],
    [],
  );

  const rows = useMemo(
    () =>
      brands.map((brand, index) => ({
        ...brand,
        id: index + 1,
        updatedAt: brand.updatedAt,
        createdAt: brand.createdAt,
      })),
    [brands],
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
      <BrandPopup
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

export default BrandPage;
