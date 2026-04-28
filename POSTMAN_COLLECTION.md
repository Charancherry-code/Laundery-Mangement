# Postman Collection - Laundry Order Management System

## Base URL
```
http://localhost:5000/api/orders
```

## Endpoints

### 1. Create Order
**Method:** POST  
**URL:** `http://localhost:5000/api/orders`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "customerName": "John Doe",
  "phone": "1234567890",
  "garments": [
    {
      "type": "Shirt",
      "quantity": 5,
      "price": 2.50
    },
    {
      "type": "Pants",
      "quantity": 3,
      "price": 3.00
    }
  ],
  "estimatedDeliveryDate": "2024-05-01"
}
```

**Response (201 Created):**
```json
{
  "_id": "663abc123def456789",
  "orderId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "customerName": "John Doe",
  "phone": "1234567890",
  "garments": [
    {
      "type": "Shirt",
      "quantity": 5,
      "price": 2.5
    },
    {
      "type": "Pants",
      "quantity": 3,
      "price": 3
    }
  ],
  "totalAmount": 21.5,
  "status": "RECEIVED",
  "estimatedDeliveryDate": "2024-05-01T00:00:00.000Z",
  "createdAt": "2024-04-28T10:30:00.000Z",
  "updatedAt": "2024-04-28T10:30:00.000Z",
  "__v": 0
}
```

---

### 2. Get All Orders
**Method:** GET  
**URL:** `http://localhost:5000/api/orders`

**Query Parameters (optional):**
- `status` - Filter by status (RECEIVED, PROCESSING, READY, DELIVERED)
- `customerName` - Filter by customer name
- `phone` - Filter by phone number

**Example with filters:**
```
GET http://localhost:5000/api/orders?status=PROCESSING&customerName=John
```

**Response (200 OK):**
```json
[
  {
    "_id": "663abc123def456789",
    "orderId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "customerName": "John Doe",
    "phone": "1234567890",
    "garments": [
      {
        "type": "Shirt",
        "quantity": 5,
        "price": 2.5
      }
    ],
    "totalAmount": 12.5,
    "status": "PROCESSING",
    "createdAt": "2024-04-28T10:30:00.000Z",
    "updatedAt": "2024-04-28T10:35:00.000Z"
  }
]
```

---

### 3. Get Order by ID
**Method:** GET  
**URL:** `http://localhost:5000/api/orders/:orderId`

**Example:**
```
GET http://localhost:5000/api/orders/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**Response (200 OK):**
```json
{
  "_id": "663abc123def456789",
  "orderId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "customerName": "John Doe",
  "phone": "1234567890",
  "garments": [
    {
      "type": "Shirt",
      "quantity": 5,
      "price": 2.5
    }
  ],
  "totalAmount": 12.5,
  "status": "RECEIVED",
  "createdAt": "2024-04-28T10:30:00.000Z",
  "updatedAt": "2024-04-28T10:30:00.000Z"
}
```

---

### 4. Update Order Status
**Method:** PATCH  
**URL:** `http://localhost:5000/api/orders/:orderId/status`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "status": "PROCESSING"
}
```

**Valid Status Values:**
- RECEIVED
- PROCESSING
- READY
- DELIVERED

**Response (200 OK):**
```json
{
  "_id": "663abc123def456789",
  "orderId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "customerName": "John Doe",
  "phone": "1234567890",
  "garments": [
    {
      "type": "Shirt",
      "quantity": 5,
      "price": 2.5
    }
  ],
  "totalAmount": 12.5,
  "status": "PROCESSING",
  "createdAt": "2024-04-28T10:30:00.000Z",
  "updatedAt": "2024-04-28T10:35:00.000Z"
}
```

---

### 5. Delete Order
**Method:** DELETE  
**URL:** `http://localhost:5000/api/orders/:orderId`

**Example:**
```
DELETE http://localhost:5000/api/orders/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**Response (200 OK):**
```json
{
  "message": "Order deleted successfully"
}
```

---

### 6. Get Dashboard Statistics
**Method:** GET  
**URL:** `http://localhost:5000/api/orders/dashboard`

**Response (200 OK):**
```json
{
  "totalOrders": 25,
  "totalRevenue": 542.5,
  "statusCounts": {
    "RECEIVED": 5,
    "PROCESSING": 10,
    "READY": 7,
    "DELIVERED": 3
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Customer name, phone, and at least one garment are required"
}
```

### 404 Not Found
```json
{
  "error": "Order not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Import as Postman Collection

To import these requests into Postman:

1. Copy the JSON below
2. Open Postman
3. Click "Import" in the top left
4. Paste the JSON and import

```json
{
  "info": {
    "name": "Laundry Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create Order",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": {
          "raw": "http://localhost:5000/api/orders",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "orders"]
        },
        "body": {
          "mode": "raw",
          "raw": "{\n  \"customerName\": \"John Doe\",\n  \"phone\": \"1234567890\",\n  \"garments\": [\n    {\n      \"type\": \"Shirt\",\n      \"quantity\": 5,\n      \"price\": 2.50\n    }\n  ]\n}"
        }
      }
    },
    {
      "name": "Get All Orders",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:5000/api/orders",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "orders"]
        }
      }
    },
    {
      "name": "Get Order by ID",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:5000/api/orders/:orderId",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "orders", ":orderId"],
          "variable": [
            {
              "key": "orderId",
              "value": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
            }
          ]
        }
      }
    },
    {
      "name": "Update Order Status",
      "request": {
        "method": "PATCH",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": {
          "raw": "http://localhost:5000/api/orders/:orderId/status",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "orders", ":orderId", "status"],
          "variable": [
            {
              "key": "orderId",
              "value": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
            }
          ]
        },
        "body": {
          "mode": "raw",
          "raw": "{\n  \"status\": \"PROCESSING\"\n}"
        }
      }
    },
    {
      "name": "Delete Order",
      "request": {
        "method": "DELETE",
        "url": {
          "raw": "http://localhost:5000/api/orders/:orderId",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "orders", ":orderId"],
          "variable": [
            {
              "key": "orderId",
              "value": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
            }
          ]
        }
      }
    },
    {
      "name": "Get Dashboard",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:5000/api/orders/dashboard",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "orders", "dashboard"]
        }
      }
    }
  ]
}
```
