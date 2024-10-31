import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  createPromotion,
  updatePromotion,
} from '../../redux/thunk/promotionThunk';
import { getProducts } from '../../redux/thunk/productThunk';
import { getServices } from '../../redux/thunk/serviceThunk';

const PromotionPopup = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { services } = useSelector((state) => state.service);

  const initialPromotion = useMemo(
    () => ({
      _id: data?.[0]?._id || '',
      productIds: data?.[0]?.productIds?.map((product) => product._id) || [],
      serviceIds: data?.[0]?.serviceIds?.map((service) => service._id) || [],
      promotionStartDate: data?.[0]?.promotionStartDate
        ? new Date(data[0].promotionStartDate).toISOString().split('T')[0]
        : '',
      promotionExpiredDate: data?.[0]?.promotionExpiredDate
        ? new Date(data[0].promotionExpiredDate).toISOString().split('T')[0]
        : '',
    }),
    [data],
  );

  const [promotion, setPromotion] = useState(initialPromotion);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    setPromotion(initialPromotion);
    setSelectedProducts(
      data?.[0]?.productIds?.map((product) => product.productName) || [],
    );
    setSelectedServices(
      data?.[0]?.serviceIds?.map((service) => service.serviceName) || [],
    );
  }, [initialPromotion, data]);

  const handleAutocompleteChange = (field, id) => {
    setPromotion((prevPromotion) => ({
      ...prevPromotion,
      [field]: id,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromotion((prevPromotion) => ({
      ...prevPromotion,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (data && data.length > 0) {
        await dispatch(updatePromotion(promotion)).unwrap();
        toast.success('Cập nhật thành công!');
      } else {
        await dispatch(createPromotion(promotion)).unwrap();
        toast.success('Thêm thành công!');
      }
    } catch (err) {
      if (err === 'Promotion is already exist!') {
        toast.error('Ưu đãi đã tồn tại!');
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
          {data && data.length > 0 ? 'Cập nhật ưu đãi' : 'Thêm ưu đãi mới'}
        </h1>
        <form onSubmit={handleSubmit}>
          <Box>
            <Autocomplete
              options={products.map((product) => product.productName)}
              value={selectedProducts}
              onChange={(event, newValue) => {
                const selectedProductIds = newValue.map((productName) => {
                  const selectedProduct = products.find(
                    (product) => product.productName === productName,
                  );
                  return selectedProduct?._id;
                });
                handleAutocompleteChange('productIds', selectedProductIds);
                setSelectedProducts(newValue);
              }}
              multiple
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Quà tặng"
                  name="gifts"
                  variant="outlined"
                  required={!data}
                />
              )}
              className="mb-5"
            />

            <Autocomplete
              options={services.map((service) => service.serviceName)}
              value={selectedServices}
              onChange={(event, newValue) => {
                const selectedServiceIds = newValue.map((serviceName) => {
                  const selectedService = services.find(
                    (service) => service.serviceName === serviceName,
                  );
                  return selectedService?._id;
                });
                handleAutocompleteChange('serviceIds', selectedServiceIds);
                setSelectedServices(newValue);
              }}
              multiple
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Dịch vụ"
                  name="services_give"
                  variant="outlined"
                  required={!data}
                />
              )}
              className="mb-5"
            />
          </Box>
          <Box className="mb-3 flex space-x-4">
            <TextField
              label="Ngày bắt đầu"
              name="promotionStartDate"
              value={promotion.promotionStartDate}
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
                new Date(promotion.promotionStartDate) >
                new Date(promotion.promotionExpiredDate)
                  ? 'Ngày bắt đầu phải trước ngày kết thúc.'
                  : ''
              }
              error={
                new Date(promotion.promotionStartDate) >
                new Date(promotion.promotionExpiredDate)
              }
            />
            <TextField
              label="Ngày kết thúc"
              name="promotionExpiredDate"
              value={promotion.promotionExpiredDate}
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
                new Date(promotion.promotionExpiredDate) <
                new Date(promotion.promotionStartDate)
                  ? 'Ngày kết thúc phải sau ngày bắt đầu.'
                  : ''
              }
              error={
                new Date(promotion.promotionExpiredDate) <
                new Date(promotion.promotionStartDate)
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

PromotionPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default PromotionPopup;
