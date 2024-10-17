import { useEffect, useMemo, useState } from 'react';
import UserService from '../../services/user.service'; // Import UserService
import TableComponent from '../../components/common/TableComponent';
import ActionHeader from '../../components/common/ActionHeader';
import { Eye } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleViewDetails = async (user) => {
    console.log('User Data: ', user);
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };
  console.log(selectedUser);
  const handleAssignRole = () => {
    // Xử lý logic phân quyền ở đây
    console.log(`Phân quyền cho người dùng: ${selectedUser.fullname}`);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const response = await UserService.getAllUsers();
        const formattedUsers = response.data.map((user, index) => ({
          id: index + 1,
          avatar: user.avatarImagePath,
          fullname: user.fullname,
          email: user.email,
          role: user.role.role,
          createdAt: new Date(user.createdAt).toLocaleDateString('vi-VN'),
        }));
        setUsers(formattedUsers);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const rows = useMemo(
    () =>
      users.map((user, index) => ({
        id: index + 1,
        ...user,
        action: (
          <button
            onClick={() => handleViewDetails(user)}
            className="btn btn-primary"
          >
            Xem chi tiết
          </button>
        ),
      })),
    [users],
  );

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        flex: 0.5,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'avatar',
        headerName: 'Ảnh đại diện',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
          <img
            src={
              params.row.avatar.startsWith('http')
                ? params.row.avatar
                : `http://localhost:5000/${params.row.avatar.replace(/\\/g, '/')}`
            }
            alt="avatar"
            className="h-10 w-10 rounded-full"
          />
        ),
      },
      {
        field: 'fullname',
        headerName: 'Họ và tên',
        flex: 1,
        headerAlign: 'center',
        align: 'left',
      },
      {
        field: 'email',
        headerName: 'Email',
        flex: 2,
        headerAlign: 'center',
        align: 'left',
      },
      {
        field: 'role',
        headerName: 'Vai trò',
        flex: 1,
        headerAlign: 'center',
        align: 'left',
      },
      {
        field: 'createdAt',
        headerName: 'Ngày tạo',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'action',
        headerName: 'Thao tác',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
          <button onClick={() => handleViewDetails(params.row)}>
            <Eye className="text-primary" />
          </button>
        ),
      },
    ],
    [],
  );

  const paginationModel = { page: 0, pageSize: 5 };

  const roles = [
    { id: 1, name: 'Quản trị viên' },
    { id: 2, name: 'Khách hàng' },
    { id: 3, name: 'Nhân viên' },
    // Thêm các vai trò khác nếu cần
  ];

  return (
    <div>
      <ActionHeader title="Quản lý người dùng" />
      <TableComponent
        loading={loading}
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        handleSelected={() => {}}
      />

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="max-h-[90vh] w-1/2 overflow-y-auto rounded-lg bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-gray-800">
                Thông tin người dùng
              </h3>
              <button
                onClick={handleCloseModal}
                className="rounded bg-orange-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-orange-600"
              >
                Đóng
              </button>
            </div>

            <div className="mb-4 flex items-center">
              <img
                src={
                  selectedUser.avatar.startsWith('http')
                    ? selectedUser.avatar
                    : `http://localhost:5000/${selectedUser.avatar.replace(/\\/g, '/')}`
                }
                alt="avatar"
                className="mr-4 h-20 w-20 rounded-full"
              />
              <div>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center">
                    <strong className="w-24 text-gray-800">ID:</strong>
                    <span className="text-gray-600">{selectedUser.id}</span>
                  </div>

                  <div className="flex items-center">
                    <strong className="w-24 text-gray-800">Họ và tên:</strong>
                    <span className="text-gray-600">
                      {selectedUser.fullname}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <strong className="w-24 text-gray-800">Email:</strong>
                    <span className="text-gray-600">{selectedUser.email}</span>
                  </div>

                  <div className="flex items-center">
                    <strong className="w-24 text-gray-800">Vai trò:</strong>
                    <select
                      value={selectedUser?.role || ''}
                      onChange={(e) => handleRoleChange(e.target.value)}
                      className="ml-2 rounded border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center">
                    <strong className="w-24 text-gray-800">Ngày tạo:</strong>
                    <span className="text-gray-600">
                      {selectedUser.createdAt}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleAssignRole}
              className="mt-4 rounded bg-primary px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-hover-primary"
            >
              Lưu vai trò
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
