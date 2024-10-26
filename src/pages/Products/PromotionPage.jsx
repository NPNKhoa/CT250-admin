import { Gift, CheckCheck } from 'lucide-react';
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
import ActionHeader from '../../components/common/ActionHeader';
import ApplyPopup from '../../components/Popup/ApplyPopup';

const PromotionPage = () => {
  const dispatch = useDispatch();
  const { promotions, loading } = useSelector((state) => state.promotion);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isApplyPopup, setIsApplyPopup] = useState(false);
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
        flex: 4,
        headerAlign: 'center',
        // align: 'center',
        renderCell: (params) => (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {params.value.map((item, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
              >
                <Gift color="#EA580C" strokeWidth={1} className="mr-2" />
                <span>{item}</span>
              </Box>
            ))}
          </Box>
        ),
      },
      {
        field: 'services',
        headerName: 'Dịch vụ',
        flex: 4,
        headerAlign: 'center',
        // align: 'center',
        renderCell: (params) => (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {params.value.map((item, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
              >
                <CheckCheck color="#EA580C" strokeWidth={1} className="mr-2" />
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
        gifts: promotion.productIds.map((product) => product.productName),
        services: promotion.serviceIds.map((service) => service.serviceName),
      })),
    [promotions],
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
        title="Ưu đãi"
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
      <ApplyPopup
        isOpen={isApplyPopup}
        onClose={() => setIsApplyPopup(false)}
        data={selectedRows}
        promotionCheck={true}
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
