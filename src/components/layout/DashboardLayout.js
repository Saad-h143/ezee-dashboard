import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Notification from '../common/Notification';
import { useProducts } from '../../context/ProductContext';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { notification } = useProducts();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Notification notification={notification} />
      <Sidebar isOpen={sidebarOpen} />

      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Outlet context={{ searchTerm, setSearchTerm }} />
      </main>
    </div>
  );
};

export default DashboardLayout;
