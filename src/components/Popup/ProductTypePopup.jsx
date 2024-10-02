import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createProductType, updateProductType } from '../../redux/thunk/productTypeThunk';

const ProductTypePopup = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();
  const initialProductType = useMemo(
    () => ({
      _id: data?.[0]?._id || '',
      productTypeName: data?.[0]?.productTypeName || '',
    }),
    [data],
  );

  const [productType, setProductType] = useState(initialProductType);

  useEffect(() => {
    setProductType(initialProductType);
  }, [initialProductType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductType((prevProductType) => ({
      ...prevProductType,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (data && data.length > 0) {
        console.log(productType);
        await dispatch(updateProductType(productType)).unwrap();
        toast.success('Cập nhật thành công!');
      } else {
        await dispatch(createProductType(productType)).unwrap();
        toast.success('Thêm thành công!');
      }
    } catch (err) {
      if (err === 'This product type is already exist') {
        toast.error('Loại sản phẩm đã tồn tại!');
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
          {data && data.length > 0
            ? 'Cập nhật loại sản phẩm'
            : 'Thêm loại sản phẩm mới'}
        </h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Tên loại sản phẩm"
            name="productTypeName"
            value={productType.productTypeName}
            onChange={handleInputChange}
            fullWidth
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

ProductTypePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default ProductTypePopup;