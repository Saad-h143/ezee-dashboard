import { useMemo } from 'react';
import { DollarSign, ShoppingBag, TrendingUp, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useProducts } from '../context/ProductContext';
import { useSales } from '../context/SalesContext';

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
      </div>
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { products } = useProducts();
  const { sales, getSalesStats, getWeeklySales, getMonthlySales } = useSales();

  const stats = useMemo(() => getSalesStats(), [sales, getSalesStats]);
  const weeklyData = useMemo(() => getWeeklySales(), [sales, getWeeklySales]);
  const monthlyData = useMemo(() => getMonthlySales(), [sales, getMonthlySales]);

  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.quantity > 0 && p.quantity <= 20).length;

  const recentSales = sales.slice(0, 5);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Sales overview and analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`€${stats.totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          color="bg-green-500"
          subtext={`€${stats.todayRevenue.toFixed(2)} today`}
        />
        <StatCard
          title="Total Sales"
          value={stats.totalSales}
          icon={ShoppingBag}
          color="bg-purple-500"
          subtext={`${stats.todaySales} today`}
        />
        <StatCard
          title="Products"
          value={totalProducts}
          icon={Package}
          color="bg-blue-500"
          subtext={`${lowStockProducts} low stock`}
        />
        <StatCard
          title="Avg. Sale"
          value={`€${stats.totalSales > 0 ? (stats.totalRevenue / stats.totalSales).toFixed(2) : '0.00'}`}
          icon={TrendingUp}
          color="bg-pink-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Weekly Sales</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                  formatter={(value, name) => [
                    name === 'revenue' ? `€${value.toFixed(2)}` : value,
                    name === 'revenue' ? 'Revenue' : 'Sales'
                  ]}
                />
                <Bar dataKey="sales" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                  formatter={(value) => [`€${value.toFixed(2)}`, 'Revenue']}
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Recent Sales</h3>
        </div>
        {recentSales.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentSales.map((sale) => (
              <div key={sale.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{sale.product_name}</p>
                    <p className="text-xs text-gray-400">{sale.customer_name} · {formatDate(sale.created_at)}</p>
                  </div>
                </div>
                <span className="font-bold text-green-600">€{parseFloat(sale.total_price || 0).toFixed(2)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400">
            <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No sales yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
