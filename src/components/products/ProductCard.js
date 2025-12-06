import { Edit2, Trash2 } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete, onUpdateQuantity }) => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden card-hover">
    <div className="relative">
      <img
        src={product.image_url || 'https://placehold.co/200x200/6366f1/white?text=Product'}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-3 right-3 flex gap-2">
        <button onClick={onEdit} className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors shadow">
          <Edit2 className="w-4 h-4 text-blue-600" />
        </button>
        <button onClick={onDelete} className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors shadow">
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
      <span className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-gray-800">
        {product.category}
      </span>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-gray-800 mb-1 truncate">{product.name}</h3>
      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-purple-600">${product.price}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(Math.max(0, product.quantity - 1))}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            -
          </button>
          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
            product.quantity < 20 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {product.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(product.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCard;
