import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Notification from '../common/Notification';
import { useProducts } from '../../context/ProductContext';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { notification } = useProducts();

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Notification notification={notification} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <main className={`flex-1 transition-all duration-300 ml-0 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
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
