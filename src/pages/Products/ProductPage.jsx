import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '../../redux/thunk/productThunk';
import { useEffect, useState, useMemo, Fragment } from 'react';
import Button from '@mui/material/Button';
import ProductPopup from '../../components/Popup/ProductPopup';
import { toast } from 'react-toastify';
import AlertDialog from '../../components/common/AlertDialog';
import TableComponent from '../../components/common/TableComponent';
import ActionHeader from '../../components/common/ActionHeader';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [alertConfig, setAlertConfig] = useState({
    open: false,
    title: '',
    action: null,
  });

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleSelected = (index) => {
    const selected = index.map((i) => products[i - 1]);
    setSelectedRows(selected);
  };

  const handleUpdate = () => {
    if (selectedRows.length !== 1) {
      toast.error('Vui lòng chọn 1 sản phẩm để cập nhật!');
    } else {
      setIsPopupOpen(true);
    }
  };

  const handleDelete = (ids) => {
    if (ids.length === 0) {
      toast.error('Vui lòng chọn ít nhất một sản phẩm để xóa');
      return;
    }

    setAlertConfig({
      open: true,
      title: 'Bạn có chắc chắn muốn xóa những sản phẩm đã chọn không?',
      action: async () => {
        try {
          await Promise.all(
            ids.map(async (id) => {
              const result = await dispatch(deleteProduct(id)).unwrap();
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
        field: 'productImage',
        headerName: 'Hình ảnh',
        flex: 1,
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
        field: 'productName',
        headerName: 'Tên sản phẩm',
        flex: 3,
        headerAlign: 'center',
      },
      {
        field: 'categoryName',
        headerName: 'Danh mục',
        flex: 1.5,
        headerAlign: 'center',
      },
      {
        field: 'price',
        headerName: 'Giá',
        type: 'number',
        flex: 1,
        headerAlign: 'center',
        align: 'right',
        renderCell: (params) => (
          <p>{Number(params.value).toLocaleString('vi-VN')} đ</p>
        ),
      },
      {
        field: 'countInStock',
        headerName: 'Số lượng',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
      },
    ],
    [],
  );

  const rows = useMemo(
    () =>
      products.map((product, index) => ({
        ...product,
        id: index + 1,
        categoryName: product.categoryDetails?.categoryName || product.category?.categoryName,
        productImage: product.productImagePath[0],
        updatedAt: product.updatedAt
          ? new Date(product.updatedAt).toLocaleDateString('vi-VN')
          : '',
        createdAt: product.createdAt
          ? new Date(product.createdAt).toLocaleDateString('vi-VN')
          : '',
      })),
    [products],
  );

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <ActionHeader
        title="Sản phẩm"
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
      <ProductPopup
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

export default ProductPage;
