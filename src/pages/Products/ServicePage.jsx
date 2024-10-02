import { Trash2, FilePenLine, BadgePlus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices, deleteService } from '../../redux/thunk/serviceThunk';
import { useEffect, useState, useMemo, Fragment } from 'react';
import Button from '@mui/material/Button';
import ServicePopup from '../../components/Popup/ServicePopup';
import { toast } from 'react-toastify';
import AlertDialog from '../../components/common/AlertDialog';
import TableComponent from '../../components/common/TableComponent';

const ServicePage = () => {
  const dispatch = useDispatch();
  const { services, loading } = useSelector((state) => state.service);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [alertConfig, setAlertConfig] = useState({
    open: false,
    title: '',
    action: null,
  });

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const handleSelected = (index) => {
    const selected = index.map((i) => services[i - 1]);
    setSelectedRows(selected);
  };

  const handleUpdate = () => {
    if (selectedRows.length !== 1) {
      toast.error('Vui lòng chọn 1 dịch vụ để cập nhật!');
    } else {
      setIsPopupOpen(true);
    }
  };

  const handleDelete = (ids) => {
    if (ids.length === 0) {
      toast.error('Vui lòng chọn ít nhất một dịch vụ để xóa');
      return;
    }

    setAlertConfig({
      open: true,
      title: 'Bạn có chắc chắn muốn xóa những dịch vụ đã chọn không?',
      action: async () => {
        try {
          await Promise.all(
            ids.map(async (id) => {
              const result = await dispatch(deleteService(id)).unwrap();
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
        field: 'serviceName',
        headerName: 'Tên dịch vụ',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'servicePrice',
        headerName: 'Giá (VNĐ)',
        flex: 3,
        headerAlign: 'center',
        align: 'center',
        type: "number"
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
      services.map((service, index) => ({
        ...service,
        id: index + 1,
        updatedAt: service.updatedAt
          ? new Date(service.updatedAt).toLocaleDateString('vi-VN')
          : '',
        createdAt: service.createdAt
          ? new Date(service.createdAt).toLocaleDateString('vi-VN')
          : '',
      })),
    [services],
  );

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dịch vụ</h1>
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
      <ServicePopup
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

export default ServicePage;
