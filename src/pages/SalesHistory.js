import { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, FileText, Phone, User, Hash, Calendar } from 'lucide-react';
import { useSales } from '../context/SalesContext';

const SalesHistory = () => {
  const { sales, loading } = useSales();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSale, setSelectedSale] = useState(null);
  const itemsPerPage = 10;

  const filteredSales = useMemo(() => {
    return sales.filter(s => {
      const term = searchTerm.toLowerCase();
      return (
        s.customer_name?.toLowerCase().includes(term) ||
        s.product_name?.toLowerCase().includes(term) ||
        s.imei_number?.toLowerCase().includes(term) ||
        s.customer_phone?.includes(term)
      );
    });
  }, [sales, searchTerm]);

  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const paginatedSales = filteredSales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Sales History</h2>
          <p className="text-gray-500 text-sm mt-1">{filteredSales.length} sales recorded</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer, product, IMEI, phone..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Product</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">IMEI</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Qty</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Total</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">{formatDate(sale.created_at)}</td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-gray-800">{sale.customer_name}</p>
                    <p className="text-xs text-gray-400">{sale.customer_phone}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-gray-800">{sale.product_name}</p>
                    <p className="text-xs text-gray-400">{sale.product_category}</p>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 font-mono">{sale.imei_number}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{sale.quantity_sold}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-bold text-green-700">€{parseFloat(sale.total_price || 0).toFixed(2)}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedSale(sale)}
                      className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="View Invoice"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredSales.length === 0 && !loading && (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600">No sales found</h3>
            <p className="text-gray-400 mt-1">Sales will appear here once products are sold</p>
          </div>
        )}

        {/* Pagination */}
        {filteredSales.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-gray-500">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredSales.length)}</span> of{' '}
              <span className="font-medium">{filteredSales.length}</span>
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                let page;
                if (totalPages <= 3) page = i + 1;
                else if (currentPage <= 2) page = i + 1;
                else if (currentPage >= totalPages - 1) page = totalPages - 2 + i;
                else page = currentPage - 1 + i;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                      currentPage === page ? 'bg-purple-600 text-white' : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      {selectedSale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Invoice Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Ezee Store</h3>
                  <p className="text-sm text-white/80">Sale Invoice</p>
                </div>
                <button onClick={() => setSelectedSale(null)} className="p-1 hover:bg-white/20 rounded-lg">
                  <span className="text-xl">✕</span>
                </button>
              </div>
              <p className="text-xs text-white/60 mt-2">{formatDate(selectedSale.created_at)}</p>
            </div>

            {/* Customer Details */}
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Customer</p>
                    <p className="font-medium text-gray-800">{selectedSale.customer_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="font-medium text-gray-800">{selectedSale.customer_phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Hash className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">IMEI Number</p>
                    <p className="font-medium text-gray-800 font-mono">{selectedSale.imei_number}</p>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="border-t border-gray-100 pt-4">
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Product</span>
                    <span className="text-sm font-medium text-gray-800">{selectedSale.product_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Category</span>
                    <span className="text-sm text-gray-600">{selectedSale.product_category}</span>
                  </div>
                  {selectedSale.product_brand && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Brand</span>
                      <span className="text-sm text-gray-600">{selectedSale.product_brand}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Price</span>
                    <span className="text-sm text-gray-600">€{parseFloat(selectedSale.sell_price || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Quantity</span>
                    <span className="text-sm text-gray-600">{selectedSale.quantity_sold}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedSale.description && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400 mb-1">Note</p>
                  <p className="text-sm text-gray-600">{selectedSale.description}</p>
                </div>
              )}

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-green-600">€{parseFloat(selectedSale.total_price || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesHistory;
