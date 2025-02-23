## How to start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## API Routes & Examples

### Apparel Endpoints

#### Get All Apparels
```http
GET /api/apparel

Response:
[
  {
    "code": "1",
    "size": "M",
    "stock": [
      {
        "vendorId": "vendorA",
        "quality": "low",
        "price": 10
      }
    ]
  }
]
```

#### Update Single Apparel Stock
```http
PATCH /api/apparel/update
Content-Type: application/json

{
  "code": "1",
  "size": "M",
  "vendor": "vendorD",
  "price": 15,
  "quality": "medium"
}
```

#### Bulk Update Apparel Stock
```http
PATCH /api/apparel/bulkUpdate
Content-Type: application/json

{
  "updates": [
    {
      "code": "1",
      "size": "M",
      "vendor": "vendorE",
      "price": 25,
      "quality": "high"
    },
    {
      "code": "2",
      "size": "L",
      "vendor": "vendorF",
      "price": 30,
      "quality": "premium"
    }
  ]
}
```

### Order Endpoints

#### Check Item Availability
```http
POST /api/order/checkAvailability
Content-Type: application/json

{
  "order": [
    {
      "code": "1",
      "size": "M"
    }
  ]
}

Response:
{
  "available": true
}
```

#### Get Lowest Cost for Order
```http
POST /api/order/getLowestCost
Content-Type: application/json

{
  "order": [
    {
      "code": "1",
      "size": "M"
    }
  ]
}

Response:
{
  "totalCost": 5,
  "items": [
    {
      "code": "1",
      "size": "M",
      "selectedVendor": {
        "vendorId": "vendorC",
        "price": 5,
        "quality": "low"
      }
    }
  ]
}
```

## Testing
You can test these APIs using tools like:
- Postman
- Thunder Client (VS Code Extension)

Server runs on port 3000 by default: `http://localhost:3000`