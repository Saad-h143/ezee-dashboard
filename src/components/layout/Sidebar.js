import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, Clock, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
// Import logo - place your ezee.png in src/assets folder
import logo from '../../assets/Ezee.png';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Dashboard' },
  { path: '/products', icon: ShoppingCart, label: 'Products' },
  { path: '/sales-history', icon: Clock, label: 'Sales History' },
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
        fixed left-0 top-0 z-50 overflow-hidden
      `}>
      <div className="p-4">
        <div className={`flex items-center mb-8 ${isOpen ? '' : 'md:justify-center'}`}>
          <img src={logo} alt="Ezee Logo" className={`rounded-xl object-contain transition-all duration-300 ${isOpen ? 'w-16 h-16' : 'w-10 h-10 md:w-10 md:h-10'}`} />
          {isOpen && <span className="text-white font-bold text-xl ml-2">Ezee</span>}
        </div>

        <nav className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  !isOpen ? 'md:justify-center md:px-2' : ''
                } ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={logout}
          className={`w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 ${!isOpen ? 'md:justify-center md:px-2' : ''}`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
