import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { DEMO_PRODUCTS } from '../data/demoData';

const ProductContext = createContext({});

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    console.log('=== FETCHING PRODUCTS FROM SUPABASE ===');
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Supabase Response - Data:', data);
      console.log('Supabase Response - Error:', error);
      console.log('Data length:', data?.length || 0);

      if (error) {
        console.error('❌ Supabase fetch error:', error.message);
        throw error;
      }

      console.log('✅ Using SUPABASE data:', data?.length || 0, 'products');
      setProducts(data || []);
    } catch (err) {
      console.error('❌ Error occurred, using DEMO data:', err);
      setProducts(DEMO_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    console.log('=== ADDING PRODUCT TO SUPABASE ===');
    console.log('Product data:', productData);

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: productData.name,
          description: productData.description || '',
          price: parseFloat(productData.price) || 0,
          quantity: parseInt(productData.quantity) || 0,
          category: productData.category || '',
          image_url: productData.image_url || ''
        }])
        .select();

      console.log('Supabase insert response - Data:', data);
      console.log('Supabase insert response - Error:', error);

      if (error) {
        console.error('❌ Supabase insert error:', error.message, error);
        throw error;
      }

      console.log('✅ Product added to Supabase:', data[0]);
      setProducts(prev => [data[0], ...prev]);
      showNotification('Product added successfully!');
      return true;
    } catch (err) {
      console.error('❌ Add failed:', err);
      showNotification('Failed to add product: ' + (err.message || 'Unknown error'), 'error');
      return false;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const { error } = await supabase.from('products').update(productData).eq('id', id);
      if (error) throw error;
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } : p));
      showNotification('Product updated successfully!');
      return true;
    } catch {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } : p));
      showNotification('Product updated (demo mode)');
      return true;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
      showNotification('Product deleted successfully!');
    } catch {
      setProducts(prev => prev.filter(p => p.id !== id));
      showNotification('Product deleted (demo mode)');
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      const { error } = await supabase.from('products').update({ quantity }).eq('id', id);
      if (error) throw error;
      setProducts(prev => prev.map(p => p.id === id ? { ...p, quantity } : p));
      showNotification('Quantity updated!');
    } catch {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, quantity } : p));
    }
  };

  return (
    <ProductContext.Provider value={{
      products, loading, notification,
      addProduct, updateProduct, deleteProduct, updateQuantity, fetchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};
