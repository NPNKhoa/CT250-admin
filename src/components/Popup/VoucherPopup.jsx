import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createVoucher, updateVoucher } from '../../redux/thunk/voucherThunk';

const VoucherPopup = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();
  const initialVoucher = useMemo(
    () => ({
      _id: data?.[0]?._id || '',
      voucherName: data?.[0]?.voucherName || '',
      voucherCode: data?.[0]?.voucherCode || '',
      voucherType: data?.[0]?.voucherType || '',
      maxPriceDiscount: data?.[0]?.maxPriceDiscount || '',
      maxUsage: data?.[0]?.maxUsage || '',
      discountPercent: data?.[0]?.discountPercent || '',
      startDate: data?.[0]?.startDate
        ? new Date(data[0].startDate).toISOString().split('T')[0]
        : '',
      expiredDate: data?.[0]?.expiredDate
        ? new Date(data[0].expiredDate).toISOString().split('T')[0]
        : '',
    }),
    [data],
  );

  const [voucher, setVoucher] = useState(initialVoucher);

  useEffect(() => {
    setVoucher(initialVoucher);
  }, [initialVoucher]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoucher((prevVoucher) => ({
      ...prevVoucher,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (data && data.length > 0) {
        await dispatch(updateVoucher(voucher)).unwrap();
        toast.success('Cập nhật thành công!');
      } else {
        await dispatch(createVoucher(voucher)).unwrap();
        toast.success('Thêm thành công!');
      }
    } catch (err) {
      if (err === 'This voucher code already exist') {
        toast.error('Voucher đã tồn tại!');
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
          {data && data.length > 0 ? 'Cập nhật voucher' : 'Thêm voucher mới'}
        </h1>
        <form onSubmit={handleSubmit}>
          <Box className="mb-3 flex space-x-4">
            <TextField
              label="Tên voucher"
              name="voucherName"
              value={voucher.voucherName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Mã voucher"
              name="voucherCode"
              value={voucher.voucherCode}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
          </Box>
          <Box className="mb-3 flex items-start space-x-4">
            <TextField
              label="Giảm giá (%)"
              name="discountPercent"
              value={voucher.discountPercent}
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
              // helperText={
              //   voucher.discountPercent < 1 || voucher.discountPercent > 100
              //     ? 'Giá trị giảm giá (%) nằm trong khoảng từ 1 đến 100.'
              //     : ''
              // }
              // error={
              //   voucher.discountPercent < 1 || voucher.discountPercent > 100
              // }
            />
            <Autocomplete
              options={['public', 'private']}
              value={voucher.voucherType}
              onChange={(_, newValue) => {
                setVoucher((prevVoucher) => ({
                  ...prevVoucher,
                  voucherType: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Loại voucher"
                  name="voucherType"
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
              fullWidth
              className="mt-4"
            />
          </Box>

          <Box className="mb-3 flex space-x-4">
            <TextField
              label="Giá giảm tối đa"
              name="maxPriceDiscount"
              value={voucher.maxPriceDiscount}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              type="number"
              slotProps={{
                htmlInput: {
                  min: 0,
                },
              }}
            />
            <TextField
              label="Lượt sử dụng tối đa"
              name="maxUsage"
              value={voucher.maxUsage}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              type="number"
              slotProps={{
                htmlInput: {
                  min: 0,
                },
              }}
            />
          </Box>
          <Box className="mb-3 flex space-x-4">
            <TextField
              label="Ngày bắt đầu"
              name="startDate"
              value={voucher.startDate}
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
                new Date(voucher.startDate) > new Date(voucher.expiredDate)
                  ? 'Ngày bắt đầu phải trước ngày kết thúc.'
                  : ''
              }
              error={
                new Date(voucher.startDate) > new Date(voucher.expiredDate)
              }
            />
            <TextField
              label="Ngày kết thúc"
              name="expiredDate"
              value={voucher.expiredDate}
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
                new Date(voucher.expiredDate) < new Date(voucher.startDate)
                  ? 'Ngày kết thúc phải sau ngày bắt đầu.'
                  : ''
              }
              error={
                new Date(voucher.expiredDate) < new Date(voucher.startDate)
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

VoucherPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default VoucherPopup;
