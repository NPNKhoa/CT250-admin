import ChangeLogo from '../../components/modalContents/ChangeLogo';
import ChangeBanners from '../../components/modalContents/ChangeBanners';
import AddPriceFilter from '../../components/modalContents/AddPriceFilter';

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
};

export default systemConfigModalContentData;
