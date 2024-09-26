import { useState } from 'react';
import { Trash2, Pencil, CirclePlus } from 'lucide-react';

const ProductTable = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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

  const handleSelectProduct = (index) => {
    const newSelectedProducts = [...selectedProducts];
    if (newSelectedProducts.includes(index)) {
      const indexToRemove = newSelectedProducts.indexOf(index);
      newSelectedProducts.splice(indexToRemove, 1);
    } else {
      newSelectedProducts.push(index);
    }
    setSelectedProducts(newSelectedProducts);
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((_, index) => index));
    }
  };

  const handleSort = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortField) return 0;
    if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const optionNumbers = [5, 10];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sản phẩm</h1>
        <button className="flex items-center rounded bg-green-600 px-4 py-2 text-white">
          <CirclePlus strokeWidth={1} className="mr-2" />
          <span>Thêm sản phẩm</span>
        </button>
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
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            {optionNumbers.map((number) => (
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
            <tr className="text-left">
              <th className="w-10 px-4 py-2">
                <input
                  className="h-4 w-4"
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedProducts.length === products.length}
                />
              </th>
              <th className="w-24 px-4 py-2">Hình ảnh</th>
              <th
                className="w-48 cursor-pointer whitespace-nowrap px-4 py-2"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center justify-between text-nowrap">
                  <span>Tên sản phẩm</span>
                  {sortField === 'name' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="w-32 cursor-pointer whitespace-nowrap px-4 py-2"
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center justify-between">
                  <span>Loại sản phẩm</span>
                  {sortField === 'type' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="w-32 cursor-pointer whitespace-nowrap px-4 py-2"
                onClick={() => handleSort('brand')}
              >
                <div className="flex items-center justify-between">
                  <span>Thương hiệu</span>
                  {sortField === 'brand' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="w-20 cursor-pointer whitespace-nowrap px-4 py-2"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center justify-between">
                  <span>Giá</span>
                  {sortField === 'price' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="w-24 px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">
                  <input
                    className="h-4 w-4"
                    type="checkbox"
                    onChange={() => handleSelectProduct(index)}
                    checked={selectedProducts.includes(index)}
                  />
                </td>
                <td className="px-4 py-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 object-contain"
                  />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.type}</td>
                <td className="px-4 py-2">{product.brand}</td>
                <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <button
                    className="mx-2"
                    onClick={() => alert('Thêm sản phẩm')}
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
    </div>
  );
};

export default ProductTable;
