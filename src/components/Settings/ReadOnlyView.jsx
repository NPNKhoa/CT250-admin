import { Divider, Skeleton, Stack, Typography } from '@mui/material';

import { useSelector } from 'react-redux';

import BannerList from './BannerList';
import PriceFilterList from './PriceFilterList';
import ParagraphSkeleton from '../common/ParagraphSkeleton';

const ReadOnlyView = () => {
  const currentConfigs = useSelector(
    (state) => state.systemConfigs.currentConfigs,
  );
  const loading = useSelector((state) => state.systemConfigs.loading);

  return (
    <Stack spacing={2} className="mt-4">
      <div className="flex w-full items-center justify-center">
        <div className="w-1/2">
          <Typography variant="h3" gutterBottom>
            Logo cửa hàng
          </Typography>
          {loading ? (
            <img
              src={'src/assets/image_placeholder.svg'}
              alt="bla bla"
              className="h-36 w-36 rounded-full border-4 border-solid border-primary p-2"
            />
          ) : (
            <img
              src={'http://localhost:5000/' + currentConfigs?.shopLogoImgPath}
              alt="logo"
              className="h-36 w-36 rounded-full border-4 border-solid border-primary p-4"
            />
          )}
        </div>

        <div className="w-1/2">
          <Typography variant="h3" gutterBottom>
            Thông tin cửa hàng
          </Typography>
          <Stack spacing={1}>
            <Typography
              variant="h6"
              className="flex items-center justify-start gap-2"
            >
              <strong>Tên cửa hàng:</strong>{' '}
              {loading ? (
                <Skeleton animation="wave" width={'50%'} />
              ) : (
                currentConfigs?.shopName
              )}
            </Typography>
            <Typography
              variant="h6"
              className="flex items-center justify-start gap-2"
            >
              <strong>Email liên hệ:</strong>{' '}
              {loading ? (
                <Skeleton animation="wave" width={'50%'} />
              ) : (
                currentConfigs?.shopEmail
              )}
            </Typography>
            <Typography
              variant="h6"
              className="flex items-center justify-start gap-2"
            >
              <strong>Số điện thoại:</strong>{' '}
              {loading ? (
                <Skeleton animation="wave" width={'50%'} />
              ) : (
                currentConfigs?.shopPhoneNumber
              )}
            </Typography>
          </Stack>
        </div>
      </div>
      <Divider />
      <div>
        <Typography variant="h3" gutterBottom>
          Giới thiệu cửa hàng
        </Typography>
        {loading ? (
          <ParagraphSkeleton />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: currentConfigs?.shopIntroduction,
            }}
          ></div>
        )}
      </div>
      <Divider />
      <div>
        <Typography variant="h3">Banner hiện tại</Typography>
        <div className="mt-8">
          <BannerList banners={currentConfigs?.bannerImgPath} />
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

export default ReadOnlyView;
