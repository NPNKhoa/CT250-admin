import { Paper } from '@mui/material';
import PriceFilterItem from './PriceFilterItem';

const priceFilterList = [
  {
    fromPrice: 0,
    toPrice: 500000,
  },
  {
    fromPrice: 500000,
    toPrice: 1000000,
  },
  {
    fromPrice: 1000000,
    toPrice: 2000000,
  },
  {
    fromPrice: 2000000,
    toPrice: 3000000,
  },
  {
    fromPrice: 3000000,
    toPrice: 3000000,
  },
];

const PriceFilterList = () => {
  return (
    <div className="m-auto w-1/2">
      <Paper elevation={2}>
        {priceFilterList.map((filter, index) => {
          let fromPrice = filter.fromPrice;
          let toPrice = filter.toPrice;

          if (fromPrice === 0) {
            fromPrice = `Dưới ${filter.toPrice}`;
            toPrice = null;
          }

          if (toPrice === fromPrice) {
            fromPrice = `Trên ${filter.toPrice}`;
            toPrice = null;
          }

          return (
            <PriceFilterItem
              key={`price-filter-${index}`}
              fromPrice={fromPrice}
              toPrice={toPrice}
            />
          );
        })}
      </Paper>
    </div>
  );
};

export default PriceFilterList;
