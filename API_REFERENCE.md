# 📚 API Reference

## Overview
Complete REST API documentation for IceCream Calorie Tracker backend.

**Base URL**: `http://localhost:5000/api`

**Content-Type**: `application/json`

---

## Authentication
Currently, no authentication required. All endpoints are public.

---

## Response Format

All responses follow this standard format:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

---

## Endpoints

### 1. Add Ice Cream Entry

**POST** `/icecream`

Creates a new ice cream entry with auto-calculated calories.

**Request Body**:
```json
{
  "name": "string (required, 1-50 chars)",
  "type": "enum: cone | cup | sundae",
  "scoops": "integer (required, 1-10)"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Ice cream entry added successfully",
  "data": {
    "id": 1,
    "name": "Vanilla",
    "type": "cone",
    "scoops": 2,
    "calories": 290,
    "createdAt": "2024-04-05T10:30:00.000Z"
  }
}
```

**Error Responses**:
- 400: Missing name - `"Ice cream name is required"`
- 400: Invalid type - `"Invalid ice cream type"`
- 400: Invalid scoops - `"Scoops must be a positive integer"`

**Examples**:

Vanilla Cone:
```bash
curl -X POST http://localhost:5000/api/icecream \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Vanilla",
    "type": "cone",
    "scoops": 1
  }'
```

Mint Cup:
```bash
curl -X POST http://localhost:5000/api/icecream \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mint Choco",
    "type": "cup",
    "scoops": 2
  }'
```

Strawberry Sundae:
```bash
curl -X POST http://localhost:5000/api/icecream \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Strawberry Bliss",
    "type": "sundae",
    "scoops": 3
  }'
```

---

### 2. Get All Ice Cream Entries

**GET** `/icecream`

Retrieves all ice cream entries.

**Query Parameters**: None

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Vanilla",
      "type": "cone",
      "scoops": 2,
      "calories": 290,
      "createdAt": "2024-04-05T10:30:00.000Z"
    },
    {
      "id": 2,
      "name": "Mint Choco",
      "type": "cup",
      "scoops": 1,
      "calories": 100,
      "createdAt": "2024-04-05T10:31:00.000Z"
    }
  ],
  "count": 2
}
```

**Example**:
```bash
curl http://localhost:5000/api/icecream
```

---

### 3. Get Single Ice Cream Entry

**GET** `/icecream/:id`

Retrieves a specific ice cream entry by ID.

**Path Parameters**:
- `id` (integer): Entry ID

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Vanilla",
    "type": "cone",
    "scoops": 2,
    "calories": 290,
    "createdAt": "2024-04-05T10:30:00.000Z"
  }
}
```

**Error Responses**:
- 404: Not found - Entry doesn't exist

**Example**:
```bash
curl http://localhost:5000/api/icecream/1
```

---

### 4. Delete Ice Cream Entry

**DELETE** `/icecream/:id`

Deletes a specific ice cream entry and removes it from totals.

**Path Parameters**:
- `id` (integer): Entry ID to delete

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Ice cream entry deleted successfully",
  "data": {
    "id": 1,
    "name": "Vanilla",
    "type": "cone",
    "scoops": 2,
    "calories": 290,
    "createdAt": "2024-04-05T10:30:00.000Z"
  }
}
```

**Error Responses**:
- 404: Not found - `"Ice cream not found"`

**Example**:
```bash
curl -X DELETE http://localhost:5000/api/icecream/1
```

---

### 5. Get Total Calories

**GET** `/icecream-total`

Returns the sum of all ice cream calories consumed.

**Response** (200 OK):
```json
{
  "success": true,
  "totalCalories": 1250
}
```

**Example**:
```bash
curl http://localhost:5000/api/icecream-total
```

---

### 6. Get Statistics

**GET** `/stats`

Gets comprehensive statistics about ice cream consumption.

**Response** (200 OK):
```json
{
  "success": true,
  "stats": {
    "totalEntries": 5,
    "totalCalories": 1250,
    "avgCaloriesPerEntry": 250,
    "typeBreakdown": {
      "cone": 2,
      "cup": 2,
      "sundae": 1
    }
  }
}
```

**Fields**:
- `totalEntries`: Number of ice cream entries
- `totalCalories`: Sum of all calories
- `avgCaloriesPerEntry`: Average calories per entry (rounded)
- `typeBreakdown`: Count of each type

**Example**:
```bash
curl http://localhost:5000/api/stats
```

---

### 7. Calculate Calories

**POST** `/calculate-calories`

Calculates calories for a hypothetical entry without storing it.

**Request Body**:
```json
{
  "type": "enum: cone | cup | sundae",
  "scoops": "integer (1-10)"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "type": "cone",
  "scoops": 2,
  "calories": 290
}
```

**Use Cases**:
- Preview calories before adding
- Testing calculation logic
- Educational purposes

**Example**:
```bash
curl -X POST http://localhost:5000/api/calculate-calories \
  -H "Content-Type: application/json" \
  -d '{
    "type": "sundae",
    "scoops": 3
  }'
```

---

## Calorie Formulas Reference

### Cone 🍦
```
Base Value per Scoop: 120 kcal
Extra: 50 kcal
Formula: (scoops × 120) + 50

Examples:
- 1 scoop: (1 × 120) + 50 = 170 kcal
- 2 scoops: (2 × 120) + 50 = 290 kcal
- 3 scoops: (3 × 120) + 50 = 410 kcal
```

### Cup 🥣
```
Base Value per Scoop: 100 kcal
Extra: 0 kcal
Formula: scoops × 100

Examples:
- 1 scoop: 1 × 100 = 100 kcal
- 2 scoops: 2 × 100 = 200 kcal
- 3 scoops: 3 × 100 = 300 kcal
```

### Sundae 🍨
```
Base Value per Scoop: 110 kcal
Extra: 80 kcal (toppings)
Formula: (scoops × 110) + 80

Examples:
- 1 scoop: (1 × 110) + 80 = 190 kcal
- 2 scoops: (2 × 110) + 80 = 300 kcal
- 3 scoops: (3 × 110) + 80 = 410 kcal
```

---

## Data Model

### IceCream Entry
```javascript
{
  id: Number,                    // Unique identifier (auto-incremented)
  name: String,                  // Ice cream name (1-50 characters)
  type: String,                  // 'cone' | 'cup' | 'sundae'
  scoops: Number,                // 1-10 scoops
  calories: Number,              // Calculated based on type & scoops
  createdAt: String              // ISO 8601 timestamp
}
```

---

## Error Codes

| Code | Message | Solution |
|------|---------|----------|
| 400 | Ice cream name is required | Provide a non-empty name |
| 400 | Invalid ice cream type | Use: cone, cup, or sundae |
| 400 | Scoops must be a positive integer | Use a number 1-10 |
| 404 | Ice cream not found | Check the ID exists |
| 500 | Internal server error | Check backend logs |

---

## Common Request/Response Patterns

### Pattern 1: Create and Verify
```bash
# Create entry
curl -X POST http://localhost:5000/api/icecream \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","type":"cone","scoops":1}'

# Get all to verify
curl http://localhost:5000/api/icecream
```

### Pattern 2: Batch Operations
```bash
# Create 3 entries
for i in 1 2 3; do
  curl -X POST http://localhost:5000/api/icecream \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Ice$i\",\"type\":\"cone\",\"scoops\":$i}"
done

# Get statistics
curl http://localhost:5000/api/stats

# Get total
curl http://localhost:5000/api/icecream-total
```

### Pattern 3: Cleanup
```bash
# Get all entries
curl http://localhost:5000/api/icecream | jq '.data[].id'

# Delete each
curl -X DELETE http://localhost:5000/api/icecream/1
curl -X DELETE http://localhost:5000/api/icecream/2
# etc...
```

---

## Rate Limiting
Currently disabled. Production deployment should implement rate limiting.

---

## CORS
CORS is enabled for all origins. Production deployment should restrict origins.

---

## Versioning
Current version: 1.0
API URL: `/api` (v1 default)

---

## Health Check

**GET** `/health`

Quick health check endpoint.

**Response**:
```json
{
  "status": "Server is running"
}
```

---

## Testing with cURL

Quick reference for common cURL commands:

```bash
# [Add Entry]
curl -X POST http://localhost:5000/api/icecream \
  -H "Content-Type: application/json" \
  -d '{"name":"Vanilla","type":"cone","scoops":2}'

# [Get All]
curl http://localhost:5000/api/icecream

# [Get Single]
curl http://localhost:5000/api/icecream/1

# [Delete]
curl -X DELETE http://localhost:5000/api/icecream/1

# [Total]
curl http://localhost:5000/api/icecream-total

# [Stats]
curl http://localhost:5000/api/stats

# [Calculate]
curl -X POST http://localhost:5000/api/calculate-calories \
  -H "Content-Type: application/json" \
  -d '{"type":"sundae","scoops":2}'
```

---

## SDK Examples

### JavaScript/Node.js
```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add entry
await api.post('/icecream', {
  name: 'Vanilla',
  type: 'cone',
  scoops: 2
});

// Get all
const response = await api.get('/icecream');
```

### Python
```python
import requests

BASE_URL = 'http://localhost:5000/api'

# Add entry
response = requests.post(f'{BASE_URL}/icecream', json={
    'name': 'Vanilla',
    'type': 'cone',
    'scoops': 2
})

# Get all
response = requests.get(f'{BASE_URL}/icecream')
```

---

**Last Updated**: April 2024
**Status**: ✅ Production Ready
