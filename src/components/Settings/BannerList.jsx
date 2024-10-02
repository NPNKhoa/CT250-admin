import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { useEditMode } from '../../hooks/useEditMode';

const BannerList = ({ banners }) => {
  const { isEditable } = useEditMode();

  return (
    <Stack spacing={4} className="m-auto w-6/7">
      {Array.isArray(banners) &&
        banners.length !== 0 &&
        banners.map((banner, index) => {
          {
            return isEditable ? (
              <Draggable
                draggableId={`banner-${index}`}
                index={index}
                key={index}
              >
                {(provided) => (
                  <img
                    src={`http://localhost:5000/${banner}`}
                    alt={banner + index}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="w-full"
                  />
                )}
              </Draggable>
            ) : (
              <img
                src={`http://localhost:5000/${banner}`}
                alt={'banner' + index}
                className="w-full"
              />
            );
          }
        })}
    </Stack>
  );
};

BannerList.propTypes = {
  banners: PropTypes.array,
};

export default BannerList;
