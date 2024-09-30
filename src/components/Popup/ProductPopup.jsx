import { useState, useEffect } from 'react';
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
import productsService from '../../services/products.service';
import brandService from '../../services/brand.service';
import productTypeService from '../../services/productType.service';
import { toast } from 'react-toastify';

const ProductPopup = ({ isOpen, onClose, productData }) => {
  const [product, setProduct] = useState({});
  const [newFiles, setNewFiles] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [productTypeName, setProductTypeName] = useState('');
  const [productBrandName, setProductBrandName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const brands = await brandService.getBrands();
      const productTypes = await productTypeService.getProductTypes();
      setBrands(brands);
      setProductTypes(productTypes);
    };
    const initialProduct = {
      productName: '',
      productImagePath: [],
      productType: '',
      productBrand: '',
      specification: [],
      description: '',
      price: 0,
      countInStock: 0,
    };

    if (isOpen) {
      fetchData();
      setProduct(productData || initialProduct);
      setProductTypeName(
        productData?.productTypeDetails?.productTypeName || '',
      );
      setProductBrandName(productData?.brandDetails?.brandName || '');
      setNewFiles([]);
    }
  }, [isOpen, productData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const filesArray = Array.from(e.target.files);

    setProduct((prevProduct) => ({
      ...prevProduct,
      productImagePath: [
        ...prevProduct.productImagePath,
        ...filesArray.map((file) => URL.createObjectURL(file)),
      ],
    }));

    setNewFiles(filesArray);
  };

  const handleDescriptionChange = (value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      description: value,
    }));
  };

  const handleAutocompleteChange = (feild, id) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [feild]: id,
    }));
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: value,
    }));
  };

  const handleCountInstock = (e) => {
    const { value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      countInStock: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedImageUrls = await productsService.uploadImage(newFiles);
    const oldImageUrls = product.productImagePath.filter(
      (url) => !url.startsWith('blob:'),
    );

    setProduct((prevProduct) => {
      const updatedProduct = {
        ...prevProduct,
        productImagePath: [...oldImageUrls, ...uploadedImageUrls],
      };

      handleProduct(updatedProduct);

      return updatedProduct;
    });

    onClose();
  };

  const handleProduct = async (updatedProduct) => {
    try {
      if (productData) {
        await productsService.updateProduct(updatedProduct._id, updatedProduct);
        toast.success('Cập nhật sản phẩm thành công');
      } else {
        await productsService.createProduct(updatedProduct);
        toast.success('Thêm sản phẩm thành công');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi thêm sản phẩm');
      console.error(error);
    }
  };

  console.log(product);

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
          {productData ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
        </h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Tên sản phẩm"
            name="productName"
            value={product.productName}
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
              name="productImagePath"
              className="w-full rounded-lg border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleImageChange}
              multiple
            />
            <Box className="mt-2 flex flex-wrap">
              {product.productImagePath &&
                product.productImagePath.map((imagePath, index) => (
                  <Box key={index} className="mb-2 mr-2">
                    <img
                      src={
                        imagePath.startsWith('http') ||
                        imagePath.startsWith('blob:')
                          ? imagePath
                          : `http://localhost:5000/${imagePath.replace(/\\/g, '/')}`
                      }
                      alt={`Product Image ${index + 1}`}
                      className="h-20 w-20 object-cover"
                    />
                    <Chip
                      label={index + 1}
                      onDelete={() => {
                        setProduct((prevProduct) => ({
                          ...prevProduct,
                          productImagePath: prevProduct.productImagePath.filter(
                            (_, i) => i !== index,
                          ),
                        }));
                      }}
                      className="mt-1"
                    />
                  </Box>
                ))}
            </Box>
          </Box>

          <Box className="mb-3 flex space-x-4">
            <TextField
              label="Giá"
              type="number"
              value={product.price}
              onChange={handlePriceChange}
              variant="outlined"
              fullWidth
              required
              slotProps={{
                htmlInput: {
                  min: 0,
                },
              }}
            />
            <TextField
              label="Số lượng"
              type="number"
              value={product.countInStock}
              onChange={handleCountInstock}
              variant="outlined"
              fullWidth
              required
              slotProps={{
                htmlInput: {
                  min: 0,
                },
              }}
            />
          </Box>

          <Box className="mb-3 flex space-x-4">
            <Autocomplete
              options={productTypes.map(
                (productType) => productType.productTypeName,
              )}
              value={productTypeName}
              onChange={(event, newValue) => {
                const selectedProductType = productTypes.find(
                  (productType) => productType.productTypeName === newValue,
                );
                handleAutocompleteChange(
                  'productType',
                  selectedProductType?._id,
                );
                setProductTypeName(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Loại sản phẩm"
                  name="productType"
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
              className="flex-1"
            />

            <Autocomplete
              options={brands.map((brand) => brand.brandName)}
              value={productBrandName}
              onChange={(event, newValue) => {
                const selectedBrand = brands.find(
                  (brand) => brand.brandName === newValue,
                );
                handleAutocompleteChange('productBrand', selectedBrand?._id);
                setProductBrandName(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Thương hiệu"
                  name="productBrand"
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
              className="flex-1"
            />
          </Box>

          {/* <Autocomplete
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
          /> */}

          {/* <Box className="mb-3">
            <Typography variant="body1" className="mb-1">
              Mô tả
            </Typography>
            <Box sx={{ height: 150, overflow: 'auto' }}>
              <ReactQuill
                value={product.description[0] || ''}
                onChange={handleDescriptionChange}
                className="bg-white"
                theme="snow"
                modules={modules}
              />
            </Box>
          </Box> */}

          <Box className="mt-4 flex justify-end space-x-2">
            <Button variant="contained" color="secondary" onClick={onClose}>
              Hủy
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {productData ? 'Cập nhật' : 'Thêm'}
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
  productData: PropTypes.object,
};

export default ProductPopup;
