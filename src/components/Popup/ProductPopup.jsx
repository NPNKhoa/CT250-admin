import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box, Chip, Autocomplete } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../redux/thunk/productThunk';
import { getProductTypes } from '../../redux/thunk/productTypeThunk';
import { getBrands } from '../../redux/thunk/brandThunk';
import { getDiscounts } from '../../redux/thunk/discountThunk';
import productsService from '../../services/products.service';

const ProductPopup = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();
  const initialProduct = useMemo(
    () => ({
      _id: data?.[0]?._id || '',
      productName: data?.[0]?.productName || '',
      price: data?.[0]?.price || 0,
      productImagePath: data?.[0]?.productImagePath || [],
      productType: data?.[0]?.productType?._id || data?.[0]?.productType || '',
      productBrand:
        data?.[0]?.productBrand?._id || data?.[0]?.productBrand || '',
      countInStock: data?.[0]?.countInStock || 0,
      productBrandName:
        data?.[0]?.brandDetails?.brandName ||
        data?.[0]?.productBrand?.brandName ||
        '',
      productTypeName:
        data?.[0]?.productTypeDetails?.productTypeName ||
        data?.[0]?.productType?.productTypeName ||
        '',
      discount: data?.[0]?.discount?._id || data?.[0]?.discount || '',
      discountField: data?.[0]?.discountDetails
        ? `Giảm ${data[0].discountDetails.discountPercent}% (từ ngày ${new Date(data[0].discountDetails.discountStartDate).toLocaleDateString('vi-VN')} đến ngày ${new Date(data[0].discountDetails.discountExpiredDate).toLocaleDateString('vi-VN')})`
        : data?.[0]?.discount
          ? `Giảm ${data[0].discount.discountPercent}% (từ ngày ${new Date(data[0].discount.discountStartDate).toLocaleDateString('vi-VN')} đến ngày ${new Date(data[0].discount.discountExpiredDate).toLocaleDateString('vi-VN')})`
          : '',
    }),
    [data],
  );

  // console.log(data);

  const [product, setProduct] = useState(initialProduct);
  const [newFiles, setNewFiles] = useState([]);
  const { productTypes } = useSelector((state) => state.productType);
  const { brands } = useSelector((state) => state.brand);
  const { discounts } = useSelector((state) => state.discount);

  useEffect(() => {
    dispatch(getProductTypes());
    dispatch(getBrands());
    dispatch(getDiscounts());
  }, [dispatch]);

  useEffect(() => {
    setProduct(initialProduct);
  }, [initialProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]:
        name === 'countInStock' || name === 'price' ? Number(value) : value,
    }));
  };

  const handleAutocompleteChange = (field, id) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: id,
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

    setNewFiles((prevFiles) => [...prevFiles, ...filesArray]);
    e.target.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedProduct = product;

    if (newFiles && newFiles.length > 0) {
      const uploadedImageUrls = await productsService.uploadImage(newFiles);
      const oldImageUrls = product.productImagePath.filter(
        (url) => !url.startsWith('blob:'),
      );

      updatedProduct = {
        ...product,
        productImagePath: [...oldImageUrls, ...uploadedImageUrls],
      };
    }

    if (
      Array.isArray(updatedProduct.productImagePath) &&
      updatedProduct.productImagePath.length === 0
    )
      toast.error('Thêm hình ảnh cho sản phẩm');
    else {
      try {
        if (data && data.length > 0) {
          await dispatch(updateProduct(updatedProduct)).unwrap();
          toast.success('Cập nhật thành công!');
        } else {
          await dispatch(createProduct(updatedProduct)).unwrap();
          toast.success('Thêm thành công!');
        }
      } catch (err) {
        if (err === 'Product is already exist!') {
          toast.error('Sản phẩm đã tồn tại!');
        } else {
          toast.error('Có lỗi xảy ra!');
        }
      }

      setNewFiles([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>
      <Box
        className="z-10 w-[80%] max-w-[95%] overflow-auto rounded-lg bg-white p-4 shadow-lg md:max-w-2xl lg:max-w-3xl"
        sx={{ maxHeight: '100vh' }}
      >
        <h1 className="mb-2 text-center text-2xl font-bold">
          {data && data.length > 0 ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
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
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Thêm hình ảnh
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
                multiple
              />
            </Button>
            <Box className="mt-3 flex flex-wrap">
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
                      className="mb-1 h-20 w-20 object-cover"
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
                        setNewFiles((prevFiles) =>
                          prevFiles.filter((_, i) => i !== index),
                        );
                      }}
                    />
                  </Box>
                ))}
            </Box>
            <Box className="mb-3 mt-2 flex space-x-4">
              <TextField
                label="Giá"
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
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
                name="countInStock"
                value={product.countInStock}
                onChange={handleInputChange}
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
                value={product.productTypeName}
                onChange={(event, newValue) => {
                  const selectedProductType = productTypes.find(
                    (productType) => productType.productTypeName === newValue,
                  );
                  handleAutocompleteChange(
                    'productType',
                    selectedProductType?._id,
                  );
                  handleInputChange({
                    target: { name: 'productTypeName', value: newValue },
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Loại sản phẩm"
                    name="productTypeName"
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
                className="flex-1"
              />

              <Autocomplete
                options={brands.map((brand) => brand.brandName)}
                value={product.productBrandName}
                onChange={(event, newValue) => {
                  const selectedBrand = brands.find(
                    (brand) => brand.brandName === newValue,
                  );
                  handleAutocompleteChange('productBrand', selectedBrand?._id);
                  handleInputChange({
                    target: { name: 'productBrandName', value: newValue },
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Thương hiệu"
                    name="productBrandName"
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
                className="flex-1"
              />
            </Box>
            <Autocomplete
              options={(discounts || []).map((discount) => {
                const startDate = new Date(
                  discount.discountStartDate,
                ).toLocaleDateString('vi-VN');
                const expiredDate = new Date(
                  discount.discountExpiredDate,
                ).toLocaleDateString('vi-VN');

                return `Giảm ${discount.discountPercent}% (từ ngày ${startDate} đến ngày ${expiredDate})`;
              })}
              value={product.discountField}
              onChange={(event, newValue) => {
                const selectedDiscount = (discounts || []).find((discount) => {
                  const startDate = new Date(
                    discount.discountStartDate,
                  ).toLocaleDateString('vi-VN');
                  const expiredDate = new Date(
                    discount.discountExpiredDate,
                  ).toLocaleDateString('vi-VN');
                  return (
                    `Giảm ${discount.discountPercent}% (từ ngày ${startDate} đến ngày ${expiredDate})` ===
                    newValue
                  );
                });
                handleAutocompleteChange('discount', selectedDiscount?._id);
                handleInputChange({
                  target: { name: 'discountField', value: newValue },
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Giảm giá (%)"
                  name="discountField"
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
              className="flex-1"
            />
          </Box>
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

ProductPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default ProductPopup;
