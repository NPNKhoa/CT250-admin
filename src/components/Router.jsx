import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { commonRouter, authRouter } from '../router';
import { CommonLayout, AuthLayout } from '../layouts';

import { LoadingPage, NotFoundPage } from '../pages';

const Router = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <Routes>
          {commonRouter.map(({ id, path, element }) => (
            <Route
              key={id}
              path={path}
              element={<CommonLayout>{element}</CommonLayout>}
            />
          ))}

          {authRouter.map(({ id, path, element }) => (
            <Route
              key={id}
              path={path}
              element={<AuthLayout>{element}</AuthLayout>}
            />
          ))}

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
