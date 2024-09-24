import { Divider, Stack, Typography } from '@mui/material';
import BannerList from './BannerList';
import PriceFilterList from './PriceFilterList';

import banner1 from '../../assets/banners/banner1.webp';
import banner2 from '../../assets/banners/banner2.webp';
import banner3 from '../../assets/banners/banner3.webp';
import banner4 from '../../assets/banners/banner4.webp';

const bannerList = [banner1, banner2, banner3, banner4];

const ReadOnlyView = () => {
  return (
    <Stack spacing={2} className="mt-4">
      <div className="flex w-full items-center justify-center">
        <div className="w-1/2">
          <Typography variant="h3" gutterBottom>
            Logo cửa hàng
          </Typography>
          <img
            src="/logo.svg"
            alt="logo"
            className="w-1/4 rounded-full border-4 border-solid border-primary p-4"
          />
        </div>

        <div className="w-1/2">
          <Typography variant="h3" gutterBottom>
            Thông tin cửa hàng
          </Typography>
          <Stack spacing={1}>
            <Typography variant="h6">
              <strong>Tên cửa hàng:</strong> KTB Sport
            </Typography>
            <Typography variant="h6">
              <strong>Email liên hệ:</strong> ktbsport@gmail.com
            </Typography>
            <Typography variant="h6">
              <strong>Số điện thoại:</strong> 0987678962
            </Typography>
          </Stack>
        </div>
      </div>
      <Divider />
      <div>
        <Typography variant="h3" gutterBottom>
          Giới thiệu cửa hàng
        </Typography>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
          dolore. Architecto a labore quod eligendi aspernatur exercitationem
          ratione veniam id pariatur voluptates, ea perferendis cum. Dolorum
          veritatis odit consequuntur porro?
        </div>
      </div>
      <Divider />
      <div>
        <Typography variant="h3">Banner hiện tại</Typography>
        <div className="mt-8">
          <BannerList isEditing={false} banners={bannerList} />
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
          <PriceFilterList isEditing={false} />
        </div>
      </div>
      <Divider />
    </Stack>
  );
};

export default ReadOnlyView;
