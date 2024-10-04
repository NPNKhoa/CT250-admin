import PropTypes from 'prop-types';

import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material';
import { useEditMode } from '../../hooks/useEditMode';

import { toVietnamCurrencyFormat } from '../../helpers/currencyConvertion';

const PriceFilterItem = ({ priceFilterItem, index, onDelete }) => {
  const { isEditable } = useEditMode();

  return (
    <div
      className={`my-2 flex items-center justify-between rounded-md border border-slate-300 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-100'} p-4 shadow-md`}
    >
      <span>
        {priceFilterItem.toPrice && 'Từ'}{' '}
        <strong>{toVietnamCurrencyFormat(priceFilterItem.fromPrice)}</strong>{' '}
        {priceFilterItem.toPrice && 'đến'}{' '}
        <strong>{toVietnamCurrencyFormat(priceFilterItem.toPrice)}</strong>
      </span>
      {isEditable && (
        <div>
          <IconButton color="info">
            <InfoIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => onDelete(priceFilterItem._id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

PriceFilterItem.propTypes = {
  priceFilterItem: PropTypes.any,
  index: PropTypes.number,
  onDelete: PropTypes.func,
};

export default PriceFilterItem;
