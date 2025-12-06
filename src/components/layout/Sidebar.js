import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, BarChart2, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
// Import logo - place your ezee.png in src/assets folder
import logo from '../../assets/Ezee.png';

const navItems = [
  // { path: '/dashboard', icon: Home, label: 'Dashboard' },
  { path: '/products', icon: ShoppingCart, label: 'Products' },
  // { path: '/analytics', icon: BarChart2, label: 'Analytics' },
  // { path: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:translate-x-0 md:w-20'}
        bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen transition-all duration-300
        fixed left-0 top-0 z-50
      `}>
      <div className="p-4">
        <div className="flex items-center mb-8">
          <img src={logo} alt="Ezee Logo" className="w-24 h-24 rounded-xl object-contain" />
          {isOpen && <span className="text-white font-bold text-xl">Ezee</span>}
        </div>

        <nav className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {isOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
