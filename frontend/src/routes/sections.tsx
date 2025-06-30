// src/routes/AppRoutes.tsx
import { useRoutes, Outlet, RouteObject, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from 'src/context/auth-context';
import { varAlpha } from 'minimal-shared/utils';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { Box, LinearProgress, linearProgressClasses } from '@mui/material';

// Lazy imports
const DashboardPage = lazy(() => import('src/pages/dashboard'));
const WarehousePage = lazy(() => import('src/pages/warehouse/warehouse'));
const SupplierPage = lazy(() => import('src/pages/supplier/supplier'));
const UserPage = lazy(() => import('src/pages/user/user'));
const ProductsPage = lazy(() => import('src/pages/product/product'));
const OrdersPage = lazy(() => import('src/pages/order/order'));
const ProfilePage = lazy(() => import('src/pages/profile/profile'));
const CalendarPage = lazy(() => import('src/pages/calendar/calendar'));
const BlogPage = lazy(() => import('src/pages/blog'));
const SignInPage = lazy(() => import('src/pages/auth/sign-in'));
const RegisterPage = lazy(() => import('src/pages/auth/register'));
const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);


export function AppRoutes() {
  const { isAuthenticated } = useAuth();

  const baseRoutes = [
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Page404 /> },
  ];

  const authRoutes = [
    {
      path: '/',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthLayout>
          <RegisterPage />
        </AuthLayout>
      ),
    },
  ];

  const appRoutes = [
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { index: true, path: '/dashboard', element: <DashboardPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'warehouses', element: <WarehousePage /> },
        { path: 'suppliers', element: <SupplierPage /> },
        { path: 'orders', element: <OrdersPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
  ];

  const routes = isAuthenticated ? [...baseRoutes, ...appRoutes] : [...baseRoutes, ...authRoutes];
  const element = useRoutes(routes);

  return element;
}


const HomeRoute = () => {
  const { isAuthenticated } = useAuth();

  // if (loading) return renderFallback();

  return isAuthenticated ? (
    <DashboardLayout>
      <Suspense fallback={renderFallback()}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  ) : (
    <AuthLayout>
      <SignInPage />
    </AuthLayout>
  );
};



export const routesSection: RouteObject[] = [
  {
    path: '/',
    element: <HomeRoute />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'warehouses', element: <WarehousePage /> },
      { path: 'suppliers', element: <SupplierPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'blog', element: <BlogPage /> },
    ],
  },
  
  // {
  //   path: '/',
  //   element: (
  //     <AuthLayout>
  //       <SignInPage />
  //     </AuthLayout>
  //   ),
  // },
  {
    path: 'register',
    element: (
      <AuthLayout>
        <RegisterPage />
      </AuthLayout>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];


export function RoutesSelector() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // if (loading) return renderFallback();

  if (!isAuthenticated) {
    if (location.pathname === '/register') {
      return (
        <AuthLayout>
          <RegisterPage />
        </AuthLayout>
      );
    }

    if (location.pathname === '/' || location.pathname === '/login') {
      return (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      );
    }

    else{
      return(
        <Page404 />
      )
    }
  }

  // If authenticated, render dashboard layout + nested routes
  return (
    <DashboardLayout>
      <Suspense fallback={renderFallback()}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );
}

// 👇 Define the protected dashboard routes
export const protectedChildRoutes = [
  { index: true, element: <DashboardPage /> },
  { path: 'user', element: <UserPage /> },
  { path: 'products', element: <ProductsPage /> },
  { path: 'warehouses', element: <WarehousePage /> },
  { path: 'suppliers', element: <SupplierPage /> },
  { path: 'orders', element: <OrdersPage /> },
  { path: 'profile', element: <ProfilePage /> },
  { path: 'calendar', element: <CalendarPage /> },
  { path: 'blog', element: <BlogPage /> },
];

export const baseRoutes = [
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];