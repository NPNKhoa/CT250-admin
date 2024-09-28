import { useState } from 'react';
import { Trash2, Pencil, CirclePlus, Delete, Import } from 'lucide-react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProductPopup from '../../components/Product/ProductPopup';

const products = [
  {
    _id: '66ca9dc92e0cf6b9be6806a0',
    discountPercent: 15,
    discountStartDate: '2024-10-01T15:00:00.000Z',
    discountExpiredDate: '2024-10-25T15:00:00.000Z',
  },
  {
    _id: '66ca9dc92e0cf6b9be6806a1',
    price: 24.0,
    discountPercent: 10,
    discountStartDate: '2024-10-10T15:00:00.000Z',
    discountExpiredDate: '2024-10-30T15:00:00.000Z',
  },
  {
    _id: '66ca9dc92e0cf6b9be6806a2',
    discountPercent: 5,
    discountStartDate: '2024-10-05T15:00:00.000Z',
    discountExpiredDate: '2024-11-01T15:00:00.000Z',
  },
  // Thêm nhiều sản phẩm khác nếu cần...
];

const DiscountPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ field: null, order: 'asc' });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const open = Boolean(anchorEl);

  const handleSelectProduct = (index) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index],
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts((prevSelected) =>
      prevSelected.length === products.length
        ? []
        : products.map((_, index) => index),
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

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig.field) return 0;
    if (a[sortConfig.field] < b[sortConfig.field])
      return sortConfig.order === 'asc' ? -1 : 1;
    if (a[sortConfig.field] > b[sortConfig.field])
      return sortConfig.order === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.discountPercent.toString().includes(searchTerm) ||
      product.discountStartDate.includes(searchTerm) ||
      product.discountExpiredDate.includes(searchTerm) ||
      product._id.includes(searchTerm),
  );

  const { currentPage, itemsPerPage } = pagination;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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
        <h1 className="text-2xl font-bold">Sản phẩm</h1>
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
                  setSelectedProduct(null);
                  setIsPopupOpen(true);
                }}
              >
                <CirclePlus strokeWidth={1} className="mr-2" />
                <span>Thêm giảm giá</span>
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
            onClick={() => alert('Xoa')}
          >
            <Delete strokeWidth={1} className="mr-2" />
            <span>Xóa</span>
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
          <span className="mr-2">Số sản phẩm mỗi trang:</span>
          <select
            className="w-20 rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-500"
            value={pagination.itemsPerPage}
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
                  checked={selectedProducts.length === products.length}
                />
              </th>
              <th className="w-10 p-2 text-center">STT</th> {/* Cột STT */}
              <th className="w-36 p-2 text-center">ID</th> {/* Cột ID */}
              <th
                className="w-36 cursor-pointer whitespace-nowrap p-2 text-center"
                onClick={() => handleSort('discountPercent')}
              >
                <div className="flex justify-center">
                  <span>Giảm giá (%)</span>
                  {sortConfig.field === 'discountPercent' && (
                    <span>{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="w-36 cursor-pointer whitespace-nowrap p-2 text-center"
                onClick={() => handleSort('discountStartDate')}
              >
                <div className="flex justify-center">
                  <span>Ngày bắt đầu</span>
                  {sortConfig.field === 'discountStartDate' && (
                    <span>{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="w-36 cursor-pointer whitespace-nowrap p-2 text-center"
                onClick={() => handleSort('discountExpiredDate')}
              >
                <div className="flex justify-center">
                  <span>Ngày hết hạn</span>
                  {sortConfig.field === 'discountExpiredDate' && (
                    <span>{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="w-24 p-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product, index) => (
              <tr key={product._id}>
                <td className="text-center">
                  <input
                    className="h-4 w-4"
                    type="checkbox"
                    checked={selectedProducts.includes(index)}
                    onChange={() => handleSelectProduct(index)}
                  />
                </td>
                <td className="text-center">{indexOfFirstItem + index + 1}</td>
                <td className="text-center">{product._id}</td>
                <td className="text-center">{product.discountPercent}</td>
                <td className="text-center">
                  {new Date(product.discountStartDate).toLocaleDateString()}
                </td>
                <td className="text-center">
                  {new Date(product.discountExpiredDate).toLocaleDateString()}
                </td>
                <td className="p-2 text-center">
                  <button
                    className="mx-2"
                    // onClick={() => {
                    //   setSelectedProduct(product);
                    //   setIsPopupOpen(true);
                    // }}
                  >
                    <Pencil strokeWidth={1} color="green" />
                  </button>
                  <button
                    className="mx-2"
                    onClick={() => alert('Xóa sản phẩm')}
                  >
                    <Trash2 strokeWidth={1} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="rounded bg-gray-300 px-4 py-2"
        >
          Trang trước
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="rounded bg-gray-300 px-4 py-2"
        >
          Trang sau
        </button>
      </div>

      {isPopupOpen && (
        <ProductPopup
          product={selectedProduct}
          onClose={() => {
            setIsPopupOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default DiscountPage;
