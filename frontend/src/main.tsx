import 'react-toastify/dist/ReactToastify.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';

import App from './app';
import { AppRoutes, RoutesSelector, baseRoutes, protectedChildRoutes } from './routes/sections';
import { ErrorBoundary } from './routes/components';
import { AuthProvider } from './context/auth-context';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'src/theme/theme-provider';
// ----------------------------------------------------------------------

// const router = createBrowserRouter([
//   {
//     Component: () => (
//       <AuthProvider>
//         {/* <ThemeProvider> */}
//         <App>
//           <Outlet />
//           <ToastContainer
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="colored"
//           />
//         </App>
//         {/* </ThemeProvider> */}
//       </AuthProvider>
//     ),
//     errorElement: <ErrorBoundary />,
//     children: [
//       {
//         path: '/',
//         element: <RoutesSelector />,
//         children: protectedChildRoutes,
//       },
//       ...baseRoutes
//     ],
//   },
// ]);

const root = createRoot(document.getElementById('root')!);

// root.render(
//   <StrictMode>
//     {/* <ThemeProvider> */}
//       <RouterProvider router={router}></RouterProvider>
//     {/* </ThemeProvider> */}
//   </StrictMode>
// );



root.render(
  <StrictMode>
      <BrowserRouter>
      <AuthProvider>
          <App>
            <AppRoutes />
            <ToastContainer
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </App>
        </AuthProvider>
      </BrowserRouter>
  </StrictMode>
);

