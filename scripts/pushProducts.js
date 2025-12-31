// Run this script with: node scripts/pushProducts.js
// Make sure to set your Supabase credentials below

const { createClient } = require('@supabase/supabase-js');
const products = require('../src/data/product.json');

// Replace with your Supabase credentials
const supabaseUrl = 'https://pvrzmqhlajoujcmhmcby.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cnptcWhsYWpvdWpjbWhtY2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MzE4MTUsImV4cCI6MjA4MDQwNzgxNX0.ZpdnjwawXUk2SMmfOpko-ne4Q_0Wa9SXYQfZVgBqdew';

const supabase = createClient(supabaseUrl, supabaseKey);

async function pushProducts() {
  console.log(`Found ${products.length} products to push...`);

  // Transform data - only name, price, category, brand, quantity=100, no image
  const transformedProducts = products.map(product => ({
    name: product.name,
    price: product.price,
    category: product.category,
    brand: product.brand || '',
    quantity: 100,
    description: '',
    image_url: ''
  }));

  // Insert in batches of 100 to avoid timeout
  const batchSize = 100;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < transformedProducts.length; i += batchSize) {
    const batch = transformedProducts.slice(i, i + batchSize);

    const { data, error } = await supabase
      .from('products')
      .insert(batch);

    if (error) {
      console.error(`Error in batch ${i / batchSize + 1}:`, error.message);
      errorCount += batch.length;
    } else {
      successCount += batch.length;
      console.log(`Batch ${Math.floor(i / batchSize) + 1} inserted: ${batch.length} products`);
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Total products: ${products.length}`);
  console.log(`Successfully inserted: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
}

pushProducts().catch(console.error);
