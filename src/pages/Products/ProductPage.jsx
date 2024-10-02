import { Trash2, FilePenLine, BadgePlus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '../../redux/thunk/productThunk';
import { useEffect, useState, useMemo, Fragment } from 'react';
import Button from '@mui/material/Button';
import ProductPopup from '../../components/Popup/ProductPopup';
import { toast } from 'react-toastify';
import AlertDialog from '../../components/common/AlertDialog';
import TableComponent from '../../components/common/TableComponent';

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
        field: 'productName',
        headerName: 'Tên sản phẩm',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'productTypeName',
        headerName: 'Loại sản phẩm',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'brandName',
        headerName: 'Thương hiệu',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'price',
        headerName: 'Giá (VNĐ)',
        type: 'number',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'countInStock',
        headerName: 'Số lượng',
        flex: 2,
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
        productType: product.productType?._id || product.productType,
        productBrand: product.productBrand?._id || product.productBrand,
        productTypeName:
          product.productType?.productTypeName ||
          product.productTypeDetails?.productTypeName,
        brandName:
          product.productBrand?.brandName || product.brandDetails?.brandName,
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
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sản phẩm</h1>
        <div className="ml-auto flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <button
            className="flex items-center rounded bg-green-600 px-2 py-1 text-xs text-white md:px-4 md:py-2 md:text-base"
            onClick={() => {
              setSelectedRows([]);
              setIsPopupOpen(true);
            }}
          >
            <BadgePlus strokeWidth={1} className="mr-2" />
            <span>Thêm</span>
          </button>
          <button
            className="flex items-center rounded bg-blue-600 px-2 py-1 text-xs text-white md:px-4 md:py-2 md:text-base"
            onClick={handleUpdate}
          >
            <FilePenLine strokeWidth={1} className="mr-2" />
            <span>Cập nhật</span>
          </button>
          <button
            className="flex items-center rounded bg-red-600 px-2 py-1 text-xs text-white md:px-4 md:py-2 md:text-base"
            onClick={() => handleDelete(selectedRows.map((row) => row._id))}
          >
            <Trash2 strokeWidth={1} className="mr-2" />
            <span>Xóa</span>
          </button>
        </div>
      </div>
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
