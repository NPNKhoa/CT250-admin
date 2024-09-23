import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const BannerList = ({ banners }) => {
  return (
    <Stack spacing={4} className="m-auto w-6/7">
      {banners.map((banner, index) => (
        <Draggable draggableId={`banner-${index}`} index={index} key={index}>
          {(provided) => (
            <img
              src={banner}
              alt={banner + index}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="w-full"
            />
          )}
        </Draggable>
      ))}
    </Stack>
  );
};

BannerList.propTypes = {
  banners: PropTypes.array.isRequired,
};

export default BannerList;
