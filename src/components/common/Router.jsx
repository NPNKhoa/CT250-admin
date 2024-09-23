import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { authRouter } from '../../configs/router/index.js';
import commonRouter from '../../configs/sidebarElements.jsx';
import { CommonLayout, AuthLayout } from '../../layouts/index.js';

import { LoadingPage, NotFoundPage } from '../../pages/index.js';

const Router = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <Routes>
          {commonRouter.map(({ id, path, element, childItems }) => {
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
    </Suspense>
  );
};

export default Router;
