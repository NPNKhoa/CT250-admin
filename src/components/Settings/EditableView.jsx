import { useMemo, useRef, useState } from 'react';

import { Button, Stack, TextField, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

import JoditEditor from 'jodit-react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BannerList from './BannerList';
import PriceFilterList from './PriceFilterList';

import ActionModal from '../common/ActionModal';
import systemConfigModalContentData from '../../configs/modalContentData/SystemConfigModalContentData';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  getCurrentSystemConfig,
  updateSystemConfig,
} from '../../redux/thunk/systemConfigThunk';
import { toast } from 'react-toastify';
import { useEditMode } from '../../hooks/useEditMode';

const EditableView = () => {
  const editor = useRef(null);

  const { toggleEditMode } = useEditMode();

  const dispatch = useDispatch();

  const currentConfigs = useSelector(
    (state) => state.systemConfigs.currentConfigs,
  );
  const loading = useSelector((state) => state.systemConfigs.loading);
  const error = useSelector((state) => state.systemConfigs.error);

  const [tempImg, setTempImg] = useState({
    shopLogoImgPath: '',
    bannerImgPath: [],
  });

  const [newConfigs, setNewConfigs] = useState({
    shopLogoImgPath: currentConfigs?.shopLogoImgPath || '',
    shopName: currentConfigs?.shopName || '',
    shopEmail: currentConfigs?.shopEmail || '',
    shopPhoneNumber: currentConfigs?.shopPhoneNumber || '',
    shopIntroduction: currentConfigs?.shopIntroduction || '',
    bannerImgPath: currentConfigs?.bannerImgPath || [],
    shopPriceFilter: currentConfigs?.shopPriceFilter || [],
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalKey, setModalKey] = useState(null);

  // Handle change input logic
  const handleChangeTextField = (e) => {
    const { name, value } = e.target;

    setNewConfigs((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Change files logic
  const handleChangeModalContent = (key, value) => {
    setTempImg((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const onSaveModalContent = (key, value) => {
    setNewConfigs((prevData) => ({
      ...prevData,
      [key]: value,
    }));
    setModalKey(null);
    setOpenModal(false);
  };

  // Handle modal opening
  const handleOpenModal = (key) => {
    setModalKey(key);
    setOpenModal(true);
  };

  const handleCloseModal = (key) => {
    setTempImg((prevData) => ({
      ...prevData,
      [key]: null,
    }));
    setModalKey(null);
    setOpenModal(false);
  };

  // Handle Save Change
  const handleSaveChange = () => {
    dispatch(
      updateSystemConfig({
        ...newConfigs,
        bannerImgPath: tempImg.bannerImgPath,
      }),
    );

    if (error) return console.log('Lỗi rồiiiiiiiiiii ' + error);

    toast.success('Cập nhật thông tin thành công');

    toggleEditMode((prevState) => !prevState);

    // dispatch(getCurrentSystemConfig());
  };

  // Rich Text logic
  const handleChangeContent = (newContent) => {
    setNewConfigs((prevData) => ({
      ...prevData,
      shopIntroduction: newContent,
    }));
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder:
        newConfigs?.shopIntroduction ||
        'Nhập thông tin giới thiệu cho cửa hàng của bạn...',
    }),
    [newConfigs?.shopIntroduction],
  );

  // Drag and Drop logic
  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index == source.index
    ) {
      return;
    }

    const updatedBanner = Array.from(newConfigs?.bannerImgPath);

    const [movedBanner] = updatedBanner.splice(source.index, 1);

    updatedBanner.splice(destination.index, 0, movedBanner);

    setTempImg((prevData) => ({
      ...prevData,
      bannerImgPath: updatedBanner,
    }));
  };

  return (
    <Stack spacing={2} className="mt-2">
      <span className="italic text-zinc-700 opacity-70">
        Sau khi thay đổi thông tin click vào nút
        {' "Lưu"'} ở cuối trang để áp dụng các thay đổi
      </span>
      <div className="flex w-full items-center justify-center">
        <div className="w-1/2">
          <Typography variant="h3" gutterBottom>
            Logo cửa hàng
          </Typography>
          <div className="flex items-center justify-start gap-8">
            {loading ? (
              <img
                src={'src/assets/image_placeholder.svg'}
                alt="bla bla"
                className="h-36 w-36 rounded-full border-4 border-solid border-primary p-4"
              />
            ) : (
              <img
                src={
                  tempImg.shopLogoImgPath ||
                  'http://localhost:5000/' + currentConfigs?.shopLogoImgPath
                }
                alt="logo"
                className="h-36 w-36 rounded-full border-4 border-solid border-primary p-2"
              />
            )}
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => handleOpenModal('logo')}
            >
              Đổi Logo
            </Button>
          </div>
        </div>

        <div className="w-1/2">
          <Typography variant="h3" gutterBottom>
            Thông tin cửa hàng
          </Typography>
          <form>
            <Stack spacing={2}>
              <TextField
                label="Tên cửa hàng"
                name="shopName"
                className="w-full"
                value={newConfigs?.shopName}
                onChange={(e) => handleChangeTextField(e)}
              />
              <TextField
                label="Email liên hệ"
                name="shopEmail"
                className="w-full"
                value={newConfigs?.shopEmail}
                onChange={(e) => handleChangeTextField(e)}
              />
              <TextField
                label="Số điện thoại"
                name="shopPhoneNumber"
                className="w-full"
                value={newConfigs?.shopPhoneNumber}
                onChange={(e) => handleChangeTextField(e)}
              />
            </Stack>
          </form>
        </div>
      </div>
      <Divider />
      <div>
        <Typography variant="h3" gutterBottom>
          Giới thiệu cửa hàng
        </Typography>
        <JoditEditor
          ref={editor}
          value={currentConfigs?.shopIntroduction}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => handleChangeContent(newContent)}
        />
      </div>
      <Divider />
      <div>
        <div className="flex items-center justify-between">
          <Typography variant="h3">Banner hiện tại</Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => handleOpenModal('banners')}
          >
            Cập nhật banner
          </Button>
        </div>
        <span className="italic text-zinc-700 opacity-70">
          Bạn có thể kéo thả các ảnh để thay đổi thứ tự các banner, sau đó click{' '}
          {'"Lưu"'} để áp dụng thay đổi
        </span>
        <div className="mt-8">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="banners-droppable">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <BannerList
                    banners={
                      Array.isArray(tempImg.bannerImgPath) &&
                      tempImg.bannerImgPath.length !== 0
                        ? tempImg.bannerImgPath
                        : currentConfigs?.bannerImgPath
                    }
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <Divider />
      <div>
        <Typography variant="h3" gutterBottom>
          Cài đặt khác
        </Typography>
        <div className="ml-8">
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h4" gutterBottom>
              Bộ lọc theo giá
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleOpenModal('priceFilter')}
            >
              Thêm mới bộ lọc
            </Button>
          </div>
          <PriceFilterList priceFilterList={currentConfigs?.shopPriceFilter} />
        </div>
      </div>
      <Divider />
      <Button
        variant="contained"
        sx={{ width: '30%', m: '1rem auto 2rem !important', p: '1rem' }}
        size="large"
        onClick={handleSaveChange}
      >
        Lưu thay đổi
      </Button>

      {/* Modal component */}
      <ActionModal
        title={systemConfigModalContentData[modalKey]?.title}
        open={openModal}
        onClose={handleCloseModal}
      >
        {modalKey && (
          <>
            {systemConfigModalContentData[modalKey].content({
              onChange: handleChangeModalContent,
              onSave: onSaveModalContent,
              onCancel: handleCloseModal,
            })}
          </>
        )}
      </ActionModal>
    </Stack>
  );
};

export default EditableView;
