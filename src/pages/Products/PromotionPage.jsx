import { Trash2, FilePenLine, BadgePlus, Gift, CheckCheck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPromotions,
  deletePromotion,
} from '../../redux/thunk/promotionThunk';
import { useEffect, useState, useMemo, Fragment } from 'react';
import Button from '@mui/material/Button';
import PromotionPopup from '../../components/Popup/PromotionPopup';
import { toast } from 'react-toastify';
import AlertDialog from '../../components/common/AlertDialog';
import TableComponent from '../../components/common/TableComponent';
import { Box } from '@mui/material';

const PromotionPage = () => {
  const dispatch = useDispatch();
  const { promotions, loading } = useSelector((state) => state.promotion);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [alertConfig, setAlertConfig] = useState({
    open: false,
    title: '',
    action: null,
  });

  useEffect(() => {
    dispatch(getPromotions());
  }, [dispatch]);

  const handleSelected = (index) => {
    const selected = index.map((i) => promotions[i - 1]);
    setSelectedRows(selected);
  };

  const handleUpdate = () => {
    if (selectedRows.length !== 1) {
      toast.error('Vui lòng chọn 1 ưu đãi để cập nhật!');
    } else {
      setIsPopupOpen(true);
    }
  };

  const handleDelete = (ids) => {
    if (ids.length === 0) {
      toast.error('Vui lòng chọn ít nhất một ưu đãi để xóa');
      return;
    }

    setAlertConfig({
      open: true,
      title: 'Bạn có chắc chắn muốn xóa những ưu đãi đã chọn không?',
      action: async () => {
        try {
          await Promise.all(
            ids.map(async (id) => {
              const result = await dispatch(deletePromotion(id)).unwrap();
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
        field: 'gifts',
        headerName: 'Quà tặng',
        flex: 2,
        headerAlign: 'center',
        // align: 'center',
        renderCell: (params) => (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {params.value.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Gift color="#EA580C" strokeWidth={1} className='mr-2'/>
                <span>{item}</span>
              </Box>
            ))}
          </Box>
        ),
      },
      {
        field: 'services',
        headerName: 'Dịch vụ',
        flex: 3,
        headerAlign: 'center',
        // align: 'center',
        renderCell: (params) => (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {params.value.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
               <CheckCheck color="#EA580C" strokeWidth={1} className='mr-2' />
                <span>{item}</span>
              </Box>
            ))}
          </Box>
        ),
      },
      {
        field: 'promotionStartDate',
        headerName: 'Ngày bắt đầu',
        type: 'Date',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'promotionExpiredDate',
        headerName: 'Ngày kết thúc',
        type: 'Date',
        flex: 2,
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
      promotions.map((promotion, index) => ({
        ...promotion,
        id: index + 1,
        promotionStartDate: promotion.promotionStartDate
          ? new Date(promotion.promotionStartDate).toLocaleDateString('vi-VN')
          : '',
        promotionExpiredDate: promotion.promotionExpiredDate
          ? new Date(promotion.promotionExpiredDate).toLocaleDateString('vi-VN')
          : '',
        updatedAt: promotion.updatedAt
          ? new Date(promotion.updatedAt).toLocaleDateString('vi-VN')
          : '',
        createdAt: promotion.createdAt
          ? new Date(promotion.createdAt).toLocaleDateString('vi-VN')
          : '',
        gifts: promotion.productIds.map(product => product.productName),
        services: promotion.serviceIds.map(service => service.serviceName),
      })),
    [promotions],
  );

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ưu đãi</h1>
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
      <PromotionPopup
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

export default PromotionPage;
