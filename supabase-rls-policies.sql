-- =====================================================
-- SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- Honshu Enterprises Application
-- =====================================================
--
-- INSTRUCTIONS:
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to SQL Editor
-- 3. Copy and paste this entire file
-- 4. Click "Run" to execute all policies
-- 5. Verify policies are active in Table Editor > RLS tab
-- =====================================================

-- =====================================================
-- STEP 1: Enable RLS on all tables
-- =====================================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 2: Products Table Policies
-- =====================================================

-- Allow everyone to view products (public catalog)
CREATE POLICY "Allow public read access on products"
ON products FOR SELECT
USING (true);

-- Only authenticated users (admins) can insert products
CREATE POLICY "Allow authenticated insert on products"
ON products FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only authenticated users (admins) can update products
CREATE POLICY "Allow authenticated update on products"
ON products FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Only authenticated users (admins) can delete products
CREATE POLICY "Allow authenticated delete on products"
ON products FOR DELETE
TO authenticated
USING (true);

-- =====================================================
-- STEP 3: Orders Table Policies
-- =====================================================

-- Allow anyone to create orders (customers placing orders)
CREATE POLICY "Allow public insert on orders"
ON orders FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users (admins) can read orders
CREATE POLICY "Allow authenticated read on orders"
ON orders FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can update orders (for status changes)
CREATE POLICY "Allow authenticated update on orders"
ON orders FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Only authenticated users can delete orders
CREATE POLICY "Allow authenticated delete on orders"
ON orders FOR DELETE
TO authenticated
USING (true);

-- =====================================================
-- STEP 4: Order Items Table Policies
-- =====================================================

-- Allow anyone to create order items (when placing orders)
CREATE POLICY "Allow public insert on order_items"
ON order_items FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users (admins) can read order items
CREATE POLICY "Allow authenticated read on order_items"
ON order_items FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can update order items
CREATE POLICY "Allow authenticated update on order_items"
ON order_items FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Only authenticated users can delete order items
CREATE POLICY "Allow authenticated delete on order_items"
ON order_items FOR DELETE
TO authenticated
USING (true);

-- =====================================================
-- STEP 5: Storage Bucket Policies (product-images)
-- =====================================================

-- Allow public read access to product images
CREATE POLICY "Allow public read access on product-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Only authenticated users (admins) can upload images
CREATE POLICY "Allow authenticated upload on product-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- Only authenticated users (admins) can update images
CREATE POLICY "Allow authenticated update on product-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

-- Only authenticated users (admins) can delete images
CREATE POLICY "Allow authenticated delete on product-images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');

-- =====================================================
-- STEP 6: Create product-images bucket (if not exists)
-- =====================================================

-- Create the storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if RLS is enabled on all tables
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('products', 'orders', 'order_items');

-- List all RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- =====================================================
-- TESTING RLS POLICIES
-- =====================================================

-- Test 1: Try to read products (should work for everyone)
SELECT * FROM products LIMIT 5;

-- Test 2: Try to insert a product as anon user (should fail)
-- This should return an error
-- INSERT INTO products (name, brand, price) VALUES ('Test', 'Test', 100);

-- Test 3: Check storage policies
SELECT * FROM storage.buckets WHERE id = 'product-images';

-- =====================================================
-- ROLLBACK (if needed)
-- =====================================================

-- Uncomment and run these commands if you need to rollback the policies:

-- DROP POLICY IF EXISTS "Allow public read access on products" ON products;
-- DROP POLICY IF EXISTS "Allow authenticated insert on products" ON products;
-- DROP POLICY IF EXISTS "Allow authenticated update on products" ON products;
-- DROP POLICY IF EXISTS "Allow authenticated delete on products" ON products;

-- DROP POLICY IF EXISTS "Allow public insert on orders" ON orders;
-- DROP POLICY IF EXISTS "Allow authenticated read on orders" ON orders;
-- DROP POLICY IF EXISTS "Allow authenticated update on orders" ON orders;
-- DROP POLICY IF EXISTS "Allow authenticated delete on orders" ON orders;

-- DROP POLICY IF EXISTS "Allow public insert on order_items" ON order_items;
-- DROP POLICY IF EXISTS "Allow authenticated read on order_items" ON order_items;
-- DROP POLICY IF EXISTS "Allow authenticated update on order_items" ON order_items;
-- DROP POLICY IF EXISTS "Allow authenticated delete on order_items" ON order_items;

-- DROP POLICY IF EXISTS "Allow public read access on product-images" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow authenticated upload on product-images" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow authenticated update on product-images" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow authenticated delete on product-images" ON storage.objects;

-- ALTER TABLE products DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- NOTES
-- =====================================================
--
-- 1. After running these policies, unauthenticated users will NOT be able to:
--    - Add, edit, or delete products
--    - Read order information
--    - Upload, modify, or delete images
--
-- 2. Authenticated admin users will be able to:
--    - Perform all CRUD operations on products
--    - View and manage all orders
--    - Upload and manage product images
--
-- 3. Public users (customers) will be able to:
--    - View all products
--    - Place orders (create orders and order_items)
--
-- 4. The 'authenticated' role is automatically assigned to users
--    who log in via Supabase Auth
--
-- 5. Test thoroughly before deploying to production!
--
-- =====================================================
