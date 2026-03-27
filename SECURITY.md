# Security Implementation Guide

This document outlines the security measures implemented in the Honshu Enterprises application and provides guidance for maintaining and improving security.

## ⚠️ CRITICAL SECURITY WARNINGS

### Current Security Status

This application has been improved with basic security measures, but **still has critical vulnerabilities** that must be addressed before production deployment:

1. **Client-Side Authentication**: Authentication is still client-side only. This is fundamentally insecure and can be bypassed.
2. **No Row Level Security (RLS)**: Database tables lack RLS policies, allowing direct client access.
3. **Missing Server-Side Validation**: All validation happens on the client and can be bypassed.

## Security Improvements Implemented

### 1. Environment Variables ✅

- All sensitive data moved to `.env` file
- API keys, credentials, and configuration externalized
- `.gitignore` configured to prevent committing secrets

**Files Modified:**

- `src/lib/supabase.js` - Uses environment variables for Supabase credentials
- `src/context/AdminContext.jsx` - Uses environment variables for admin credentials
- `src/pages/Contact.jsx` - Uses environment variables for WhatsApp phone
- `src/pages/Cart.jsx` - Uses environment variables for WhatsApp phone

### 2. Input Sanitization & Validation ✅

- Created `src/utils/security.js` with comprehensive security utilities
- All user inputs are now sanitized to prevent XSS attacks
- Email, phone, and length validation implemented

**Security Functions Available:**

- `sanitizeInput()` - Escapes HTML characters to prevent XSS
- `isValidEmail()` - RFC-compliant email validation
- `isValidPhone()` - International phone number validation
- `isValidLength()` - String length validation
- `validateFile()` - File upload validation
- `RateLimiter` - Prevents brute force attacks

**Files Updated:**

- `src/pages/Contact.jsx` - Validates and sanitizes all form inputs
- `src/pages/Cart.jsx` - Validates phone, sanitizes all data
- `src/components/AddProductForm.jsx` - Validates and sanitizes product data
- `src/components/EditProductForm.jsx` - Validates and sanitizes product data

### 3. Rate Limiting ✅

- Implemented rate limiting on admin login (5 attempts per 15 minutes)
- Prevents brute force attacks on authentication

**Files Updated:**

- `src/pages/AdminLogin.jsx` - Implements rate limiting

### 4. File Upload Security ✅

- File type validation (only allows image formats)
- File size limits (5MB maximum)
- Client-side validation before upload

**Files Updated:**

- `src/components/AddProductForm.jsx` - Validates file uploads
- `src/components/EditProductForm.jsx` - Validates file uploads

## ⚠️ CRITICAL TODO: Implement These Before Production

### 1. Migrate to Supabase Authentication (HIGHEST PRIORITY)

**Current Issue:** Authentication happens entirely on the client side, which is insecure.

**Solution:** Implement Supabase Auth for server-side authentication.

**Implementation Steps:**

1. Enable Email/Password authentication in Supabase Dashboard:
   - Go to Authentication > Providers
   - Enable Email provider

2. Create an admin user in Supabase:

   ```sql
   -- In Supabase SQL Editor
   INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
   VALUES ('admin@honshu.com', crypt('YourSecurePassword', gen_salt('bf')), NOW());
   ```

3. Update `src/context/AdminContext.jsx`:

   ```javascript
   import { supabase } from "../lib/supabase";

   const login = async (email, password) => {
     const { data, error } = await supabase.auth.signInWithPassword({
       email,
       password,
     });

     if (error) return false;

     setIsAdminLoggedIn(true);
     setAdminEmail(data.user.email);
     return true;
   };

   const logout = async () => {
     await supabase.auth.signOut();
     setIsAdminLoggedIn(false);
     setAdminEmail("");
   };

   // Check session on mount
   useEffect(() => {
     supabase.auth.getSession().then(({ data: { session } }) => {
       if (session) {
         setIsAdminLoggedIn(true);
         setAdminEmail(session.user.email);
       }
     });

     const {
       data: { subscription },
     } = supabase.auth.onAuthStateChange((_event, session) => {
       setIsAdminLoggedIn(!!session);
       setAdminEmail(session?.user?.email || "");
     });

     return () => subscription.unsubscribe();
   }, []);
   ```

### 2. Implement Row Level Security (RLS) Policies (CRITICAL)

**Current Issue:** Anyone with the Supabase URL and anon key can directly query, modify, or delete database records.

**Solution:** Enable RLS on all tables and create proper policies.

**SQL Commands (Run in Supabase SQL Editor):**

```sql
-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products table policies
-- Allow public read access
CREATE POLICY "Allow public read access on products"
ON products FOR SELECT
USING (true);

-- Only authenticated users can insert/update/delete
CREATE POLICY "Allow authenticated insert on products"
ON products FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on products"
ON products FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on products"
ON products FOR DELETE
USING (auth.role() = 'authenticated');

-- Orders table policies
-- Only allow users to create orders
CREATE POLICY "Allow public insert on orders"
ON orders FOR INSERT
WITH CHECK (true);

-- Only authenticated users can read orders
CREATE POLICY "Allow authenticated read on orders"
ON orders FOR SELECT
USING (auth.role() = 'authenticated');

-- Order items table policies
CREATE POLICY "Allow public insert on order_items"
ON order_items FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow authenticated read on order_items"
ON order_items FOR SELECT
USING (auth.role() = 'authenticated');

-- Storage bucket policies
-- Allow public read access to product images
CREATE POLICY "Allow public read access on product-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Only authenticated users can upload images
CREATE POLICY "Allow authenticated upload on product-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Only authenticated users can delete images
CREATE POLICY "Allow authenticated delete on product-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
```

### 3. Implement Content Security Policy (CSP)

Add CSP headers to prevent XSS attacks:

**In `index.html`:**

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https: blob:;
  font-src 'self' data:;
  connect-src 'self' https://*.supabase.co;
  frame-ancestors 'none';
"
/>
```

### 4. Add Server-Side Validation

Create Supabase Edge Functions to validate all database operations server-side:

```javascript
// supabase/functions/create-product/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const { name, brand, description, price } = await req.json();

  // Server-side validation
  if (!name || name.length < 2 || name.length > 200) {
    return new Response(JSON.stringify({ error: "Invalid name" }), {
      status: 400,
    });
  }

  // Sanitize and insert...
});
```

### 5. Implement HTTPS-Only and Security Headers

If deploying to production, ensure:

- Force HTTPS redirects
- Add security headers:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Strict-Transport-Security: max-age=31536000`
  - `X-XSS-Protection: 1; mode=block`

### 6. Remove Console Logs in Production

Before deploying, remove all `console.log()` statements that expose sensitive information:

```bash
# Search for console logs
grep -r "console\." src/
```

### 7. Implement Audit Logging

Track all admin actions:

- Product additions/edits/deletions
- Login attempts (successful and failed)
- Order processing

### 8. Database Backup Strategy

- Enable Supabase automatic backups
- Test restore procedures
- Document recovery process

## Security Checklist

Before deploying to production, ensure:

- [ ] Supabase Authentication implemented (not client-side)
- [ ] Row Level Security (RLS) enabled on all tables
- [ ] All RLS policies tested and working
- [ ] Environment variables configured on hosting platform
- [ ] `.env` file NOT committed to git
- [ ] Console logs removed from production build
- [ ] Content Security Policy headers configured
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] File upload limits tested
- [ ] Rate limiting tested
- [ ] Input validation tested with malicious inputs
- [ ] Audit logging implemented
- [ ] Database backups configured

## Testing Security

### Test XSS Protection

Try entering malicious scripts in forms:

```
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
```

These should be escaped and rendered as text, not executed.

### Test Rate Limiting

Try logging in with wrong credentials 5 times. The 6th attempt should be blocked.

### Test File Upload

Try uploading:

- Files larger than 5MB (should be rejected)
- Non-image files (should be rejected)

### Test Input Validation

Try:

- Invalid email formats
- Phone numbers with letters
- Empty fields
- Very long strings

## Environment Variables

Required variables in `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your_secure_password
VITE_WHATSAPP_PHONE=your_phone_number
```

**IMPORTANT:**

- Never commit `.env` to version control
- Use different credentials for development and production
- Rotate keys if they are ever exposed

## Incident Response

If credentials are compromised:

1. Immediately rotate Supabase API keys
2. Reset admin password
3. Review audit logs for unauthorized access
4. Check database for unauthorized modifications
5. Update `.env` on all environments

## Resources

- [Supabase Authentication Docs](https://supabase.com/docs/guides/auth)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## Support

For security concerns or to report vulnerabilities, contact: security@honshu.com

---

**Last Updated:** March 22, 2026
**Status:** Development - NOT production ready
