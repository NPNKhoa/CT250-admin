import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getProductTypes } from '../../redux/thunk/productTypeThunk';
import { getBrands } from '../../redux/thunk/brandThunk';
import {
  createCategory,
  updateCategory,
} from '../../redux/thunk/categoryThunk';

const CategoryPopup = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();
  const initialCategory = useMemo(
    () => ({
      _id: data?.[0]?._id || '',
      productType: data?.[0]?.productType?._id  || '',
      brand: data?.[0]?.brand?._id || '',
      productBrandName:
        data?.[0]?.brand?.brandName || '',
      productTypeName:
        data?.[0]?.productType?.productTypeName || '',
    }),
    [data],
  );

  console.log('data: ', data)

  const [category, setCategory] = useState(initialCategory);
  const { productTypes } = useSelector((state) => state.productType);
  const { brands } = useSelector((state) => state.brand);

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([dispatch(getProductTypes()), dispatch(getBrands())]);
    };

    fetchData();
  }, [dispatch]);

  const handleAutocompleteChange = (field, id) => {
    setCategory((prevProduct) => ({
      ...prevProduct,
      [field]: id,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  console.log(category);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (data && data.length > 0) {
        await dispatch(updateCategory(category)).unwrap();
        toast.success('Cập nhật thành công!');
      } else {
        await dispatch(createCategory(category)).unwrap();
        toast.success('Thêm thành công!');
      }
    } catch (err) {
      if (err === 'Category is already exist!') {
        toast.error('Danh mục đã tồn tại!');
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
        className="z-10 w-[40%] max-w-[95%] overflow-auto rounded-lg bg-white p-4 shadow-lg md:max-w-2xl lg:max-w-3xl"
        sx={{ maxHeight: '100vh' }}
      >
        <h1 className="mb-2 text-center text-2xl font-bold">
          {data && data.length > 0 ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}
        </h1>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            options={productTypes.map(
              (productType) => productType.productTypeName,
            )}
            value={category.productTypeName}
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
                required
                fullWidth
              />
            )}
            className="flex-1 mb-3 mt-3"
          />
          <Autocomplete
            options={brands.map((brand) => brand.brandName)}
            value={category.productBrandName}
            onChange={(event, newValue) => {
              const selectedBrand = brands.find(
                (brand) => brand.brandName === newValue,
              );
              handleAutocompleteChange('brand', selectedBrand?._id);
              handleInputChange({
                target: {
                  name: 'productBrandName',
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
                required
                fullWidth
              />
            )}
            className="flex-1"
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

CategoryPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default CategoryPopup;
