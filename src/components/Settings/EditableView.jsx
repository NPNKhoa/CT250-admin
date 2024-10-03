import { useEffect, useMemo, useRef, useState } from 'react';

import { Button, Stack, TextField, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

import JoditEditor from 'jodit-react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BannerList from './BannerList';
import PriceFilterList from './PriceFilterList';

import systemConfigService from '../../services/systemConfig.service';
import { toast } from 'react-toastify';
import ActionModal from '../common/ActionModal';
import systemConfigModalContentData from '../../configs/modalContentData/SystemConfigModalContentData';

const EditableView = () => {
  const editor = useRef(null);

  const [loading, setLoading] = useState(true);

  const [configData, setConfigData] = useState({
    shopLogoImgPath: '',
    shopName: '',
    shopEmail: '',
    shopPhoneNumber: '',
    bannerImgPath: [],
    shopPriceFilter: [],
    shopIntroduction: '',
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalKey, setModalKey] = useState(null);

  // Handle change input logic
  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);

    setConfigData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle modal opening
  const handleOpenModal = (key) => {
    setModalKey(key);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalKey(null);
  };

  // Handle Save Change
  const handleSaveChange = () => {
    console.log(configData);
  };

  // Fetching Data logic
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await systemConfigService.getConfig();

        setConfigData({
          shopLogoImgPath: data.data.shopLogoImgPath,
          shopName: data.data.shopName,
          shopEmail: data.data.shopEmail,
          shopPhoneNumber: data.data.shopPhoneNumber,
          bannerImgPath: data.data.bannerImgPath,
          shopPriceFilter: data.data.shopPriceFilter,
          shopIntroduction: data.data.shopIntroduction,
        });
      } catch (err) {
        console.log(err);
        toast.error('Lỗi khi tải cấu hình!');
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  // Rich Text logic
  const handleChangeContent = (newContent) => {
    setConfigData((prevData) => ({
      ...prevData,
      shopIntroduction: newContent,
    }));
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder:
        configData?.shopIntroduction ||
        'Nhập thông tin giới thiệu cho cửa hàng của bạn...',
    }),
    [configData?.shopIntroduction],
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

    const updatedBanner = Array.from(configData?.bannerImgPath);

    const [movedBanner] = updatedBanner.splice(source.index, 1);

    updatedBanner.splice(destination.index, 0, movedBanner);

    setConfigData((prevData) => ({
      ...prevData,
      bannerImgPath: updatedBanner,
    }));
  };

  return (
    <Stack spacing={2} className="mt-2">
      <span className="italic text-zinc-700 opacity-70">
        Sau khi thay đổi thông tin click vào nút
        {'"Lưu"'} ở cuối trang để áp dụng các thay đổi
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
                className="w-1/4 rounded-full border-4 border-solid border-primary p-4"
              />
            ) : (
              <img
                src={'http://localhost:5000/' + configData?.shopLogoImgPath}
                alt="logo"
                className="w-1/4 rounded-full border-4 border-solid border-primary p-4"
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
                value={configData?.shopName}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                label="Email liên hệ"
                name="shopEmail"
                className="w-full"
                value={configData?.shopEmail}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                label="Số điện thoại"
                name="shopPhoneNumber"
                className="w-full"
                value={configData?.shopPhoneNumber}
                onChange={(e) => handleChange(e)}
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
          value={configData?.shopIntroduction}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => handleChangeContent(newContent)}
          // onChange={(newContent) => {
          //   // handleChangeContent(newContent);
          // }}
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
                  <BannerList banners={configData?.bannerImgPath} />
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
          <PriceFilterList priceFilterList={configData?.shopPriceFilter} />
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
        {modalKey && <>{systemConfigModalContentData[modalKey].content}</>}
      </ActionModal>
    </Stack>
  );
};

export default EditableView;
