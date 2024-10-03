import { TextField } from '@mui/material';
import ChangeLogo from '../../components/modalContents/ChangeLogo';
import ChangeBanners from '../../components/modalContents/ChangeBanners';

const systemConfigModalContentData = {
  logo: {
    title: 'Thay đổi logo cửa hàng',
    content: (props) => <ChangeLogo {...props} />,
  },
  banners: {
    title: 'Cập nhật banner',
    content: (props) => <ChangeBanners {...props} />,
  },
  priceFilter: {
    title: 'Thêm mới bộ lọc giá',
    content: (
      <div>
        <TextField label="Tên bộ lọc" />
        <TextField label="Giá trị" type="number" />
      </div>
    ),
  },
};

export default systemConfigModalContentData;
