import { useState } from 'react';
import { Trash2, Pencil, CirclePlus, Delete, Import } from 'lucide-react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProductPopup from '../../components/Product/ProductPopup';

const products = [
  {
    image:
      'https://cdn.shopvnb.com/uploads/san_pham/tui-vot-cau-long-kason-qbt1333-2010-1.webp',
    name: 'Túi Vợt Cầu Lông Kason QBT1333-2010',
    type: 'Túi vợt cầu lông',
    brand: 'Kason',
    price: 18.0,
  },
  {
    image:
      'https://cdn.shopvnb.com/uploads/san_pham/tui-dung-vot-cau-long-kason-fbjk022-2000-do-3.webp',
    name: 'Túi Đựng Vợt Cầu Lông Kason FBJK022-2000 Đỏ',
    type: 'Túi vợt cầu lông',
    brand: 'Kason',
    price: 24.0,
  },
  // Add more products here...
];

const ProductPage = () => {
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
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
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
              ></MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setIsPopupOpen(true);
                }}
              >
                <CirclePlus strokeWidth={1} className="mr-2" />
                <span>Thêm sản phẩm</span>
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
                  checked={selectedProducts.length === products.length}
                />
              </th>
              <th className="w-24 p-2 text-center">Hình ảnh</th>
              <th
                className="w-56 cursor-pointer whitespace-nowrap p-2 text-center"
                onClick={() => handleSort('name')}
              >
                <div className="flex justify-between">
                  <span>Tên sản phẩm</span>
                  {sortConfig.field === 'name' && (
                    <span>{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="w-40 cursor-pointer whitespace-nowrap p-2 text-center"
                onClick={() => handleSort('type')}
              >
                <div className="flex justify-between">
                  <span>Loại sản phẩm</span>
                  {sortConfig.field === 'type' && (
                    <span>{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="w-40 cursor-pointer whitespace-nowrap p-2 text-center"
                onClick={() => handleSort('brand')}
              >
                <div className="flex justify-between">
                  <span>Thương hiệu</span>
                  {sortConfig.field === 'brand' && (
                    <span>{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="w-32 cursor-pointer whitespace-nowrap p-2 text-center"
                onClick={() => handleSort('quantity')}
              >
                <div className="flex justify-between">
                  <span>Số lượng</span>
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
                  <span>Giá</span>
                  {sortConfig.field === 'price' && (
                    <span>{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="w-32 p-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="p-2 text-center">
                  <input
                    className="h-4 w-4"
                    type="checkbox"
                    onChange={() => handleSelectProduct(index)}
                    checked={selectedProducts.includes(index)}
                  />
                </td>
                <td className="p-2 text-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 object-contain"
                  />
                </td>
                <td className="p-2">{product.name}</td>
                <td className="p-2 text-center">{product.type}</td>
                <td className="p-2 text-center">{product.brand}</td>
                <td className="p-2 text-center">{product.quantity || 0}</td>
                <td className="p-2 text-center">${product.price.toFixed(2)}</td>
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
        <div className="mt-4 flex items-center justify-between">
          <div className="ml-auto flex space-x-2">
            <span className="flex items-center text-sm">
              {indexOfFirstItem + 1} -{' '}
              {Math.min(indexOfLastItem, filteredProducts.length)} of{' '}
              {filteredProducts.length}
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
        product={selectedProduct}
      />
    </div>
  );
};

export default ProductPage;
