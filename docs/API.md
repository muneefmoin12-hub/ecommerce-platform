# API Reference

Base URL: `http://localhost:3001/api/v1`  
Swagger UI: `http://localhost:3001/api/docs`  
All responses are JSON. Timestamps are ISO 8601 strings.

## Authentication

Most endpoints are public. Protected endpoints require a Bearer token:
```
Authorization: Bearer <access_token>
```

## Standard Response Shapes

**Single resource:**
```json
{ "data": { ... }, "timestamp": "2024-01-01T00:00:00Z" }
```

**Paginated list:**
```json
{
  "data": [...],
  "meta": { "total": 100, "page": 1, "limit": 24, "totalPages": 5, "hasNextPage": true, "hasPreviousPage": false },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

**Error:**
```json
{ "statusCode": 400, "message": "Validation failed", "error": "BadRequestException", "timestamp": "...", "path": "/api/v1/products" }
```

---

## Auth

### POST /auth/register
Register a new customer account.

**Body:**
```json
{ "email": "user@example.com", "password": "Min8chars", "firstName": "John", "lastName": "Doe" }
```
**Response:** `{ "accessToken": "...", "refreshToken": "...", "expiresIn": 604800 }`

### POST /auth/login
Login and receive JWT tokens.

**Body:** `{ "email": "user@example.com", "password": "..." }`

### POST /auth/refresh
Exchange refresh token for new access token.

**Body:** `{ "refreshToken": "..." }`

### GET /auth/me *(protected)*
Return current authenticated user.

---

## Products

### GET /products
List products with optional filters.

**Query params:**
| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 24, max: 100) |
| `search` | string | Full-text search on product name |
| `categoryId` | UUID | Filter by category |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |
| `sortBy` | string | Field to sort by (createdAt, price, name) |
| `sortOrder` | asc/desc | Sort direction |
| `status` | string | Filter by status (published, draft, archived) |

### GET /products/:id
Get product by ID.

### GET /products/slug/:slug
Get product by URL slug.

### POST /products *(admin)*
Create a new product.

**Body:**
```json
{
  "name": "Premium Widget",
  "sku": "WGT-001",
  "slug": "premium-widget",
  "description": "Full description...",
  "price": 2999,
  "status": "published",
  "inventoryQuantity": 100,
  "categoryIds": ["uuid-1"],
  "tags": ["featured"]
}
```

### PUT /products/:id *(admin)*
Full update of a product.

### DELETE /products/:id *(admin)*
Soft delete a product.

---

## Cart

Cart is session-based for guests. Pass `x-cart-id` header for guest sessions, or authenticate to use user-scoped cart.

### GET /cart
Get current cart.

### POST /cart/items
Add item to cart.
**Body:** `{ "productId": "...", "variantId": "...", "quantity": 1 }`

### PATCH /cart/items/:itemId
Update item quantity.
**Body:** `{ "quantity": 2 }`

### DELETE /cart/items/:itemId
Remove item from cart.

### DELETE /cart
Clear entire cart.

---

## Orders

### POST /orders *(protected)*
Create a new order.

**Body:**
```json
{
  "items": [{ "productId": "...", "variantId": "...", "quantity": 1 }],
  "shippingAddress": { "firstName": "John", "lastName": "Doe", "address1": "123 Main St", "city": "NYC", "state": "NY", "postalCode": "10001", "country": "US" }
}
```

### GET /orders *(protected)*
List orders. Customers see their own; admins see all.

**Query:** `?status=pending&page=1&limit=20`

### GET /orders/:id *(protected)*
Get order details.

### PUT /orders/:id/status *(admin)*
Update order status.
**Body:** `{ "status": "shipped" }`

---

## Payments

### POST /payments/create-intent *(protected)*
Create Stripe payment intent.
**Body:** `{ "orderId": "...", "amount": 9999, "currency": "usd" }`
**Response:** `{ "clientSecret": "pi_xxx_secret_xxx" }`

### POST /payments/webhook
Stripe webhook endpoint (raw body required).

---

## Inventory

### GET /inventory/:productId
Get stock level.
**Response:** `{ "productId": "...", "quantity": 42, "isLowStock": false, "isInStock": true }`

### PATCH /inventory/:productId/adjust *(admin)*
Adjust stock level.
**Body:** `{ "delta": -5 }` (negative to decrease, positive to increase)

---

## Webhooks

### POST /webhooks/medusa
Medusa.js event webhook.

### POST /webhooks/sanity
Sanity.io content change webhook.
