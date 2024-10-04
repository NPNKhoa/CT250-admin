import PropTypes from 'prop-types';

import { Paper } from '@mui/material';
import PriceFilterItem from './PriceFilterItem';
import { toVietnamCurrencyFormat } from '../../helpers/currencyConvertion';
import { useDispatch } from 'react-redux';
import { deletePriceFilter } from '../../redux/thunk/priceFilter';
import { useState } from 'react';

const PriceFilterList = ({ priceFilterList }) => {
  const dispatch = useDispatch();

  const [list, setList] = useState(priceFilterList);

  const handleDeletePriceFilter = (id) => {
    console.log(priceFilterList);

    const updatedList =
      Array.isArray(priceFilterList) &&
      priceFilterList.filter((filter) => filter._id !== id);

    dispatch(deletePriceFilter(id));

    console.log(updatedList);
    setList(updatedList);
  };

  return (
    <div className="m-auto mb-8 w-1/2">
      <Paper elevation={4} className="p-6">
        {Array.isArray(list) &&
          list.length !== 0 &&
          list.map((filter, index) => {
            let fromPrice = filter.fromPrice;
            let toPrice = filter.toPrice;

            if (fromPrice === 0) {
              fromPrice = `Dưới ${toVietnamCurrencyFormat(filter.toPrice)}`;
              toPrice = null;
            }

            if (toPrice === fromPrice) {
              fromPrice = `Trên ${toVietnamCurrencyFormat(filter.toPrice)}`;
              toPrice = null;
            }

            const formattedItem = {
              ...filter,
              fromPrice,
              toPrice,
            };

            return (
              <PriceFilterItem
                key={`price-filter-${index}`}
                priceFilterItem={formattedItem}
                index={index}
                onDelete={handleDeletePriceFilter}
              />
            );
          })}
      </Paper>
    </div>
  );
};

PriceFilterList.propTypes = {
  priceFilterList: PropTypes.array,
};

export default PriceFilterList;
