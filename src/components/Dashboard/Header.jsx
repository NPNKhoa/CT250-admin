import Banner from '../../assets/banners/bannerDB.jpg';

const Header = () => {
  return (
    <div>
      <div className="mb-6 flex-col items-center justify-between rounded-lg bg-white shadow-md sm:flex-row">
        <div className="relative h-64 overflow-hidden rounded-lg bg-white p-6 shadow-md">
          <img
            src={Banner}
            alt="Sport Banner"
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 z-10 bg-black opacity-25"></div>

          <div className="relative z-20 flex h-full flex-col items-start justify-center gap-3">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Chào mừng trở lại! Thể thao KTB
            </h1>
            <p className="max-w-md text-white">
              Thể thao đóng vai trò quan trọng trong việc nâng cao sức khỏe thể
              chất, tăng cường tinh thần thoải mái, thúc đẩy tinh thần đồng đội
              và tính kỷ luật
            </p>
            <button className="mt-4 rounded-lg bg-primary px-5 py-2 text-white transition hover:bg-hover-primary sm:mt-0">
              Khám phá ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
