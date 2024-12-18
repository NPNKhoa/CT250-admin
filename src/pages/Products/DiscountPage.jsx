import { useDispatch, useSelector } from 'react-redux';
import { getDiscounts, deleteDiscount } from '../../redux/thunk/discountThunk';
import { useEffect, useState, useMemo, Fragment } from 'react';
import Button from '@mui/material/Button';
import DiscountPopup from '../../components/Popup/DiscountPopup';
import { toast } from 'react-toastify';
import AlertDialog from '../../components/common/AlertDialog';
import TableComponent from '../../components/common/TableComponent';
import ActionHeader from '../../components/common/ActionHeader';
import ApplyPopup from '../../components/Popup/ApplyPopup';

const DiscountPage = () => {
  const dispatch = useDispatch();
  const { discounts, loading } = useSelector((state) => state.discount);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isApplyPopup, setIsApplyPopup] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [alertConfig, setAlertConfig] = useState({
    open: false,
    title: '',
    action: null,
  });

  useEffect(() => {
    dispatch(getDiscounts());
  }, [dispatch]);

  const handleSelected = (index) => {
    const selected = index.map((i) => discounts[i - 1]);
    setSelectedRows(selected);
  };

  const handleUpdate = () => {
    if (selectedRows.length !== 1) {
      toast.error('Vui lòng chọn 1 giảm giá để cập nhật!');
    } else {
      setIsPopupOpen(true);
    }
  };

  const handleDelete = (ids) => {
    if (ids.length === 0) {
      toast.error('Vui lòng chọn ít nhất một giảm giá để xóa');
      return;
    }

    setAlertConfig({
      open: true,
      title: 'Bạn có chắc chắn muốn xóa những giảm giá đã chọn không?',
      action: async () => {
        try {
          await Promise.all(
            ids.map(async (id) => {
              const result = await dispatch(deleteDiscount(id)).unwrap();
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
        field: 'discountPercent',
        headerName: 'Giảm giá',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
          <p>{params.value}%</p>
        ),
      },
      {
        field: 'discountStartDate',
        headerName: 'Ngày bắt đầu',
        type: 'Date',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
          new Date(params.value).toLocaleDateString('vi-VN')
        ),
      },
      {
        field: 'discountExpiredDate',
        headerName: 'Ngày hết hạn',
        type: 'Date',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
          new Date(params.value).toLocaleDateString('vi-VN')
        ),
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
      discounts.map((discount, index) => ({
        ...discount,
        id: index + 1,
        discountStartDate: discount.discountStartDate,
        discountExpiredDate: discount.discountExpiredDate,
        updatedAt: discount.updatedAt,
        createdAt: discount.createdAt,
      })),
    [discounts],
  );

  const handleApply = () => {
    if (selectedRows.length !== 1) {
      toast.error('Vui lòng chọn 1 giảm giá để áp dụng cho sản phẩm!');
    } else {
      setIsApplyPopup(true);
    }
  };

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <ActionHeader
        title="Giảm giá"
        // onApply={handleApply}
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
      <DiscountPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        data={selectedRows}
      />
      <ApplyPopup
        isOpen={isApplyPopup}
        onClose={() => setIsApplyPopup(false)}
        data={selectedRows}
        promotionCheck={false}
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

export default DiscountPage;
