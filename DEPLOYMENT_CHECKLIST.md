# Pre-Production Security Deployment Checklist

## 🚨 CRITICAL: Complete ALL items before deploying to production

This checklist ensures your application is secure before going live.

---

## Phase 1: Authentication & Authorization (CRITICAL)

### 1.1 Implement Supabase Authentication

- [ ] Enable Email/Password authentication in Supabase Dashboard
- [ ] Create admin user account in Supabase Auth
- [ ] Update `AdminContext.jsx` to use Supabase Auth (see SECURITY.md)
- [ ] Test admin login with Supabase Auth
- [ ] Test admin logout
- [ ] Test session persistence across page refreshes
- [ ] Remove client-side credential checking code
- [ ] Verify authentication state is managed by Supabase

### 1.2 Enable Row Level Security

- [ ] Run `supabase-rls-policies.sql` in Supabase SQL Editor
- [ ] Verify RLS is enabled on all tables:
  - [ ] products
  - [ ] orders
  - [ ] order_items
- [ ] Test that unauthenticated users CANNOT:
  - [ ] Insert products
  - [ ] Update products
  - [ ] Delete products
  - [ ] Read orders
  - [ ] Upload images
- [ ] Test that authenticated users CAN:
  - [ ] Insert/update/delete products
  - [ ] Read/manage orders
  - [ ] Upload/delete images
- [ ] Test that public users CAN:
  - [ ] View products
  - [ ] Place orders

---

## Phase 2: Environment & Configuration

### 2.1 Environment Variables

- [ ] Create production `.env` file with unique credentials
- [ ] Verify `.env` is in `.gitignore`
- [ ] Update environment variables on hosting platform (Vercel/Netlify):
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
  - [ ] `VITE_WHATSAPP_PHONE`
- [ ] Remove `VITE_ADMIN_USERNAME` and `VITE_ADMIN_PASSWORD` (using Supabase Auth now)
- [ ] Verify production build uses environment variables correctly
- [ ] Test production build locally: `npm run build && npm run preview`

### 2.2 Secret Management

- [ ] Ensure NO secrets in source code
- [ ] Ensure `.env` is NOT committed to git
- [ ] Document required environment variables in README
- [ ] Create `.env.example` with placeholder values

---

## Phase 3: Input Validation & Sanitization

### 3.1 Test XSS Protection

- [ ] Test Contact form with XSS payloads:
  - [ ] `<script>alert('XSS')</script>`
  - [ ] `<img src=x onerror=alert('XSS')>`
  - [ ] `javascript:alert('XSS')`
- [ ] Test Product forms with XSS payloads
- [ ] Test Cart checkout with XSS payloads
- [ ] Verify all inputs are escaped/sanitized in database
- [ ] Verify outputs display escaped content

### 3.2 Test Input Validation

- [ ] Test email validation with invalid emails:
  - [ ] `notanemail`
  - [ ] `test@`
  - [ ] `@test.com`
- [ ] Test phone validation with invalid phones:
  - [ ] `abc123`
  - [ ] `123` (too short)
  - [ ] `12345678901234567890` (too long)
- [ ] Test form field length limits:
  - [ ] Very long product names (>200 chars)
  - [ ] Very long descriptions (>5000 chars)
- [ ] Test required field validation
- [ ] Test numeric validation (price, rating)

---

## Phase 4: File Upload Security

### 4.1 Test File Upload Restrictions

- [ ] Test uploading files >5MB (should fail)
- [ ] Test uploading non-image files (should fail):
  - [ ] `.pdf`
  - [ ] `.exe`
  - [ ] `.zip`
- [ ] Test uploading valid images:
  - [ ] `.jpg`
  - [ ] `.png`
  - [ ] `.gif`
  - [ ] `.webp`
- [ ] Verify file type validation cannot be bypassed
- [ ] Verify uploaded files are accessible via public URL
- [ ] Verify only authenticated users can upload

---

## Phase 5: Rate Limiting & Brute Force Protection

### 5.1 Test Rate Limiting

- [ ] Test admin login with 5 wrong passwords
- [ ] Verify 6th attempt is blocked
- [ ] Wait 15 minutes and verify rate limit resets
- [ ] Test with multiple different usernames
- [ ] Verify rate limiter persists across page refreshes

---

## Phase 6: Database Security

### 6.1 Verify Database Configuration

- [ ] All sensitive tables have RLS enabled
- [ ] Public tables (if any) are intentionally public
- [ ] No direct database credentials in code
- [ ] Database backups are configured
- [ ] Test database backup restore procedure

### 6.2 Test Database Access

- [ ] Use browser DevTools to attempt direct Supabase queries
- [ ] Try to bypass RLS policies
- [ ] Try to access admin-only data without authentication
- [ ] Verify all attempts are blocked

---

## Phase 7: Security Headers

### 7.1 Configure Security Headers

- [ ] Add Content Security Policy (CSP) meta tag to `index.html`
- [ ] Configure hosting platform headers (Vercel/Netlify):
  ```
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  ```
- [ ] Configure HSTS header (if using custom domain):
  ```
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  ```
- [ ] Test headers using https://securityheaders.com

---

## Phase 8: HTTPS & Transport Security

### 8.1 Configure HTTPS

- [ ] Ensure hosting platform enforces HTTPS
- [ ] Configure HTTPS redirect for HTTP requests
- [ ] If using custom domain, configure SSL certificate
- [ ] Test that HTTP redirects to HTTPS
- [ ] Verify SSL certificate is valid

---

## Phase 9: Code Cleanup

### 9.1 Remove Debug Code

- [ ] Search and remove ALL `console.log()` statements
- [ ] Search and remove ALL `console.error()` statements
- [ ] Remove debug comments
- [ ] Remove commented-out code
- [ ] Remove unused imports

### 9.2 Production Build

- [ ] Run `npm run build`
- [ ] Check build warnings
- [ ] Verify build size is reasonable
- [ ] Test production build locally
- [ ] Check for source maps (should be disabled in production)

---

## Phase 10: Testing

### 10.1 Functional Testing

- [ ] Test all user flows end-to-end
- [ ] Test admin dashboard functionality
- [ ] Test product browsing
- [ ] Test cart functionality
- [ ] Test checkout process
- [ ] Test contact form
- [ ] Test WhatsApp integration

### 10.2 Security Testing

- [ ] Run security scan using tools like OWASP ZAP
- [ ] Test for common vulnerabilities (OWASP Top 10)
- [ ] Penetration testing (if budget allows)
- [ ] Code review by another developer

### 10.3 Browser Testing

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## Phase 11: Monitoring & Logging

### 11.1 Configure Monitoring

- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure uptime monitoring
- [ ] Set up performance monitoring
- [ ] Configure database usage alerts
- [ ] Set up security incident alerts

### 11.2 Audit Logging

- [ ] Implement logging for:
  - [ ] Admin login attempts
  - [ ] Product modifications
  - [ ] Order creation
  - [ ] Failed authentication attempts
- [ ] Set up log retention policy
- [ ] Test log collection

---

## Phase 12: Documentation

### 12.1 Update Documentation

- [ ] README.md is up-to-date
- [ ] SECURITY.md is complete
- [ ] API documentation (if applicable)
- [ ] Environment variable documentation
- [ ] Deployment process documentation

### 12.2 Incident Response Plan

- [ ] Document who to contact for security issues
- [ ] Document credential rotation procedure
- [ ] Document backup restoration procedure
- [ ] Document emergency shutdown procedure

---

## Phase 13: Backup & Recovery

### 13.1 Backup Configuration

- [ ] Supabase automatic backups enabled
- [ ] Test backup restoration
- [ ] Document recovery time objective (RTO)
- [ ] Document recovery point objective (RPO)
- [ ] Store backups in separate location

---

## Phase 14: Legal & Compliance

### 14.1 Privacy & Legal

- [ ] Privacy policy added (if collecting user data)
- [ ] Terms of service added
- [ ] Cookie consent (if using analytics)
- [ ] GDPR compliance (if serving EU users)
- [ ] Data retention policy documented

---

## Phase 15: Final Checks

### 15.1 Pre-Launch Verification

- [ ] All items in this checklist completed
- [ ] Security review passed
- [ ] Performance testing completed
- [ ] Load testing completed (if expecting high traffic)
- [ ] Rollback plan documented
- [ ] Team trained on new security features

### 15.2 Post-Launch Monitoring

- [ ] Monitor error rates for 48 hours
- [ ] Monitor performance metrics
- [ ] Monitor authentication success/failure rates
- [ ] Monitor database performance
- [ ] Be ready to rollback if issues detected

---

## 🚨 DO NOT DEPLOY UNTIL ALL ITEMS ARE CHECKED

Deploying with incomplete security measures puts your application and users at risk.

## Security Contact

For questions or security concerns:

- Email: security@honshu.com
- Emergency contact: [Add phone number]

---

**Checklist Version:** 1.0
**Last Updated:** March 22, 2026
**Review Frequency:** Before each production deployment
