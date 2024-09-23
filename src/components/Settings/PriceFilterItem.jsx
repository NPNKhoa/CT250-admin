import PropTypes from 'prop-types';

import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material';

const PriceFilterItem = ({ fromPrice, toPrice }) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-white p-4">
      <span>
        Từ {fromPrice} {toPrice && 'đến'} {toPrice}
      </span>
      <div>
        <IconButton color="info">
          <InfoIcon />
        </IconButton>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

PriceFilterItem.propTypes = {
  fromPrice: PropTypes.any,
  toPrice: PropTypes.any,
};

export default PriceFilterItem;
