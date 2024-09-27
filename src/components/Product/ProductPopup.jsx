import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Autocomplete,
  TextField,
  Chip,
  Button,
  Box,
  Typography,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductPopup = ({ isOpen, onClose, product: initialProduct }) => {
  const initialProductState = useMemo(() => ({
    name: '',
    images: [],
    types: [],
    brands: [],
    description: '',
    specification: '',
  }), []);

  const [product, setProduct] = useState(initialProductState);

  useEffect(() => {
    if (isOpen) {
      setProduct(initialProduct || initialProductState);
    }
  }, [isOpen, initialProduct, initialProductState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, ...files],
    }));
  };

  const handleDescriptionChange = (value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      description: value,
    }));
  };

  const handleAutocompleteChange = (name) => (_, newValue) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    onClose();
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>
      <Box
        className="z-10 w-full max-w-[95%] overflow-auto rounded-lg bg-white p-4 shadow-lg md:max-w-2xl lg:max-w-3xl"
        sx={{ maxHeight: '90vh' }}
      >
        <h1 className="mb-2 text-center text-2xl font-bold">
          Thêm Sản Phẩm Mới
        </h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Tên sản phẩm"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />

          <Box className="mb-3">
            <Typography variant="body1" className="mb-1">
              Chọn hình ảnh
            </Typography>
            <input
              type="file"
              name="images"
              className="w-full rounded-lg border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleImageChange}
              multiple
              required
            />
            <Box className="mt-2 flex flex-wrap">
              {product.images.map((image, index) => (
                <Chip
                  key={index}
                  label={image.name}
                  onDelete={() => {
                    setProduct((prevProduct) => ({
                      ...prevProduct,
                      images: prevProduct.images.filter((_, i) => i !== index),
                    }));
                  }}
                  className="mb-2 mr-2"
                />
              ))}
            </Box>
          </Box>

          <Box className="mb-3 flex space-x-4">
            <Autocomplete
              multiple
              options={['Loại 1', 'Loại 2']}
              value={product.types}
              onChange={handleAutocompleteChange('types')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Loại sản phẩm"
                  name="types"
                  variant="outlined"
                  //   required
                  fullWidth
                />
              )}
              className="flex-1"
            />
            <Autocomplete
              multiple
              options={['Brand 1', 'Brand 2']}
              value={product.brands}
              onChange={handleAutocompleteChange('brands')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Brand"
                  name="brands"
                  variant="outlined"
                  //   required
                  fullWidth
                />
              )}
              className="flex-1"
            />
          </Box>

          <Autocomplete
            options={['Thông số 1', 'Thông số 2']}
            value={product.specification}
            onChange={handleAutocompleteChange('specification')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Thông số kỹ thuật"
                name="specification"
                variant="outlined"
                required
                fullWidth
                margin="normal"
              />
            )}
          />

          <Box className="mb-3">
            <Typography variant="body1" className="mb-1">
              Mô tả
            </Typography>
            <Box sx={{ height: 150, overflow: 'auto' }}>
              <ReactQuill
                value={product.description}
                onChange={handleDescriptionChange}
                className="bg-white"
                theme="snow"
                modules={modules}
              />
            </Box>
          </Box>

          <Box className="mt-4 flex justify-end space-x-2">
            <Button variant="contained" color="secondary" onClick={onClose}>
              Hủy
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Thêm sản phẩm
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

ProductPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.object),
    types: PropTypes.arrayOf(PropTypes.string),
    brands: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    specification: PropTypes.string,
  }),
};

export default ProductPopup;