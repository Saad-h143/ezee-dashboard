import { TrendingUp, Users, DollarSign } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import SalesTrendChart from '../components/charts/SalesTrendChart';
import StockChart from '../components/charts/StockChart';

const Analytics = () => {
  const { products } = useProducts();

  const summaryCards = [
    { title: 'Monthly Growth', value: '+24.5%', subtitle: 'Compared to last month', icon: TrendingUp, gradient: 'from-purple-500 to-purple-600' },
    { title: 'Active Users', value: '1,234', subtitle: '+12% from last week', icon: Users, gradient: 'from-pink-500 to-rose-500' },
    { title: 'Avg. Order Value', value: '$156.50', subtitle: '+8% improvement', icon: DollarSign, gradient: 'from-blue-500 to-cyan-500' },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800">Analytics & Reports</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card, i) => (
          <div key={i} className={`bg-gradient-to-r ${card.gradient} rounded-2xl p-6 text-white`}>
            <card.icon className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-medium opacity-90">{card.title}</h3>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
            <p className="text-sm opacity-80 mt-2">{card.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Sales Trend */}
      <SalesTrendChart />

      {/* Product Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {products.slice(0, 5).map((product, i) => (
              <div key={product.id} className="flex items-center gap-4">
                <span className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg font-bold">
                  {i + 1}
                </span>
                <img
                  src={product.image_url || 'https://placehold.co/40x40/6366f1/white?text=P'}
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.quantity} sold</p>
                </div>
                <span className="font-bold text-gray-800">${(product.price * product.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Chart */}
        <StockChart />
      </div>
    </div>
  );
};

export default Analytics;
