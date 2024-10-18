import ChangeLogo from '../../components/modalContents/ChangeLogo';
import ChangeBanners from '../../components/modalContents/ChangeBanners';
import AddPriceFilter from '../../components/modalContents/AddPriceFilter';
import AddCoreValue from '../../components/modalContents/AddCoreValue';
import AddFounder from '../../components/modalContents/AddFounder';

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
    content: (props) => <AddPriceFilter {...props} />,
  },
  coreValue: {
    title: 'Thêm mới Giá trị cốt lõi',
    content: (props) => <AddCoreValue {...props} />,
  },
  founder: {
    title: 'Thêm mới Giá trị cốt lõi',
    content: (props) => <AddFounder {...props} />,
  },
};

export default systemConfigModalContentData;
