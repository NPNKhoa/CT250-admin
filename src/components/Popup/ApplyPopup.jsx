import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Button,
  Box,
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, updateProduct } from '../../redux/thunk/productThunk';
import { getProductTypes } from '../../redux/thunk/productTypeThunk';
import { getBrands } from '../../redux/thunk/brandThunk';

const ApplyPopup = ({ isOpen, onClose, data, promotionCheck }) => {
  const dispatch = useDispatch();
  const initial = useMemo(
    () => ({
      _id: data?.[0]?._id || '',
      brandName: '',
      productTypeName: '',
      productType: '',
      brand: '',
      product: '',
      selectedProducts: [],
      productName: [],
      selectAll: false,
    }),
    [data],
  );

  const [applyData, setApplyData] = useState(initial);
  const { products } = useSelector((state) => state.product);
  const { productTypes } = useSelector((state) => state.productType);
  const { brands } = useSelector((state) => state.brand);

  useEffect(() => {
    setApplyData(initial);
  }, [initial]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getProducts()),
        dispatch(getProductTypes()),
        dispatch(getBrands()),
      ]);
    };

    fetchData();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplyData((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (field, id) => {
    setApplyData((prevProduct) => ({
      ...prevProduct,
      [field]: Array.isArray(prevProduct[field]) ? [...prevProduct[field], id] : [id],
    }));
  };

  const handleSelectAllChange = (e) => {
    const { checked } = e.target;
    setApplyData((prevProduct) => ({
      ...prevProduct,
      selectAll: checked,
      selectedProducts: checked ? products.map(product => product._id) : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredProducts = applyData.selectAll
        ? products
        : products.filter((product) => {
            return (
              (!applyData.productBrand ||
                product.productBrand === applyData.productBrand) &&
              (!applyData.productType ||
                product.productType === applyData.productType)
            );
          });

      const selectedProductData = [
        ...new Set([...filteredProducts, ...applyData.selectedProducts]),
      ];
      console.log('filteredProducts', filteredProducts);

      if (promotionCheck) {
        await Promise.all(
          selectedProductData.map((product) => {
            if (product.discount === '') {
              delete product.discount;
            }
            dispatch(
              updateProduct({
                ...product,
                promotion: applyData._id,
              }),
            );
          }),
        );
      } else {
        await Promise.all(
          selectedProductData.map((product) => {
            if (product.promotion === '') {
              delete product.promotion;
            }
            dispatch(
              updateProduct({
                ...product,
                discount: applyData._id,
              }),
            );
          }),
        );
      }
      toast.success('Cập nhật thành công!');
    } catch (error) {
      toast.error('Cập nhật thất bại!');
      console.log(error);
    }
    setApplyData({});
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
          Áp dụng cho sản phẩm
        </h1>
        <form onSubmit={handleSubmit}>
          <FormControlLabel
            control={
              <Checkbox
                checked={applyData.selectAll}
                onChange={handleSelectAllChange}
                name="selectAll"
                color="primary"
              />
            }
            label="Chọn tất cả sản phẩm"
          />
          <Autocomplete
            options={products.map((product) => product.productName)}
            value={applyData.productName}
            onChange={(event, newValue) => {
              const selectedProductIds = newValue.map((productName) => {
                const selectedProduct = products.find(
                  (product) => product.productName === productName,
                );
                if (!selectedProduct) {
                  console.error('Product not found:', productName);
                  return null;
                }
                return selectedProduct._id;
              }).filter(Boolean); // Filter out null values
              setApplyData((prevProduct) => ({
                ...prevProduct,
                selectedProducts: selectedProductIds,
                productName: newValue,
              }));
            }}
            multiple
            renderInput={(params) => (
              <TextField
                {...params}
                label="Sản phẩm"
                name="product"
                variant="outlined"
                fullWidth
              />
            )}
            className="mb-3 flex-1"
          />
          <Autocomplete
            options={productTypes.map(
              (productType) => productType.productTypeName,
            )}
            value={applyData.productTypeName}
            onChange={(event, newValue) => {
              const selectedProductType = productTypes.find(
                (productType) => productType.productTypeName === newValue,
              );
              handleAutocompleteChange('productType', selectedProductType?._id);
              handleInputChange({
                target: {
                  name: 'productTypeName',
                  value: newValue,
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Loại sản phẩm"
                name="productTypeName"
                variant="outlined"
                fullWidth
              />
            )}
            className="mb-3 flex-1"
          />
          <Autocomplete
            options={brands.map((brand) => brand.brandName)}
            value={applyData.brandName}
            onChange={(event, newValue) => {
              const selectedBrand = brands.find(
                (brand) => brand.brandName === newValue,
              );
              handleAutocompleteChange('productBrand', selectedBrand?._id);
              handleInputChange({
                target: {
                  name: 'brandName',
                  value: newValue,
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Thương hiệu"
                name="productBrandName"
                variant="outlined"
                fullWidth
              />
            )}
            className="flex-1"
          />
          <Box className="mt-4 flex justify-end space-x-2">
            <Button onClick={onClose}>
              Hủy
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Áp dụng
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

ApplyPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array,
  promotionCheck: PropTypes.bool.isRequired,
};

export default ApplyPopup;