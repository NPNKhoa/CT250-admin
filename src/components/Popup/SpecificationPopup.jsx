import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createSpecification, updateSpecification } from '../../redux/thunk/specificationThunk';

const SpecificationPopup = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();
  const initialSpecification = useMemo(
    () => ({
      _id: data?.[0]?._id || '',
      specificationName: data?.[0]?.specificationName || '',
    }),
    [data],
  );

  const [specification, setSpecification] = useState(initialSpecification);

  useEffect(() => {
    setSpecification(initialSpecification);
  }, [initialSpecification]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSpecification((prevSpecification) => ({
      ...prevSpecification,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (data && data.length > 0) {
        console.log(specification);
        await dispatch(updateSpecification(specification)).unwrap();
        toast.success('Cập nhật thành công!');
      } else {
        await dispatch(createSpecification(specification)).unwrap();
        toast.success('Thêm thành công!');
      }
    } catch (err) {
      if (err === 'This specification is already exist') {
        toast.error('Thông số kỹ thuật đã tồn tại!');
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
            ? 'Cập nhật thông số kỹ thuật'
            : 'Thêm thông số kỹ thuật mới'}
        </h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Tên thông số kỹ thuật"
            name="specificationName"
            value={specification.specificationName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
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

SpecificationPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default SpecificationPopup;