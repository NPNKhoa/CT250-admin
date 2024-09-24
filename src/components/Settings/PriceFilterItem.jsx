import PropTypes from 'prop-types';

import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material';
import { useEditMode } from '../../hooks/useEditMode';

const PriceFilterItem = ({ fromPrice, toPrice, index }) => {
  const { isEditable } = useEditMode();

  return (
    <div
      className={`my-2 flex items-center justify-between rounded-md border border-slate-300 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-100'} p-4 shadow-md`}
    >
      <span>
        {toPrice && 'Từ'} <strong>{fromPrice}</strong> {toPrice && 'đến'}{' '}
        <strong>{toPrice}</strong>
      </span>
      {isEditable && (
        <div>
          <IconButton color="info">
            <InfoIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

PriceFilterItem.propTypes = {
  fromPrice: PropTypes.any,
  toPrice: PropTypes.any,
  index: PropTypes.number,
};

export default PriceFilterItem;
