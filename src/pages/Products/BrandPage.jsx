import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Trash2, FilePenLine, BadgePlus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, deleteBrand } from '../../redux/thunk/brandThunk';
import { useEffect, useState, Fragment } from 'react';
import Button from '@mui/material/Button';
import BrandPopup from '../../components/Popup/BrandPopup';
import { toast } from 'react-toastify';
import AlertDialog from '../../components/common/AlertDialog';

const BrandPage = () => {
  const dispatch = useDispatch();
  const { brands, error } = useSelector(state => state.brand);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [title, setTitle] = useState('');
  const [action, setAction] = useState(null);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const handleSelected = (index) => {
    const selected = index.map((i) => brands[i - 1]);
    setSelectedRows(selected);
  };

  const handleUpdate = () => {
    if (!selectedRows || selectedRows.length !== 1) {
      toast.error('Vui lòng chọn 1 thương hiệu để cập nhật!');
    } else {
      setIsPopupOpen(true);
    }
  };

  const handleDelete = (ids) => {
    if (ids.length === 0) {
      toast.error('Vui lòng chọn ít nhất một sản phẩm để xóa');
      return;
    }
    setTitle('Bạn có chắc chắn muốn xóa những sản phẩm đã chọn không?');
    setOpenAlert(true);
    setAction(() => async () => {
      Promise.all(ids.map((id) => dispatch(deleteBrand(id))));
      if (error === null) {
        toast.success('Xóa sản phẩm thành công');
        setSelectedRows([]);
      } else toast.error('Có lỗi xảy ra');
    });
  };

  const columns = [
    {
      field: 'id',
      headerName: 'STT',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'brandName',
      headerName: 'Tên thương hiệu',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'brandDesc',
      headerClassName: 'super-app-theme--header',
      headerName: 'Mô tả',
      width: 300,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'updatedAt',
      headerName: 'Ngày cập nhật',
      type: 'Date',
      width: 190,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      type: 'Date',
      width: 190,
      headerAlign: 'center',
      align: 'center',
    },
  ];

  const rows = brands.map((brand, index) => ({
    ...brand,
    id: index + 1,
    updatedAt: brand.updatedAt
      ? new Date(brand.updatedAt).toLocaleDateString('vi-VN')
      : '',
    createdAt: brand.createdAt
      ? new Date(brand.createdAt).toLocaleDateString('vi-VN')
      : '',
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Thương hiệu</h1>
        <div className="ml-auto flex space-x-2">
          <button
            className="flex items-center rounded bg-green-600 px-4 py-2 text-white"
            onClick={() => {
              setSelectedRows(null);
              setIsPopupOpen(true);
            }}
          >
            <BadgePlus strokeWidth={1} className="mr-2" />
            <span>Thêm</span>
          </button>
          <button
            className="flex items-center rounded bg-blue-600 px-4 py-2 text-white"
            onClick={handleUpdate}
          >
            <FilePenLine strokeWidth={1} className="mr-2" />
            <span>Cập nhật</span>
          </button>
          <button
            className="flex items-center rounded bg-red-600 px-4 py-2 text-white"
            onClick={() => handleDelete(selectedRows.map((row) => row._id))}
          >
            <Trash2 strokeWidth={1} className="mr-2" />
            <span>Xóa</span>
          </button>
        </div>
      </div>
      <Box sx={{ height: 450, width: '100%' }}>
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            handleSelected(newRowSelectionModel);
          }}
          sx={{
            border: 0,
          }}
          disableColumnMenu
          disableDensitySelector
          dis
          // loading
        />
      </Box>
      <BrandPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        data={selectedRows}
      />
      <AlertDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title={title}
        actions={
          <Fragment>
            <Button onClick={() => setOpenAlert(false)}>Hủy</Button>
            <Button
              onClick={() => {
                setOpenAlert(false);
                action && action();
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
