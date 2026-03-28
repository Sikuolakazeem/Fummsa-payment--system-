import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense } from 'react';
import SpinnerFull from './ui/SpinnerFull';

// import LoginPage from './feature/authentication/Login';
// import SignupPage from './feature/authentication/Signup';
// import Unauthorized from './pages/Unauthorized';
// import ProtectedRoute from './ui/ProtectedRoute';
// import SpinnerFull from './ui/SpinnerFull';
//  One shared DataTables component for all approval roles
// import UserDashboard from '../../ui/UserDashboard';
//  Separate pages for VC and D-VC (view only)
// import DataTables from './feature/dashboard/DataTables';
// import ForgotPassword from './feature/authentication/Reset';
// import UpdatePassword from './pages/UpdatePassword';
// import VCDashboard from './feature/vc/VCDashboard';

const LoginPage = lazy(() => import('./feature/authentication/Login'));
const SignupPage = lazy(() => import('./feature/authentication/Signup'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const ProtectedRoute = lazy(() => import('./ui/ProtectedRoute'));
const ForgotPassword = lazy(() => import('./feature/authentication/Reset'));
const User = lazy(() => import('./feature/user/User'));
const DataTables = lazy(() => import('./feature/dashboard/DataTables'));
const UpdatePassword = lazy(() => import('./pages/UpdatePassword'));
const VCDashboard = lazy(() => import('./feature/vc/VCDashboard'));

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: '20px' }}>
          Error: {this.state.error?.message}
        </div>
      );
    }
    return this.props.children;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<SpinnerFull />}>
            <Routes>
              <Route index element={<SignupPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute
                    allowedRole={[
                      'checker',
                      'approver',
                      'auditor',
                      'bursar',
                      'admin',
                    ]}
                  >
                    <DataTables />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/vc"
                element={
                  <ProtectedRoute allowedRole={['vc', 'd-vc']}>
                    <VCDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/user"
                element={
                  <ProtectedRoute allowedRole="user">
                    <User />
                  </ProtectedRoute>
                }
              />

              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/resetpassword" element={<ForgotPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>

      <Toaster
        position="bottom-right"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-bg)',
            border: 'var(--color-border)',
            color: 'var(--color-primary)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
