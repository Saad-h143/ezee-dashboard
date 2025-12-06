import { useNavigate } from 'react-router-dom';

const ProductTable = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Recent Products</h3>
        <button onClick={() => navigate('/products')} className="text-purple-600 hover:text-purple-700 font-medium">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Product</th>
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Category</th>
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Price</th>
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 5).map((product) => (
              <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image_url || 'https://placehold.co/40x40/6366f1/white?text=P'}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="font-medium text-gray-800">{product.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">{product.category}</span>
                </td>
                <td className="py-3 px-4 font-medium text-gray-800">${product.price}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    product.quantity < 20 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {product.quantity} units
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
