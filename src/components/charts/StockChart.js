import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useProducts } from '../../context/ProductContext';

const StockChart = () => {
  const { products } = useProducts();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Stock Status</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={products.slice(0, 6)} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" stroke="#9ca3af" />
          <YAxis dataKey="name" type="category" stroke="#9ca3af" width={100} tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
          <Bar dataKey="quantity" fill="#6366f1" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
