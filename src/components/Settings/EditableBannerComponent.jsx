import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalConfirmDelete from '../common/ConfirmationDeleteModal';
import { useDispatch } from 'react-redux';
import { updateActiveBanners } from '../../redux/thunk/systemConfigThunk';

const EditableBannerComponent = ({ banners }) => {
  const dispatch = useDispatch();

  const initialActiveBanners = useMemo(
    () =>
      Array.isArray(banners) &&
      banners.length !== 0 &&
      banners.filter((banner) => banner.isActiveBanner === true),
    [banners],
  );

  const initialOldBanners = useMemo(
    () =>
      Array.isArray(banners) &&
      banners.length !== 0 &&
      banners.filter((banner) => banner.isActiveBanner === false),
    [banners],
  );

  const [activeBanners, setActiveBanners] = useState([]);
  const [oldBanners, setOldBanners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  useEffect(() => {
    setActiveBanners(initialActiveBanners);
    setOldBanners(initialOldBanners);
  }, [initialActiveBanners, initialOldBanners]);

  // Xử lý kéo thả
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Nếu không có đích đến, thoát hàm
    if (!destination) return;

    // Nếu kéo thả trong cùng một khu vực, gọi reorder
    if (source.droppableId === destination.droppableId) {
      console.log(source.droppableId);
      const items = reorder(
        source.droppableId === 'activeBanners' ? activeBanners : oldBanners,
        source.index,
        destination.index,
      );

      if (source.droppableId === 'activeBanners') {
        setActiveBanners(items);
      } else {
        setOldBanners(items);
      }
    } else {
      // Nếu kéo thả từ một danh sách sang danh sách khác
      const result = move(
        source.droppableId === 'activeBanners' ? activeBanners : oldBanners,
        source.droppableId === 'activeBanners' ? oldBanners : activeBanners,
        source,
        destination,
      );

      // Cập nhật cả hai state
      setActiveBanners(result.active);
      dispatch(
        updateActiveBanners({ actives: result.active, olds: result.old }),
      );
      setOldBanners(result.old);
    }
  };

  const handleOpenDeleteModal = (banner) => {
    setBannerToDelete(banner);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setBannerToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (bannerToDelete.isActiveBanner) {
      setActiveBanners(
        activeBanners.filter((banner) => banner._id !== bannerToDelete._id),
      );
    } else {
      setOldBanners(
        oldBanners.filter((banner) => banner._id !== bannerToDelete._id),
      );
    }
    handleCloseModal();
  };

  return (
    <div className="mt-8">
      <DragDropContext onDragEnd={onDragEnd}>
        <h2 className="mb-2 text-lg font-semibold">Active Banners</h2>
        <Droppable droppableId="activeBanners" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex space-x-4 rounded-md border border-gray-300 p-4"
            >
              {Array.isArray(activeBanners) &&
                activeBanners?.map((banner, index) => (
                  <Draggable
                    key={banner._id}
                    draggableId={banner._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="relative flex w-48 items-center justify-center rounded-md bg-blue-200 shadow-md"
                      >
                        <img
                          src={`http://localhost:5000/${banner.bannerImgPath}`}
                          alt={'banner' + index}
                          className="w-full"
                        />
                        <IconButton
                          onClick={() => handleOpenDeleteModal(banner)}
                          sx={{
                            position: 'absolute',
                            top: '0.5rem',
                            right: '0.5rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            color: 'red',
                            '&:hover': {
                              backgroundColor: 'darkred',
                              color: 'white',
                            },
                          }}
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <h2 className="mb-2 text-lg font-semibold">Old Banners</h2>
        <Droppable droppableId="oldBanners" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex space-x-4 rounded-md border border-gray-300 p-4"
            >
              {Array.isArray(oldBanners) &&
                oldBanners?.map((banner, index) => (
                  <Draggable
                    key={banner._id}
                    draggableId={banner._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="relative flex w-48 items-center justify-center rounded-md bg-gray-200 shadow-md"
                      >
                        <img
                          src={`http://localhost:5000/${banner.bannerImgPath}`}
                          alt={'banner' + index}
                          className="w-full"
                        />
                        <IconButton
                          onClick={() => handleOpenDeleteModal(banner)}
                          sx={{
                            position: 'absolute',
                            top: '0.5rem',
                            right: '0.5rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            color: 'red',
                            '&:hover': {
                              backgroundColor: 'darkred',
                              color: 'white',
                            },
                          }}
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {bannerToDelete && (
        <ModalConfirmDelete
          open={modalOpen}
          handleClose={handleCloseModal}
          handleConfirm={handleConfirmDelete}
          itemName={'banner'}
        />
      )}
    </div>
  );
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Hàm move để di chuyển giữa 2 danh sách
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);

  // Tạo một bản sao mới của đối tượng để đảm bảo nó không read-only
  const removed = { ...sourceClone.splice(droppableSource.index, 1)[0] };

  // Cập nhật thuộc tính isActiveBanner cho bản sao mới
  if (droppableSource.droppableId === 'activeBanners') {
    removed.isActiveBanner = false; // Chuyển từ active sang old
  } else {
    removed.isActiveBanner = true; // Chuyển từ old sang active
  }

  destClone.splice(droppableDestination.index, 0, removed);

  // Trả về 2 danh sách mới đã cập nhật
  return {
    active:
      droppableSource.droppableId === 'activeBanners'
        ? sourceClone // Nếu kéo từ activeBanners, cập nhật activeBanners bằng sourceClone
        : destClone, // Nếu kéo từ oldBanners, cập nhật activeBanners bằng destClone
    old:
      droppableSource.droppableId === 'activeBanners'
        ? destClone // Nếu kéo từ activeBanners, cập nhật oldBanners bằng destClone
        : sourceClone, // Nếu kéo từ oldBanners, cập nhật oldBanners bằng sourceClone
  };
};

EditableBannerComponent.propTypes = {
  banners: PropTypes.array,
};

export default EditableBannerComponent;
