import { useEffect, useState } from 'react';
import { Trash2, Pencil, CirclePlus, Delete, Import } from 'lucide-react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProductPopup from '../../components/Popup/ProductPopup';
import Promotionservice from '../../services/promotion.service';
import { toVietnamCurrencyFormat } from '../../helpers/currencyConvertion';

const PromotionPage = () => {
  const [selectedPromotions, setselectedPromotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ field: null, order: 'asc' });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPromotion, setselectedPromotion] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promotionservice.getPromotions();
        console.log(data);
        setPromotions(data);  
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách ưu đãi:', error);
      }
    };
    fetchData();
  }, []);

  const handleSelectPromotion = (id) => {
    setselectedPromotions((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((i) => i !== id)
        : [...prevSelected, id],
    );
  };

  const handleSelectAll = () => {
    setselectedPromotions((prevSelected) =>
      prevSelected.length === promotions.length
        ? []
        : promotions.map((promotion) => promotion._id),
    );
  };

  const handleSort = (field) => {
    setSortConfig((prevSortConfig) => ({
      field,
      order:
        prevSortConfig.field === field && prevSortConfig.order === 'asc'
          ? 'desc'
          : 'asc',
    }));
  };

  const handleDelete = async (id, deletemany = false) => {
    if (!deletemany) {
      const isConfirmed = window.confirm(
        'Bạn có chắc chắn muốn xóa ưu đãi này không?',
      );
      if (!isConfirmed) {
        return;
      }
    }

    try {
      await Promotionservice.deletePromotion(id);
      setPromotions((prevPromotions) =>
        prevPromotions.filter((promotion) => promotion._id !== id),
      );
    } catch (error) {
      console.error('Lỗi khi xóa ưu đãi:', error);
    }
  };

  const handleDeleteMany = (ids) => {
    const isConfirmed = window.confirm(
      'Bạn có chắc chắn muốn xóa những ưu đãi đã chọn không?',
    );
    if (!isConfirmed) {
      return;
    }
    ids.forEach((id) => {
      handleDelete(id, true);
    });
  };

  const sortedPromotions = [...promotions].sort((a, b) => {
    if (!sortConfig.field) return 0;
    if (a[sortConfig.field] < b[sortConfig.field])
      return sortConfig.order === 'asc' ? -1 : 1;
    if (a[sortConfig.field] > b[sortConfig.field])
      return sortConfig.order === 'asc' ? 1 : -1;
    return 0;
  });

  // const filteredPromotions = sortedPromotions.filter(
  //   (promotion) =>
  //     promotion.productIds.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     promotion.serviceIds.serviceName
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase()),
  // );
  const filteredPromotions = promotions;

  const { currentPage, itemsPerPage } = pagination;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPromotions.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredPromotions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        currentPage: pageNumber,
      }));
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      try {
        if (file.type === 'application/json') {
          const data = JSON.parse(fileContent);
          console.log(data); // Handle JSON data
        } else if (file.type === 'text/csv') {
          const data = fileContent.split('\n').map((row) => row.split(','));
          console.log(data); // Handle CSV data
        }
      } catch (err) {
        console.error('Error reading file:', err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-2">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ưu đãi</h1>
        <div className="ml-auto flex space-x-2">
          <div>
            <button
              className="flex items-center rounded bg-green-600 px-4 py-2 text-white"
              onClick={handleClick}
            >
              <CirclePlus strokeWidth={1} className="mr-2" />
              <span>Thêm</span>
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                <label
                  htmlFor="file-upload"
                  className="flex cursor-pointer items-center"
                >
                  <Import strokeWidth={1} className="mr-2" />
                  <span>Import từ file JSON hoặc CSV</span>
                </label>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setselectedPromotion(null);
                  setIsPopupOpen(true);
                }}
              ></MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setIsPopupOpen(true);
                }}
              >
                <CirclePlus strokeWidth={1} className="mr-2" />
                <span>Thêm ưu đãi</span>
              </MenuItem>
            </Menu>
            <input
              id="file-upload"
              type="file"
              accept=".json, .csv"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </div>
          <button
            className="flex items-center rounded bg-red-600 px-4 py-2 text-white"
            onClick={() => handleDeleteMany(selectedPromotions)}
          >
            <Delete strokeWidth={1} className="mr-2" />
            <span>
              Xóa{' '}
              {selectedPromotions.length > 0 &&
                `(${selectedPromotions.length})`}
            </span>
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          className="w-1/3 rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-500"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="ml-auto flex items-center">
          <span className="mr-2">Số dòng mỗi trang:</span>
          <select
            className="w-20 rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-500"
            value={itemsPerPage}
            onChange={(e) =>
              setPagination({
                ...pagination,
                itemsPerPage: Number(e.target.value),
              })
            }
          >
            {[5, 10].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed bg-white">
          <thead>
            <tr>
              <th className="w-2 p-2 text-center">
                <input
                  className="h-4 w-4"
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedPromotions.length === promotions.length}
                />
              </th>
              <th className="w-24 p-2 text-center">#</th>
              <th
                className="w-56 cursor-pointer whitespace-nowrap p-2 text-center"
                onClick={() => handleSort('productName')}
              >
                <div className="flex justify-between">
                  <span>Qùa tặng kèm</span>
                  {sortConfig.field === 'productName' && (
                    <span>{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="w-40 cursor-pointer whitespace-nowrap p-2 text-center"
                onClick={() => handleSort('productType')}
              >
                <div className="flex justify-between">
                  <span>Dịch vụ kèm theo</span>
                  {sortConfig.field === 'productType' && (
                    <span>{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="w-40 cursor-pointer whitespace-nowrap p-2 text-center"
                onClick={() => handleSort('productBrand')}
              >
                <div className="flex justify-between">
                  <span>Ngày bắt đầu</span>
                  {sortConfig.field === 'productBrand' && (
                    <span>{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="w-32 cursor-pointer whitespace-nowrap p-2 text-center"
                onClick={() => handleSort('quantity')}
              >
                <div className="flex justify-between">
                  <span>Ngày kết thúc</span>
                  {sortConfig.field === 'quantity' && (
                    <span>{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="w-20 cursor-pointer whitespace-nowrap p-2 text-center"
                onClick={() => handleSort('price')}
              >
                <div className="flex justify-between">
                  <span>Ngày cập nhật</span>
                  {sortConfig.field === 'price' && (
                    <span>{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="w-32 p-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((promotion, index) => (
              <tr key={index} className="border-t">
                <td className="p-2 text-center">
                  <input
                    className="h-4 w-4"
                    type="checkbox"
                    onChange={() => handleSelectPromotion(promotion._id)}
                    checked={selectedPromotions.includes(promotion._id)}
                  />
                </td>
                <td className="p-2">{index}</td>
                <td className="p-2">
                  {promotion.productIds.map((product) => (
                    <div key={product._id}>
                      <span>{product.productName}</span>
                      <br />
                    </div>
                  ))}
                </td>
                <td className="p-2">
                {promotion.serviceIds.map((service) => (
                  <div key={service._id}>
                    <span>{service.serviceName}</span>
                    <br/>
                  </div>
                ))}
                </td>
                <td className="p-2 text-center">
                  {new Date(promotion.promotionStartDate).toLocaleDateString('vi-VN')}
                </td>
                <td className="p-2 text-center">
                  {new Date(promotion.promotionExpiredDate).toLocaleDateString('vi-VN')}
                </td>
                <td className="p-2 text-center">
                  {toVietnamCurrencyFormat(new Date( promotion.updatedAt).toLocaleDateString('vi-VN'))}
                </td>
                <td className="p-2 text-center">
                  <button
                    className="mx-2"
                    // onClick={() => {
                    //   setselectedPromotion(promotion);
                    //   setIsPopupOpen(true);
                    // }}
                  >
                    <Pencil strokeWidth={1} color="green" />
                  </button>
                  <button
                    className="mx-2"
                    onClick={() => handleDelete(promotion._id)}
                  >
                    <Trash2 strokeWidth={1} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-between">
          <div className="ml-auto flex space-x-2">
            <span className="flex items-center text-sm">
              {indexOfFirstItem + 1} -{' '}
              {Math.min(indexOfLastItem, filteredPromotions.length)} of{' '}
              {filteredPromotions.length}
            </span>
            <button
              className="rounded bg-gray-200 px-3 py-1 text-gray-700"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <button
              className="rounded bg-gray-200 px-3 py-1 text-gray-700"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <ProductPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        product={selectedPromotion}
      />
      {loading && (
        <div className="flex h-16 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-dotted border-blue-400"></div>
        </div>
      )}
    </div>
  );
};

export default PromotionPage;
