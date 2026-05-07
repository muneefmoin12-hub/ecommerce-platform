# Database Design

## Technology
- **Database:** PostgreSQL 16
- **ORM:** TypeORM 0.3
- **Migrations:** TypeORM migrations (version-controlled)
- **Soft deletes:** Using `deletedAt` timestamp column

## Entity Diagram

```
users
  id (uuid, PK)
  email (unique)
  password_hash
  first_name
  last_name
  phone
  role (customer | admin | super_admin)
  email_verified
  addresses (jsonb[])
  preferences (jsonb)
  created_at, updated_at, deleted_at

categories
  id (uuid, PK)
  name
  slug (unique)
  description
  image_url
  parent_id (FK → categories.id, nullable)
  created_at, updated_at, deleted_at

products
  id (uuid, PK)
  medusa_id (unique, nullable)
  sku (unique)
  name
  slug (unique)
  description (text)
  short_description (nullable)
  price (decimal 10,2)
  compare_at_price (decimal 10,2, nullable)
  currency (default: USD)
  images (jsonb[])
  variants (jsonb[])
  status (draft | published | archived)
  inventory_quantity
  tags (text[])
  metadata (jsonb)
  created_at, updated_at, deleted_at

product_categories (junction)
  product_id (FK → products.id)
  category_id (FK → categories.id)
  PRIMARY KEY (product_id, category_id)

orders
  id (uuid, PK)
  medusa_id (unique, nullable)
  display_id (unique)
  user_id (FK → users.id, nullable)
  items (jsonb[])
  status (pending | confirmed | processing | shipped | delivered | cancelled | refunded)
  payment_status (pending | authorized | captured | failed | refunded)
  fulfillment_status (not_fulfilled | partially_fulfilled | fulfilled | returned)
  subtotal, discount_total, tax_total, shipping_total, total (decimal 10,2)
  currency
  shipping_address (jsonb)
  billing_address (jsonb)
  tracking_number (nullable)
  tracking_url (nullable)
  notes (text, nullable)
  created_at, updated_at
```

## Indexes

```sql
-- Products
CREATE UNIQUE INDEX ON products(sku);
CREATE UNIQUE INDEX ON products(slug);
CREATE INDEX ON products(medusa_id);
CREATE INDEX ON products(status);
CREATE INDEX ON products(created_at);

-- Orders
CREATE UNIQUE INDEX ON orders(display_id);
CREATE INDEX ON orders(user_id);
CREATE INDEX ON orders(status);
CREATE INDEX ON orders(created_at);

-- Users
CREATE UNIQUE INDEX ON users(email);
```

## JSONB Structures

### Product.images[]
```json
[{ "id": "uuid", "url": "https://...", "altText": "...", "width": 800, "height": 800, "position": 0 }]
```

### Product.variants[]
```json
[{ "id": "uuid", "sku": "SKU-001-SM", "title": "Small", "price": 2999, "inventoryQuantity": 50, "options": { "size": "S", "color": "Blue" } }]
```

### Order.items[]
```json
[{ "id": "uuid", "productId": "...", "variantId": "...", "productName": "Widget", "variantTitle": "Blue / L", "sku": "SKU-001", "quantity": 2, "unitPrice": 2999, "totalPrice": 5998 }]
```

### User.addresses[]
```json
[{ "id": "uuid", "firstName": "John", "lastName": "Doe", "address1": "123 Main St", "city": "NYC", "state": "NY", "postalCode": "10001", "country": "US", "isDefault": true }]
```

## Migrations

```bash
# Generate a new migration (after changing entities)
cd apps/api
pnpm migration:generate --name=DescribeWhatChanged

# Run all pending migrations
pnpm migration:run

# Revert last migration
pnpm migration:revert
```

## Backup Strategy

```bash
# Daily backup (add to cron)
pg_dump -U postgres -d ecommerce -F c -f backup_$(date +%Y%m%d).dump

# Restore from backup
pg_restore -U postgres -d ecommerce backup_20240101.dump

# Automated backup with Docker
docker exec ecommerce_postgres pg_dump -U postgres ecommerce > backup.sql
```

## Performance Tips

1. Always paginate large result sets (`limit` + `offset`)
2. Use `select` to only fetch needed columns
3. Use `relations` only when actually needed (avoid N+1)
4. Add indexes for frequently filtered/sorted columns
5. Use `EXPLAIN ANALYZE` to debug slow queries
6. Consider read replicas for analytics queries
