import { useEffect, useState } from 'react';
import systemConfigService from '../../services/systemConfig.service';

import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import BannerList from './BannerList';
import PriceFilterList from './PriceFilterList';

import { toast } from 'react-toastify';
import ParagraphSkeleton from '../common/ParagraphSkeleton';

const ReadOnlyView = () => {
  const [configData, setConfigData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await systemConfigService.getConfig();
        setConfigData(data.data);
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

  const bannerImagePath = configData?.bannerImgPath?.map(
    (item) => `http://localhost:5000/${item}`,
  );

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
              className="w-1/4 rounded-full border-4 border-solid border-primary p-4"
            />
          ) : (
            <img
              src={'http://localhost:5000/' + configData?.shopLogoImgPath}
              alt="logo"
              className="w-1/4 rounded-full border-4 border-solid border-primary p-4"
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
                configData?.shopName
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
                configData?.shopEmail
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
                configData?.shopPhoneNumber
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
        <div>
          {loading ? <ParagraphSkeleton /> : configData?.shopIntroduction}
        </div>
      </div>
      <Divider />
      <div>
        <Typography variant="h3">Banner hiện tại</Typography>
        <div className="mt-8">
          <BannerList banners={bannerImagePath} />
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
          <PriceFilterList priceFilterList={configData?.shopPriceFilter} />
        </div>
      </div>
      <Divider />
    </Stack>
  );
};

export default ReadOnlyView;
