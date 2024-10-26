import { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box, Chip, Autocomplete } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../redux/thunk/productThunk';
import { getCategories } from '../../redux/thunk/categoryThunk';
import { getDiscounts } from '../../redux/thunk/discountThunk';
import { getPromotions } from '../../redux/thunk/promotionThunk';
import { getSpecifications } from '../../redux/thunk/specificationThunk';
import productsService from '../../services/products.service';
import { Trash2, SquarePlus } from 'lucide-react';
import JoditEditor from 'jodit-react';

const ProductPopup = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();

  const initialProduct = useMemo(
    () => ({
      _id: data?.[0]?._id || '',
      productName: data?.[0]?.productName || '',
      price: data?.[0]?.price || 0,
      category: data?.[0]?.category?._id || data?.[0]?.category || '',
      categoryName: data?.[0]?.categoryDetails?.categoryName || data?.[0]?.category?.categoryName || '',
      productImagePath: data?.[0]?.productImagePath || [],
      countInStock: data?.[0]?.countInStock || 0,
      discount: data?.[0]?.discount?._id || data?.[0]?.discount || '',
      discountField: data?.[0]?.discountDetails
        ? `Giảm ${data[0].discountDetails.discountPercent}% (từ ngày ${new Date(data[0].discountDetails.discountStartDate).toLocaleDateString('vi-VN')} đến ngày ${new Date(data[0].discountDetails.discountExpiredDate).toLocaleDateString('vi-VN')})`
        : data?.[0]?.discount
          ? `Giảm ${data[0].discount.discountPercent}% (từ ngày ${new Date(data[0].discount.discountStartDate).toLocaleDateString('vi-VN')} đến ngày ${new Date(data[0].discount.discountExpiredDate).toLocaleDateString('vi-VN')})`
          : '',
      description: data[0]?.description || '',
      promotion: data?.[0]?.promotion?._id || data?.[0]?.promotion || '',
    }),
    [data],
  );

  console.log('data: ', data);

  const [product, setProduct] = useState(initialProduct);
  const [newFiles, setNewFiles] = useState([]);
  const { categories } = useSelector((state) => state.category);
  const { discounts } = useSelector((state) => state.discount);
  const { promotions } = useSelector((state) => state.promotion);
  const { specifications } = useSelector((state) => state.specification);
  const [specs, setSpecs] = useState([]);

  const [isFirstStep, setIsFirstStep] = useState(true);

  const editor = useRef(null);

  const findSpecName = (specId) => {
    const spec = specifications.find(
      (specification) => specification._id === specId,
    );
    return spec?.specificationName;
  };

  useEffect(() => {
    if (data[0] && data[0].technicalSpecification && Array.isArray(data[0].technicalSpecification)) {
      const mappedSpecs = data[0].technicalSpecification.map((techSpec) => ({
        name: techSpec.specificationName?.specificationName || findSpecName(techSpec.specificationName),
        specificationName: techSpec.specificationName?._id || techSpec.specificationName,
        specificationDesc: techSpec.specificationDesc,
      }));
      setSpecs(mappedSpecs);
    }
    else setSpecs([]);
  }, [data]);

  const handleNextStep = (e) => {
    e.preventDefault();
    setIsFirstStep(false);
  };

  const handlePrevStep = () => {
    setIsFirstStep(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getCategories()),
        dispatch(getDiscounts()),
        dispatch(getSpecifications()),
        dispatch(getPromotions()),
      ]);
    };

    fetchData();
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

    updatedProduct = {
      ...updatedProduct,
      technicalSpecification: specs.map(
        ({ specificationName, specificationDesc }) => ({
          specificationName,
          specificationDesc,
        }),
      ),
    };

    if (updatedProduct.discount === '') {
      delete updatedProduct.discount;
    }

    if (updatedProduct.promotion === '') {
      delete updatedProduct.promotion;
    }

    console.log('updatedProduct: ', updatedProduct);

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

      setIsFirstStep(true);
      setSpecs([]);
      setNewFiles([]);
      onClose();
    }
  };

  const addNewSpec = (e) => {
    e.preventDefault();
    setSpecs([
      ...specs,
      {
        specificationName: '',
        name: '',
        specificationDesc: '',
      },
    ]);
  };

  const handleSpecChange = (index, field, value) => {
    const updatedSpecs = [...specs];
    updatedSpecs[index][field] = value;
    setSpecs(updatedSpecs);
  };

  const removeSpec = (e, index) => {
    e.preventDefault();
    const updatedSpecs = specs.filter((_, i) => i !== index);
    setSpecs(updatedSpecs);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={() => {
          onClose();
          setIsFirstStep(true);
        }}
      ></div>
      <Box
        className="z-10 w-[80%] overflow-auto rounded-lg bg-white p-4 shadow-lg"
        sx={{ maxHeight: '95vh' }}
      >
        <h1 className="mb-2 text-center text-2xl font-bold">
          {data && data.length > 0 ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
        </h1>
        <form onSubmit={handleSubmit}>
          {isFirstStep ? (
            <Box className="flex space-x-4">
              {/* Left Column */}
              <Box className="flex flex-1 flex-col space-y-4">
                <TextField
                  label="Tên sản phẩm"
                  name="productName"
                  value={product.productName}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <Box className="mb-8">
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
                                productImagePath:
                                  prevProduct.productImagePath.filter(
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
                </Box>
                <Box className="flex space-x-4">
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
                    className="flex-1"
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
                    className="flex-1"
                  />
                </Box>
                <Box className="flex space-x-4">
                  <Autocomplete
                    options={categories.map((category) => category.categoryName)}
                    value={product.categoryName}
                    onChange={(event, newValue) => {
                      const selectedCategory = categories.find(
                        (category) => category.categoryName === newValue,
                      );
                      handleAutocompleteChange(
                        'category',
                        selectedCategory?._id,
                      );
                      handleInputChange({
                        target: {
                          name: 'categoryName',
                          value: newValue,
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Danh mục"
                        name="categoryName"
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                    className="flex-1"
                  />
                </Box>
                <Box className="flex space-x-4">
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
                      const selectedDiscount = (discounts || []).find(
                        (discount) => {
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
                        },
                      );
                      handleAutocompleteChange(
                        'discount',
                        selectedDiscount?._id,
                      );
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
                        // required
                        fullWidth
                      />
                    )}
                    className="flex-1"
                  />
                </Box>
                <Box className="flex space-x-4">
                  <Autocomplete
                    options={(promotions || []).map((promotion) => {
                      const gifts = promotion.productIds.map(
                        (product) => product.productName,
                      );
                      const services = promotion.serviceIds.map(
                        (service) => service.serviceName,
                      );

                      return `- Quà tặng: ${gifts.join(', ')}\n- Dịch vụ: ${services.join(', ')}`;
                    })}
                    value={(promotions || [])
                      .map((promotion) => {
                        if (promotion._id === product.promotion) {
                          const gifts = promotion.productIds.map(
                            (product) => product.productName,
                          );
                          const services = promotion.serviceIds.map(
                            (service) => service.serviceName,
                          );

                          return `- Quà tặng: ${gifts.join(', ')}\n- Dịch vụ: ${services.join(', ')}`;
                        }
                        return null;
                      })
                      .filter(Boolean)
                      .join('')}
                    onChange={(event, newValue) => {
                      const selectedPromotion = (promotions || []).find(
                        (promotion) => {
                          const gifts = promotion.productIds.map(
                            (product) => product.productName,
                          );
                          const services = promotion.serviceIds.map(
                            (service) => service.serviceName,
                          );
                          return (
                            `- Quà tặng: ${gifts.join(', ')}\n- Dịch vụ: ${services.join(', ')}` ===
                            newValue
                          );
                        },
                      );
                      handleAutocompleteChange(
                        'promotion',
                        selectedPromotion?._id,
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Ưu đãi"
                        name="promotionField"
                        variant="outlined"
                        // required
                        fullWidth
                      />
                    )}
                    className="flex-1"
                  />
                </Box>
              </Box>

              {/* Right Column */}
              <Box className="mt-4 flex flex-1 flex-col space-y-4">
                <Box>
                  {specs &&
                    specs.map((spec, index) => (
                      <div key={index} className="mb-3 flex space-x-4">
                        <Autocomplete
                          options={specifications.map(
                            (specification) => specification.specificationName,
                          )}
                          value={spec.name}
                          onChange={(e, newValue) => {
                            handleSpecChange(index, 'name', newValue);
                            const selectedSpec = specifications.find(
                              (specification) =>
                                specification.specificationName === newValue,
                            );
                            handleSpecChange(
                              index,
                              'specificationName',
                              selectedSpec._id,
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Thông số kỹ thuật"
                              name="specName"
                              variant="outlined"
                              // required
                              fullWidth
                            />
                          )}
                          className="flex-1"
                        />
                        <TextField
                          label="Giá trị thông số"
                          name="specDesc"
                          value={spec.specificationDesc}
                          onChange={(e) =>
                            handleSpecChange(
                              index,
                              'specificationDesc',
                              e.target.value,
                            )
                          }
                          variant="outlined"
                          fullWidth
                          // required
                          className="flex-1"
                        />
                        <button
                          onClick={(e) => removeSpec(e, index)}
                          className="rounded text-red-600"
                        >
                          <Trash2 strokeWidth={1} />
                        </button>
                      </div>
                    ))}
                  <button
                    onClick={addNewSpec}
                    className="flex items-center rounded p-1 text-blue-600"
                  >
                    <SquarePlus strokeWidth={1} className="mr-2" />
                    <span>Thêm thông số</span>
                  </button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              <div>
                <JoditEditor
                  ref={editor}
                  value={typeof product.description[0] === 'string' ? product.description[0] : ''}
                  tabIndex={1}
                  onChange={(newContent) => {
                    handleInputChange({
                      target: { name: 'description', value: newContent },
                    });
                  }}
                />
              </div>
            </Box>
          )}
          <Box className="mt-4 flex justify-end space-x-2">
            {isFirstStep ? (
              <>
                <Button
                  onClick={() => {
                    onClose();
                    setIsFirstStep(true);
                  }}
                >
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextStep}
                >
                  Tiếp tục
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handlePrevStep}>Trở về</Button>
                <Button variant="contained" color="primary" type="submit">
                  {data && data.length > 0 ? 'Cập nhật' : 'Thêm'}
                </Button>
              </>
            )}
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