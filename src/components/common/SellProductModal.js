import { useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';

const SellProductModal = ({ product, onClose, onSell }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    imei_number: '',
    quantity_sold: 1,
    sell_price: product?.price || 0,
    description: '',
  });

  const totalPrice = (parseFloat(formData.sell_price) || 0) * (parseInt(formData.quantity_sold) || 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSell({
      product_id: product.id,
      product_name: product.name,
      product_category: product.category || '',
      product_brand: product.brand || '',
      product_price: product.price,
      sell_price: parseFloat(formData.sell_price),
      quantity_sold: parseInt(formData.quantity_sold) || 1,
      total_price: totalPrice,
      customer_name: formData.customer_name,
      customer_phone: formData.customer_phone,
      imei_number: formData.imei_number,
      description: formData.description,
      current_quantity: product.quantity,
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Sell Product</h2>
              <p className="text-sm text-gray-500">{product?.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Product Info */}
        <div className="px-6 pt-4">
          <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Product</p>
              <p className="font-semibold text-gray-800">{product?.name}</p>
              <p className="text-xs text-gray-400">{product?.category} {product?.brand ? `· ${product.brand}` : ''}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Available</p>
              <p className={`font-bold text-lg ${product?.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product?.quantity || 0}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input
              type="text"
              value={formData.customer_name}
              onChange={(e) => handleChange('customer_name', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter customer name"
              required
            />
          </div>

          {/* Customer Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Phone</label>
            <input
              type="tel"
              value={formData.customer_phone}
              onChange={(e) => handleChange('customer_phone', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* IMEI Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">IMEI Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={formData.imei_number}
              onChange={(e) => handleChange('imei_number', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter IMEI number"
              required
            />
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sell Price (€)</label>
              <input
                type="number"
                step="0.01"
                value={formData.sell_price}
                onChange={(e) => handleChange('sell_price', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                max={product?.quantity || 1}
                value={formData.quantity_sold}
                onChange={(e) => handleChange('quantity_sold', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description / Discount Note</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g. Gave 10% discount, cash payment..."
              rows={2}
            />
          </div>

          {/* Total */}
          <div className="bg-green-50 rounded-xl p-4 flex items-center justify-between">
            <span className="font-medium text-green-800">Total Amount</span>
            <span className="text-2xl font-bold text-green-700">€{totalPrice.toFixed(2)}</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={product?.quantity <= 0}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellProductModal;
