import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { authRouter } from '../../configs/router/index.js';
import useRoutes from '../../configs/sidebarElements.jsx'; // Import từ file useRoutes
import { CommonLayout, AuthLayout } from '../../layouts/index.js';

import { NotFoundPage } from '../../pages/index.js';
import { useSelector } from 'react-redux';

const Router = () => {
  const userExist = useSelector((state) => state.users?.user);
  const userRole = userExist?.role.role;
  const commonRouter = useRoutes();

  return (
    <BrowserRouter>
      <Routes>
        {commonRouter.map(({ id, path, element, childItems }) => {
          // Kiểm tra vai trò người dùng cho các route cụ thể
          const isAdminRoute = path === '/user' || path === '/settings';
          const isAdmin = userRole === 'admin';

          // Nếu là route admin và người dùng không phải là admin thì ẩn route này
          if (isAdminRoute && !isAdmin) {
            return null; // Không render route nếu không phải admin
          }

          return (
            <>
              <Route
                key={id}
                path={path}
                element={<CommonLayout>{element}</CommonLayout>}
              />
              {childItems?.length > 0 &&
                childItems.map(({ childId, path, element }) => {
                  return (
                    <Route
                      key={childId}
                      path={path}
                      element={<CommonLayout>{element}</CommonLayout>}
                    />
                  );
                })}
            </>
          );
        })}

        {authRouter.map(({ id, path, element }) => (
          <Route
            key={id}
            path={path}
            element={<AuthLayout>{element}</AuthLayout>}
          />
        ))}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
