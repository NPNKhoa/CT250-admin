import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
  createDiscount,
  updateDiscount,
} from '../../redux/thunk/discountThunk';

const DiscountPopup = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();
  const initialDiscount = useMemo(
    () => ({
      _id: data?.[0]?._id || '',
      discountPercent: data?.[0]?.discountPercent || 0,
      discountStartDate: data?.[0]?.discountStartDate
        ? new Date(data[0].discountStartDate).toISOString().split('T')[0]
        : '',
      discountExpiredDate: data?.[0]?.discountExpiredDate
        ? new Date(data[0].discountExpiredDate).toISOString().split('T')[0]
        : '',
    }),
    [data],
  );

  const [discount, setDiscount] = useState(initialDiscount);

  useEffect(() => {
    setDiscount(initialDiscount);
  }, [initialDiscount]);

  console.log(discount);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDiscount((prevDiscount) => ({
      ...prevDiscount,
      [name]: name === 'discountPercent' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (data && data.length > 0) {
        await dispatch(updateDiscount(discount)).unwrap();
        toast.success('Cập nhật thành công!');
      } else {
        await dispatch(createDiscount(discount)).unwrap();
        toast.success('Thêm thành công!');
      }
    } catch (err) {
      if (err === 'This discount already exists') {
        toast.error('Giảm giá đã tồn tại!');
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
          {data && data.length > 0 ? 'Cập nhật giảm giá' : 'Thêm giảm giá mới'}
        </h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Giảm giá (%)"
            name="discountPercent"
            value={discount.discountPercent}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            type="number"
            slotProps={{
              htmlInput: {
                min: 0,
                max: 100,
              },
            }}
            required
            helperText={
              discount.discountPercent < 1 || discount.discountPercent > 100
                ? 'Giá trị giảm giá (%) nằm trong khoảng từ 1 đến 100.'
                : ''
            }
            error={
              discount.discountPercent < 1 || discount.discountPercent > 100
            }
          />
          <Box className="mb-3 flex space-x-4">
            <TextField
              label="Ngày bắt đầu"
              name="discountStartDate"
              value={discount.discountStartDate}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              type="Date"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              helperText={
                new Date(discount.discountStartDate) >
                new Date(discount.discountExpiredDate)
                  ? 'Ngày bắt đầu phải trước ngày kết thúc.'
                  : ''
              }
              error={
                new Date(discount.discountStartDate) >
                new Date(discount.discountExpiredDate)
              }
            />
            <TextField
              label="Ngày kết thúc"
              name="discountExpiredDate"
              value={discount.discountExpiredDate}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              type="Date"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              helperText={
                new Date(discount.discountExpiredDate) <
                new Date(discount.discountStartDate)
                  ? 'Ngày kết thúc phải sau ngày bắt đầu.'
                  : ''
              }
              error={
                new Date(discount.discountExpiredDate) <
                new Date(discount.discountStartDate)
              }
            />
          </Box>
          <Box className="mt-4 flex justify-end space-x-2">
            <Button onClick={onClose}>
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

DiscountPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default DiscountPopup;
