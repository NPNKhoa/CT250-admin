import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Button,
  Box,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createBrand, updateBrand } from '../../redux/thunk/brandThunk';
import brandService from '../../services/brand.service';

const BrandPopup = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.brand);
  const [brand, setBrand] = useState({
    brandName: '',
    brandDesc: '',
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const initData = {
        _id: data[0]?._id || '',
        brandName: data[0]?.brandName || '',
        brandDesc: data[0]?.brandDesc || '',
      };
      setBrand(initData);
    } else {
      setBrand({
        brandName: '',
        brandDesc: '',
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrand((prevBrand) => ({
      ...prevBrand,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data && data.length > 0) {
      dispatch(updateBrand(brand));
      if (error === null) toast.success('Cập nhật thành công');
    } else {
      dispatch(createBrand(brand));
      if (error === null) toast.success('Thêm thành công');
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
          {data && data.length > 0 ? 'Cập nhật thương hiệu' : 'Thêm thương hiệu mới'}
        </h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Tên thương hiệu"
            name="brandName"
            value={brand.brandName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Mô tả"
            name="brandDesc"
            value={brand.brandDesc}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            multiline
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

BrandPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default BrandPopup;