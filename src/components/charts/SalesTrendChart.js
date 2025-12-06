import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SALES_DATA } from '../../data/demoData';

const SalesTrendChart = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <h3 className="text-lg font-bold text-gray-800 mb-4">Sales Trend</h3>
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={SALES_DATA}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', strokeWidth: 2 }} />
        <Line type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', strokeWidth: 2 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default SalesTrendChart;
