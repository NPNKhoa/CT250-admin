import { useMemo, useRef, useState } from 'react';

import { Button, Stack, TextField, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

import JoditEditor from 'jodit-react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BannerList from './BannerList';
import PriceFilterList from './PriceFilterList';

import banner1 from '../../assets/banners/banner1.webp';
import banner2 from '../../assets/banners/banner2.webp';
import banner3 from '../../assets/banners/banner3.webp';
import banner4 from '../../assets/banners/banner4.webp';

const bannerList = [banner1, banner2, banner3, banner4];

const EditableView = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [banners, setBanners] = useState(bannerList);

  const handleChangeContent = (newContent) => {
    setContent(newContent);
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Nhập thông tin giới thiệu cho cửa hàng của bạn...',
    }),
    [],
  );

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

    const updatedBanner = Array.from(banners);

    const [movedBanner] = updatedBanner.splice(source.index, 1);

    updatedBanner.splice(destination.index, 0, movedBanner);

    setBanners(updatedBanner);
  };

  return (
    <Stack spacing={2}>
      <div className="flex w-full items-center justify-center">
        <div className="w-1/2">
          <Typography variant="h3" gutterBottom>
            Logo cửa hàng
          </Typography>
          <div className="flex items-center justify-start gap-8">
            <img
              src="/logo.svg"
              alt="logo"
              className="w-1/4 rounded-full border-4 border-solid border-primary p-4"
            />
            <Button variant="contained" size="large" color="primary">
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
              <TextField label="Tên cửa hàng" className="w-full" />
              <TextField label="Email liên hệ" className="w-full" />
              <TextField label="Số điện thoại" className="w-full" />
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
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => {
            handleChangeContent(newContent);
          }}
        />
      </div>
      <Divider />
      <div>
        <Typography variant="h3">Banner hiện tại</Typography>
        <span className="italic text-zinc-900 opacity-80">
          Bạn có thể kéo thả các ảnh để thay đổi thứ tự các banner, sau đó click{' '}
          {'"Lưu"'} để áp dụng thay đổi
        </span>
        <div className="mt-8">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="banners-droppable">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <BannerList banners={banners} />
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
          <Typography variant="h4" gutterBottom>
            Bộ lọc theo giá
          </Typography>
          <PriceFilterList />
        </div>
      </div>
      <Divider />
    </Stack>
  );
};

export default EditableView;
