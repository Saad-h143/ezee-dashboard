import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const SalesContext = createContext({});

export const useSales = () => useContext(SalesContext);

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchSales = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSales(data || []);
    } catch (err) {
      console.error('Failed to fetch sales:', err);
      setSales([]);
    } finally {
      setLoading(false);
    }
  };

  const addSale = async (saleData) => {
    try {
      // Insert sale record
      const { data, error } = await supabase
        .from('sales')
        .insert([{
          product_id: saleData.product_id,
          product_name: saleData.product_name,
          product_category: saleData.product_category,
          product_brand: saleData.product_brand || '',
          product_price: parseFloat(saleData.product_price),
          sell_price: parseFloat(saleData.sell_price),
          quantity_sold: parseInt(saleData.quantity_sold) || 1,
          total_price: parseFloat(saleData.total_price),
          customer_name: saleData.customer_name,
          customer_phone: saleData.customer_phone,
          imei_number: saleData.imei_number,
          description: saleData.description || '',
        }])
        .select();

      if (error) throw error;

      // Decrease product quantity
      const newQty = Math.max(0, saleData.current_quantity - (parseInt(saleData.quantity_sold) || 1));
      const { error: updateError } = await supabase
        .from('products')
        .update({ quantity: newQty })
        .eq('id', saleData.product_id);

      if (updateError) throw updateError;

      setSales(prev => [data[0], ...prev]);
      showNotification('Sale recorded successfully!');
      return { success: true, newQuantity: newQty };
    } catch (err) {
      console.error('Failed to add sale:', err);
      showNotification('Failed to record sale: ' + (err.message || 'Unknown error'), 'error');
      return { success: false };
    }
  };

  // Get sales stats
  const getSalesStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todaySales = sales.filter(s => s.created_at?.startsWith(today));
    const totalRevenue = sales.reduce((sum, s) => sum + parseFloat(s.total_price || 0), 0);
    const todayRevenue = todaySales.reduce((sum, s) => sum + parseFloat(s.total_price || 0), 0);

    return {
      totalSales: sales.length,
      todaySales: todaySales.length,
      totalRevenue,
      todayRevenue,
    };
  };

  // Get sales grouped by last 7 days
  const getWeeklySales = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en', { weekday: 'short' });
      const daySales = sales.filter(s => s.created_at?.startsWith(dateStr));
      const revenue = daySales.reduce((sum, s) => sum + parseFloat(s.total_price || 0), 0);
      days.push({ name: dayName, sales: daySales.length, revenue });
    }
    return days;
  };

  // Get sales grouped by month
  const getMonthlySales = () => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en', { month: 'short' });
      const monthSales = sales.filter(s => s.created_at?.startsWith(monthStr));
      const revenue = monthSales.reduce((sum, s) => sum + parseFloat(s.total_price || 0), 0);
      months.push({ name: monthName, sales: monthSales.length, revenue });
    }
    return months;
  };

  return (
    <SalesContext.Provider value={{
      sales, loading, notification,
      addSale, fetchSales, getSalesStats, getWeeklySales, getMonthlySales
    }}>
      {children}
    </SalesContext.Provider>
  );
};
