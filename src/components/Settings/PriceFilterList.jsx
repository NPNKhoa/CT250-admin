import { Paper } from '@mui/material';
import PriceFilterItem from './PriceFilterItem';
import { toVietnamCurrencyFormat } from '../../helpers/currencyConvertion';
import { useDispatch } from 'react-redux';
import {
  deletePriceFilter,
  getPriceFilters,
} from '../../redux/thunk/priceFilter';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const PriceFilterList = () => {
  const dispatch = useDispatch();

  const priceFilterList = useSelector(
    (state) => state.priceFilters.priceFilterList,
  );

  const handleDeletePriceFilter = (id) => {
    dispatch(deletePriceFilter(id));
  };

  useEffect(() => {
    dispatch(getPriceFilters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="m-auto mb-8 w-1/2">
      <Paper elevation={4} className="p-6">
        {Array.isArray(priceFilterList) &&
          priceFilterList.length !== 0 &&
          priceFilterList.map((filter, index) => {
            let fromPrice = filter?.fromPrice;
            let toPrice = filter?.toPrice;

            if (!fromPrice) {
              fromPrice = `Dưới ${toVietnamCurrencyFormat(filter?.toPrice)}`;
              toPrice = null;
            } else if (!toPrice) {
              fromPrice = `Trên ${toVietnamCurrencyFormat(filter?.fromPrice)}`;
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

export default PriceFilterList;
