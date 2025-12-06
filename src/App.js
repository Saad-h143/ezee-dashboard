import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <ProductProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            {/* <Route path="dashboard" element={<Dashboard />} /> */}
            <Route path="products" element={<Products />} />
            {/* <Route path="analytics" element={<Analytics />} /> */}
            {/* <Route path="settings" element={<Settings />} /> */}
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </ProductProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
