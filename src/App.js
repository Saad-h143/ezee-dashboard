import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { SalesProvider } from './context/SalesContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import SalesHistory from './pages/SalesHistory';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <ProductProvider>
        <SalesProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/products" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="sales-history" element={<SalesHistory />} />
            </Route>
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </SalesProvider>
      </ProductProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
