import { useDispatch, useSelector } from 'react-redux';
import { getVouchers, deleteVoucher } from '../../redux/thunk/voucherThunk';
import { useEffect, useState, useMemo, Fragment } from 'react';
import Button from '@mui/material/Button';
import VoucherPopup from '../../components/Popup/VoucherPopup';
import { toast } from 'react-toastify';
import AlertDialog from '../../components/common/AlertDialog';
import TableComponent from '../../components/common/TableComponent';
import ActionHeader from '../../components/common/ActionHeader';

const VoucherPage = () => {
  const dispatch = useDispatch();
  const { vouchers, loading } = useSelector((state) => state.voucher);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [alertConfig, setAlertConfig] = useState({
    open: false,
    title: '',
    action: null,
  });

  useEffect(() => {
    dispatch(getVouchers());
  }, [dispatch]);

  const handleSelected = (index) => {
    const selected = index.map((i) => vouchers[i - 1]);
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
              const result = await dispatch(deleteVoucher(id)).unwrap();
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
        field: 'voucherName',
        headerName: 'Tên voucher',
        flex: 2,
        headerAlign: 'center',
        // align: 'center',
      },
      {
        field: 'voucherCode',
        headerName: 'Mã voucher',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'voucherType',
        headerName: 'Loại voucher',
        flex: 1.5,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'discountPercent',
        headerName: 'Giảm giá',
        flex: 1.5,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
          <p>{params.value}%</p>
        ),
      },
      {
        field: 'maxPriceDiscount',
        headerName: 'Tối đa',
        flex: 1.5,
        headerAlign: 'center',
        align: 'right',
        renderCell: (params) => (
          <p>{Number(params.value).toLocaleString('vi-VN')} đ</p>
        ),
      },
      {
        field: 'maxUsage',
        headerName: 'Lượt',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'collectedCount',
        headerName: 'Thu thập',
        flex: 1.5,
        headerAlign: 'center',
        align: 'center',
      },
        // {
        //   field: 'startDate',
        //   headerName: 'Ngày bắt đầu',
        //   type: 'Date',
        //   flex: 2,
        //   headerAlign: 'center',
        //   align: 'center',
        // },
        // {
        //   field: 'expiredDate',
        //   headerName: 'Ngày kết thúc',
        //   type: 'Date',
        //   flex: 2,
        //   headerAlign: 'center',
        //   align: 'center',
        // },
    ],
    [],
  );

  const rows = useMemo(
    () =>
      vouchers.map((voucher, index) => ({
        ...voucher,
        id: index + 1,
        voucherType:
          voucher.voucherType.charAt(0).toUpperCase() +
          voucher.voucherType.slice(1),
        startDate: voucher.startDate
          ? new Date(voucher.startDate).toLocaleDateString('vi-VN')
          : '',
        expiredDate: voucher.expiredDate
          ? new Date(voucher.expiredDate).toLocaleDateString('vi-VN')
          : '',
      })),
    [vouchers],
  );

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <ActionHeader
        title="Voucher"
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
      <VoucherPopup
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

export default VoucherPage;
