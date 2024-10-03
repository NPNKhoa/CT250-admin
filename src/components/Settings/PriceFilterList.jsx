import PropTypes from 'prop-types';

import { Paper } from '@mui/material';
import PriceFilterItem from './PriceFilterItem';
import { toVietnamCurrencyFormat } from '../../helpers/currencyConvertion';

const PriceFilterList = ({ priceFilterList }) => {
  return (
    <div className="m-auto mb-8 w-1/2">
      <Paper elevation={4} className="p-6">
        {Array.isArray(priceFilterList) &&
          priceFilterList.length !== 0 &&
          priceFilterList.map((filter, index) => {
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

            return (
              <PriceFilterItem
                key={`price-filter-${index}`}
                fromPrice={fromPrice}
                toPrice={toPrice}
                index={index}
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
