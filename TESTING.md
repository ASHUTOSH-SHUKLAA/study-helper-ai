# Testing Guide

## Automated Backend Tests

Run the automated test suite:

```bash
cd backend
npm start  # In one terminal
npm test   # In another terminal
```

Expected output:
```
✅ PASSED: Health Check
✅ PASSED: Valid Topic Request
✅ PASSED: Math Mode Request
✅ PASSED: Missing Topic Parameter
✅ PASSED: Invalid Endpoint

TEST SUMMARY: 5/5 PASSED
```

## Manual Testing Checklist

### Test 1: Basic Topic Search
**Objective**: Verify basic functionality works

1. Open the app
2. Enter topic: "photosynthesis"
3. Click "Generate Study Materials"

**Expected Results**:
- ✅ Loading spinner appears
- ✅ Summary section shows 3 bullet points
- ✅ Quiz section shows 3 multiple-choice questions
- ✅ Study tip appears at bottom
- ✅ Wikipedia link is present
- ✅ Topic is added to history

**Pass Criteria**: All content loads without errors

---

### Test 2: Math Mode
**Objective**: Verify math mode generates quantitative questions

1. Enter topic: "algebra"
2. Check "Math Mode" checkbox
3. Click "Generate Study Materials"

**Expected Results**:
- ✅ Summary has 3 points
- ✅ Quiz shows 1 mathematical problem
- ✅ Answer is displayed
- ✅ Explanation is provided
- ✅ No multiple choice options shown

**Pass Criteria**: Math question format is correct

---

### Test 3: Quiz Interaction
**Objective**: Test quiz functionality

1. Search any topic (regular mode)
2. Select answers for all 3 questions
3. Click "Submit Answers"
4. Review results
5. Click "Try Again"

**Expected Results**:
- ✅ Can select one answer per question
- ✅ Submit button disabled until all answered
- ✅ Correct answers show green checkmark
- ✅ Incorrect answers show red X
- ✅ Score is displayed (e.g., "2/3")
- ✅ "Try Again" resets the quiz

**Pass Criteria**: Quiz interaction works smoothly

---

### Test 4: Topic History
**Objective**: Verify history tracking

1. Search for "biology"
2. Search for "chemistry"
3. Search for "physics"
4. Check history sidebar

**Expected Results**:
- ✅ All 3 topics appear in history
- ✅ Most recent topic is at top
- ✅ Timestamps show (e.g., "Just now", "2m ago")
- ✅ Clicking history item works
- ✅ Math mode indicator shows if applicable
- ✅ Clear history button works

**Pass Criteria**: History persists and functions correctly

---

### Test 5: Dark Mode
**Objective**: Test theme switching

1. Click dark mode toggle (moon icon)
2. Verify all sections update
3. Refresh the page
4. Toggle back to light mode

**Expected Results**:
- ✅ All text remains readable
- ✅ Cards change background color
- ✅ Borders adjust appropriately
- ✅ Icons change color
- ✅ Preference persists after refresh
- ✅ Smooth transition animation

**Pass Criteria**: Dark mode works without visual issues

---

### Test 6: Error Handling
**Objective**: Verify error states work

**Test 6a: Empty Topic**
1. Leave topic field empty
2. Click submit

**Expected**: Error message "Please enter a topic"

**Test 6b: Backend Offline**
1. Stop the backend server
2. Try to search a topic

**Expected**: Error message about connection failure

**Test 6c: Invalid Topic**
1. Enter gibberish: "asdfghjkl123456"
2. Submit

**Expected**: Either generates content or shows appropriate error

**Pass Criteria**: Errors are user-friendly and clear

---

### Test 7: Responsive Design
**Objective**: Test mobile compatibility

1. Open browser dev tools (F12)
2. Toggle device toolbar
3. Test on different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)

**Expected Results**:
- ✅ Layout adjusts appropriately
- ✅ Text remains readable
- ✅ Buttons are tappable
- ✅ No horizontal scrolling
- ✅ History sidebar stacks on mobile
- ✅ Quiz options don't overflow

**Pass Criteria**: App is usable on all screen sizes

---

### Test 8: Performance
**Objective**: Verify acceptable load times

1. Search for "machine learning"
2. Time the response

**Expected Results**:
- ✅ Response within 5-10 seconds
- ✅ Loading indicator shows
- ✅ No browser freezing
- ✅ Smooth animations

**Pass Criteria**: Acceptable performance

---

### Test 9: Edge Cases
**Objective**: Test unusual inputs

**Test 9a: Very Long Topic**
```
Enter: "The complete history of the Roman Empire including all major battles, political changes, and cultural developments from 753 BC to 476 AD"
```

**Expected**: Handles gracefully, may truncate

**Test 9b: Special Characters**
```
Enter: "C++ programming & <HTML> tags"
```

**Expected**: Processes without breaking

**Test 9c: Numbers Only**
```
Enter: "12345"
```

**Expected**: Generates content or appropriate error

**Pass Criteria**: No crashes or broken UI

---

### Test 10: Multiple Sessions
**Objective**: Test concurrent usage

1. Open app in two different browsers
2. Search different topics in each
3. Verify both work independently

**Expected Results**:
- ✅ Both sessions work
- ✅ History is separate per browser
- ✅ No interference between sessions

**Pass Criteria**: Multi-user support works

---

## API Testing with cURL

### Test Health Endpoint
```bash
curl http://localhost:5000/health
```

Expected:
```json
{"status":"ok","timestamp":"..."}
```

### Test Study Endpoint
```bash
curl "http://localhost:5000/study?topic=photosynthesis"
```

Expected: JSON with summary, quiz, studyTip

### Test Math Mode
```bash
curl "http://localhost:5000/study?topic=calculus&mode=math"
```

Expected: JSON with math question format

### Test Error Handling
```bash
curl "http://localhost:5000/study"
```

Expected: 400 error with message

## Browser Compatibility

Test on:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (if on Mac)

## Accessibility Testing

1. Tab through the interface
2. Verify keyboard navigation works
3. Check color contrast
4. Test with screen reader (optional)

## Performance Metrics

Use browser DevTools:
- Network tab: Check request times
- Performance tab: Check rendering
- Console: Verify no errors

## Test Report Template

```
Date: ___________
Tester: ___________
Environment: Local / Deployed

Test Results:
[ ] Test 1: Basic Topic Search
[ ] Test 2: Math Mode
[ ] Test 3: Quiz Interaction
[ ] Test 4: Topic History
[ ] Test 5: Dark Mode
[ ] Test 6: Error Handling
[ ] Test 7: Responsive Design
[ ] Test 8: Performance
[ ] Test 9: Edge Cases
[ ] Test 10: Multiple Sessions

Issues Found:
1. ___________
2. ___________

Overall Status: PASS / FAIL
Notes: ___________
```

## Continuous Testing

Before each deployment:
1. Run automated tests
2. Complete manual checklist
3. Test on staging environment
4. Verify all features work
5. Check error logs
6. Monitor performance

## Known Limitations

- Free tier AI APIs have rate limits
- Backend may sleep on free hosting
- First request after sleep is slow
- Mock data used as fallback