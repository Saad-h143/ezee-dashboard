import { Package, DollarSign, ShoppingCart, AlertCircle } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import StatsCard from '../components/charts/StatsCard';
import RevenueChart from '../components/charts/RevenueChart';
import CategoryChart from '../components/charts/CategoryChart';
import WeeklyOrdersChart from '../components/charts/WeeklyOrdersChart';
import ProductTable from '../components/products/ProductTable';

const Dashboard = () => {
  const { products } = useProducts();

  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
  const lowStockItems = products.filter(p => p.quantity < 20).length;

  const stats = [
    { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-green-400 to-green-600', change: '+12.5%' },
    { title: 'Total Products', value: totalProducts, icon: Package, color: 'from-blue-400 to-blue-600', change: '+5.2%' },
    { title: 'Total Stock', value: totalStock.toLocaleString(), icon: ShoppingCart, color: 'from-purple-400 to-purple-600', change: '+8.1%' },
    { title: 'Low Stock Alert', value: lowStockItems, icon: AlertCircle, color: 'from-orange-400 to-red-500', change: '-2.3%' },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <CategoryChart />
      </div>

      {/* Weekly Orders */}
      <WeeklyOrdersChart />

      {/* Recent Products */}
      <ProductTable products={products} />
    </div>
  );
};

export default Dashboard;
