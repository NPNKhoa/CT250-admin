import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, InputAdornment, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addPriceFilter } from '../../redux/thunk/priceFilter';
import { useSelector } from 'react-redux';

const AddPriceFilter = ({ onSave, onCancel }) => {
  const dispatch = useDispatch();

  const [price, setPrice] = useState({
    fromPrice: null,
    toPrice: null,
  });

  const priceFilterList = useSelector(
    (state) => state.priceFilters.priceFilterList,
  );

  const handleSaveNewFilter = () => {
    dispatch(
      addPriceFilter({ fromPrice: price.fromPrice, toPrice: price.toPrice }),
    );
  };

  const handleChangePrice = (e) => {
    const { name, value } = e.target;

    setPrice((prevPrice) => ({
      ...prevPrice,
      [name]: value,
    }));
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-8">
      <span className="italic text-zinc-700 opacity-70">
        Để nhập <strong>trên</strong> một mức giá nào đó, <strong>chỉ</strong>{' '}
        nhập{' '}
        <strong className="text-lg font-bold text-primary">{'Giá từ'}</strong>{' '}
        <br />
        Để nhập <strong>dưới</strong> một mức giá nào đó, <strong>chỉ</strong>{' '}
        nhập{' '}
        <strong className="text-lg font-bold text-primary">{'Đến giá'}</strong>
      </span>
      <TextField
        variant="outlined"
        label={'Giá từ'}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">đ</InputAdornment>,
          },
        }}
        className="m-auto w-2/3"
        name="fromPrice"
        value={price.fromPrice}
        onChange={handleChangePrice}
      />

      <TextField
        variant="outlined"
        label={'Đến giá'}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">đ</InputAdornment>,
          },
        }}
        className="m-auto w-2/3"
        name="toPrice"
        value={price.toPrice}
        onChange={handleChangePrice}
      />

      <div className="flex h-4/5 w-full items-center justify-end gap-4">
        <Button onClick={() => onCancel()}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            handleSaveNewFilter();
            const newList =
              Array.isArray(priceFilterList) &&
              priceFilterList.map((item) => item._id);
            onSave('shopPriceFilter', newList);
          }}
        >
          OK
        </Button>
      </div>
    </div>
  );
};

AddPriceFilter.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddPriceFilter;
