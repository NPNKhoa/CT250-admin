import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
  createService,
  updateService,
} from '../../redux/thunk/serviceThunk';
import { getProducts } from '../../redux/thunk/productThunk';
import { getServices } from '../../redux/thunk/serviceThunk';

const ServicePopup = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();

  const initialService = useMemo(
    () => ({
      _id: data?.[0]?._id || '',
      serviceName: data?.[0]?.serviceName || '',
      servicePrice: data?.[0]?.servicePrice || 0,
    }),
    [data],
  );

  const [service, setService] = useState(initialService);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    setService(initialService);
  }, [initialService]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (data && data.length > 0) {
        await dispatch(updateService(service)).unwrap();
        toast.success('Cập nhật thành công!');
      } else {
        await dispatch(createService(service)).unwrap();
        toast.success('Thêm thành công!');
      }
    } catch (err) {
      if (err === 'Service is already exist!') {
        toast.error('Dịch vụ đã tồn tại!');
      } else {
        toast.error('Có lỗi xảy ra!');
      }
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>
      <Box
        className="z-10 w-[50%] max-w-[95%] overflow-auto rounded-lg bg-white p-4 shadow-lg md:max-w-2xl lg:max-w-3xl"
        sx={{ maxHeight: '100vh' }}
      >
        <h1 className="mb-2 text-center text-2xl font-bold">
          {data && data.length > 0 ? 'Cập nhật dịch vụ' : 'Thêm dịch vụ mới'}
        </h1>
        <form onSubmit={handleSubmit}>
        <TextField
            label="Tên dịch vụ"
            name="serviceName"
            value={service.serviceName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Giá"
            name="servicePrice"
            value={service.servicePrice}
            onChange={handleInputChange}
            fullWidth
            type="number"
            slotProps={{
                htmlInput: {
                  min: 0,
                },
              }}
            margin="normal"
            required
          />
          <Box className="mt-4 flex justify-end space-x-2">
            <Button variant="contained" color="secondary" onClick={onClose}>
              Hủy
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {data && data.length > 0 ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

ServicePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default ServicePopup;
