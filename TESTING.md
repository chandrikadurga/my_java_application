# 🧪 Testing Guide

## Automated Test Cases

### Test Suite 1: Backend API Validation

#### TC-1: Add Valid Ice Cream Entry
```bash
POST /api/icecream
{
  "name": "Vanilla",
  "type": "cone",
  "scoops": 2
}
Expected: 201, status: true, calories: 290
```

#### TC-2: Add Ice Cream - Negative Validation
```bash
POST /api/icecream
{
  "name": "",
  "type": "cone",
  "scoops": 2
}
Expected: 400, error message
```

#### TC-3: Get All Entries
```bash
GET /api/icecream
Expected: 200, Array of entries, count property
```

#### TC-4: Delete Entry
```bash
DELETE /api/icecream/1
Expected: 200, success: true
```

#### TC-5: Total Calories
```bash
GET /api/icecream-total
Expected: 200, totalCalories: number
```

#### TC-6: Get Stats
```bash
GET /api/stats
Expected: 200, stats with totalEntries, totalCalories, avgCaloriesPerEntry, typeBreakdown
```

---

### Test Suite 2: Calorie Calculation

#### TC-7: Cone Calculation (1 scoop)
```
Formula: (1 × 120) + 50 = 170 kcal
Expected: 170
```

#### TC-8: Cone Calculation (2 scoops)
```
Formula: (2 × 120) + 50 = 290 kcal
Expected: 290
```

#### TC-9: Cup Calculation
```
Formula: (3 × 100) = 300 kcal
Expected: 300
```

#### TC-10: Sundae Calculation
```
Formula: (2 × 110) + 80 = 300 kcal
Expected: 300
```

---

### Test Suite 3: Frontend UI/UX

#### TC-11: Form Submission
1. Enter name: "Chocolate"
2. Select type: "Cup"
3. Enter scoops: "3"
4. Click "Add Ice Cream"
Expected: Entry appears in list, toast shows

#### TC-12: Real-time Calorie Preview
1. Select type: "Cone"
2. Change scoops: "1" → "2" → "3"
Expected: Calorie preview updates in real-time

#### TC-13: List Display
1. Add 3 entries
Expected: All 3 appear in list, sorted by calories descending

#### TC-14: Delete Functionality
1. Add entry
2. Click delete button
Expected: Entry removed, total updates

#### TC-15: Dark Mode Toggle
1. Click moon icon
Expected: Theme switches, content readable

#### TC-16: Total Calories Update
1. Add entry (290 kcal)
2. Add entry (300 kcal)
3. Delete first entry
Expected: Total: 590 → 300

---

### Test Suite 4: Frontend Validation

#### TC-17: Empty Name Validation
1. Leave name empty
2. Click "Add Ice Cream"
Expected: Error message shown, API not called

#### TC-18: Invalid Scoops
1. Enter scoops: "0" or "-5"
2. Click "Add Ice Cream"
Expected: Error message shown

#### TC-19: Max Scoops Limit
1. Try to set scoops > 10
Expected: Disabled or capped at 10

#### TC-20: Name Length Limit
1. Enter name > 50 chars
Expected: Truncated to 50 or not allowed

---

### Test Suite 5: Data Integrity

#### TC-21: Data Persistence Check
1. Add 5 entries
2. Refresh page
Expected: Data persists (until server restart)

#### TC-22: Concurrent Operations
1. Add multiple entries quickly
Expected: All entries created, UI consistent

#### TC-23: Type Breakdown Accuracy
1. Add: 2 cones, 1 cup, 2 sundaes
2. Check stats
Expected: typeBreakdown: {cone: 2, cup: 1, sundae: 2}

---

## Manual Testing Worksheet

### Scenario 1: Daily Tracking (Light)
```
Step 1: Add Vanilla Cone (2 scoops) → 290 kcal
Step 2: Add Chocolate Cup (1 scoop) → 100 kcal
Step 3: Add Strawberry Cone (1 scoop) → 170 kcal

Expected Results:
- Total: 560 kcal
- Entries: 3
- Average: 186.67 kcal
- Status: Light 💪
- Progress Bar: ~28%
```

### Scenario 2: Heavy Day
```
Step 1: Add Cookies & Cream Sundae (3 scoops) → 410 kcal
Step 2: Add Mint Cup (2 scoops) → 200 kcal
Step 3: Add Pistachio Cone (2 scoops) → 290 kcal
Step 4: Add Mango Cone (1 scoop) → 170 kcal

Expected Results:
- Total: 1070 kcal
- Progress Bar: ~53%
- Status: Moderate ⚡
- All entries displayed
- Can sort and delete
```

### Scenario 3: Delete & Update
```
Step 1: Add 5 entries
Step 2: Note total calories
Step 3: Delete entry with highest calories
Step 4: Verify total reduced correctly
Step 5: Delete multiple entries sequentially
Step 6: Verify stats update each time
```

---

## Performance Tests

### Load Test
```
Action: Add 50 entries rapidly
Expected: 
- UI remains responsive
- All entries stored
- Calculations correct
- No console errors
```

### Memory Test
```
Action: Add entries, delete, add again (repeat 10x)
Expected:
- No memory leaks
- Clean state between operations
- Console clear of errors
```

---

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---

## Accessibility Tests

- [ ] Keyboard navigation works
- [ ] Color contrast sufficient
- [ ] Form labels present
- [ ] Error messages clear
- [ ] Mobile-friendly touch targets

---

## Error Recovery Tests

### TC-24: Backend Down Scenario
1. Stop backend server
2. Try to add entry
Expected: Error message, user informed

### TC-25: Invalid Response
1. Modify server response
2. Check frontend handling
Expected: Graceful error handling

---

## Performance Metrics

```
Frontend Build: < 5s
Backend Start: < 2s
API Response: < 200ms
First Paint: < 1s
Page Load: < 3s
```

---

## Test Report Template

```
Test ID: TC-XX
Test Name: 
Status: PASS / FAIL
Date: 
Tester: 
Browser/Platform: 
Expected Result: 
Actual Result: 
Notes: 
```

---

**All tests should pass before considering the app production-ready!**
