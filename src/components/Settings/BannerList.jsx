import { Stack } from '@mui/material';
import PropTypes from 'prop-types';

const BannerList = ({ banners }) => {
  return (
    <Stack spacing={4} className="m-auto w-6/7">
      {Array.isArray(banners) &&
        banners.length !== 0 &&
        banners.map((banner, index) => {
          {
            return (
              banner.isActiveBanner && (
                <img
                  src={`http://localhost:5000/${banner.bannerImgPath}`}
                  alt={'banner' + index}
                  className="w-full"
                />
              )
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
