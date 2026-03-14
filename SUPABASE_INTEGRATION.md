# Supabase Ecommerce Integration - Setup Guide

## ✅ Installation Complete

### 1. Package Installation

```bash
npm install @supabase/supabase-js
```

### 2. Supabase Client Setup

**File: `src/lib/supabase.js`**

Initializes the Supabase client with your project credentials:

- Project URL: `https://pdhrnnyjdipfhdrjihkq.supabase.co`
- Anon Public Key: `sb_publishable_jO27J3YPIARln-pOYc89OQ_tW6_Jx85`

### 3. Database Tables (Already Created)

#### `orders` table

```
- id (uuid, primary key)
- created_at (timestamp)
- customer_name (text)
- phone (text)
- subtotal (decimal)
- tax (decimal)
- total (decimal)
```

#### `order_items` table

```
- id (uuid, primary key)
- order_id (uuid, foreign key to orders.id)
- product_id (integer)
- product_name (text)
- price (decimal)
- quantity (integer)
```

## 🛒 Cart Page Integration

**File: `src/pages/Cart.jsx`**

### State Management

```javascript
const [customerName, setCustomerName] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [showCheckoutForm, setShowCheckoutForm] = useState(false);
```

### Checkout Flow

1. **User clicks "Proceed to Checkout"** → Checkout form appears
2. **User enters name and phone** → Form validation
3. **User clicks "Complete Order"** → Supabase insertion begins
4. **Order created in database** → Receives order ID
5. **Order items inserted** → All cart products saved
6. **WhatsApp message generated** → Formatted quote with order details
7. **WhatsApp opens** → User can send quote to sales team
8. **Cart clears** → Ready for new purchase

### `handleCheckout()` Function Breakdown

#### Step 1: Validation

```javascript
if (!customerName.trim()) {
  alert("Please enter your name");
  return;
}
if (!phoneNumber.trim()) {
  alert("Please enter your phone number");
  return;
}
```

#### Step 2: Calculate Totals

```javascript
const subtotal = getTotalPrice();
const tax = subtotal * 0.1; // 10% tax
const shipping = subtotal > 10000 ? 0 : 500; // Free over $10k
const total = subtotal + tax + shipping;
```

#### Step 3: Insert Order

```javascript
const { data: orderData, error: orderError } = await supabase
  .from("orders")
  .insert([
    {
      customer_name: customerName,
      phone: phoneNumber,
      subtotal: subtotal,
      tax: Math.round(tax),
      total: Math.round(total),
    },
  ])
  .select("id");

const orderId = orderData[0].id;
```

#### Step 4: Insert Order Items

```javascript
const orderItems = cartItems.map((item) => ({
  order_id: orderId,
  product_id: item.id,
  product_name: item.name,
  price: item.price,
  quantity: item.quantity,
}));

const { error: itemsError } = await supabase
  .from("order_items")
  .insert(orderItems);
```

#### Step 5: Generate WhatsApp Message

```javascript
const itemsList = cartItems
  .map((item) => `• ${item.name} × ${item.quantity}`)
  .join("\n");

const message = `🧾 HONSHU ENTERPRISES QUOTE REQUEST

Order ID: ${orderId}

Items:
${itemsList}

Subtotal: $${subtotal.toLocaleString()}
Tax: $${Math.round(tax).toLocaleString()}
Total: $${Math.round(total).toLocaleString()}`;
```

#### Step 6: Encode & Open WhatsApp

```javascript
const encodedMessage = encodeURIComponent(message);
const whatsappURL = `https://wa.me/94701400093?text=${encodedMessage}`;
window.open(whatsappURL, "_blank");
```

#### Step 7: Clear Cart & Reset

```javascript
clearCart();
setShowCheckoutForm(false);
setCustomerName("");
setPhoneNumber("");
alert(`✓ Order ${orderId} created successfully! WhatsApp is opening...`);
```

## 📱 User Interface

### Checkout Form

Shows when user clicks "Proceed to Checkout":

- **Full Name** input field
- **Phone Number** input field
- **Complete Order** button (disabled during processing)
- **Cancel** button to hide form

### Form Styling

- Green accent color (#00d97e) matching site theme
- Dark background with transparent styling
- Loading state shows "Processing..."
- Error handling with alert notifications

## 🔧 Features

✅ **Validation** - Name and phone required
✅ **Database Integration** - Automatic order saving
✅ **WhatsApp Integration** - Pre-filled message format
✅ **Cart Clearing** - Auto-clears after successful order
✅ **Error Handling** - Detailed error messages
✅ **Loading States** - Prevents duplicate submissions
✅ **UUID Order IDs** - Unique identifier for each order
✅ **Responsive Design** - Works on all device sizes
✅ **Tax Calculation** - 10% automatic tax
✅ **Shipping Logic** - Free shipping over $10,000

## 📋 WhatsApp Message Format

```
🧾 HONSHU ENTERPRISES QUOTE REQUEST

Order ID: [UUID]

Items:
• Product Name × Quantity
• Product Name × Quantity

Subtotal: $X,XXX
Tax: $XXX
Total: $X,XXX
```

## 🚀 How It Works

1. **Cart Management** - React Context stores cart items
2. **Supabase** - Cloud database for order storage
3. **WhatsApp API** - Sends order quote directly to sales team
4. **User Flow** - No separate checkout page needed
5. **Sales Integration** - Direct WhatsApp communication with customers

## 🔐 Security Notes

- Anon key is public-facing (safe for client-side)
- Row-level security (RLS) should be configured in Supabase
- Validate all data on backend (Supabase policies)
- Phone numbers stored securely in database

## 📚 Files Modified

- `src/pages/Cart.jsx` - Added checkout logic and form
- `src/pages/Cart.module.css` - Added form styling

## 📚 Files Created

- `src/lib/supabase.js` - Supabase client initialization

## 🧪 Testing the Integration

1. Add products to cart
2. Go to `/cart` page
3. Click "Proceed to Checkout"
4. Fill in Name and Phone
5. Click "Complete Order"
6. WhatsApp should open with pre-filled message
7. Check Supabase dashboard for new order

## ❌ Troubleshooting

**Issue:** "Error processing order"

- Check Supabase project status
- Verify API keys are correct
- Check table permissions (RLS policies)

**Issue:** WhatsApp not opening

- Check if pop-ups are blocked
- Try with different phone number format
- Verify WhatsApp Web is available in your region

**Issue:** Form not validating

- Ensure name field is not empty
- Ensure phone field is not empty
- Check browser console for errors

## 📞 Support

For issues with:

- **Cart Logic** - Check React Context
- **Supabase** - Check project dashboard
- **WhatsApp** - Check number format and RLS policies
