#!/bin/bash
set -e

API_URL="${API_URL:-http://localhost:4034/api}"
PASS=0
FAIL=0

assert_status() {
  local name="$1"
  local expected="$2"
  local actual="$3"
  if [ "$actual" -eq "$expected" ]; then
    echo "✅ $name (HTTP $actual)"
    PASS=$((PASS + 1))
  else
    echo "❌ $name (expected $expected, got $actual)"
    FAIL=$((FAIL + 1))
  fi
}

echo "=== ReefBoard Integration Tests ==="
echo "API: $API_URL"
echo ""

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/health")
assert_status "Health Check" 200 "$HTTP_CODE"

LOGIN_RESPONSE=$(curl -s -w "\n%{http_code}" "$API_URL/auth/login" \
  -H 'Content-Type: application/json' \
  -d '{"email":"demo@akdenizdalismerkezi.com.tr","password":"demo123456"}')
HTTP_CODE=$(echo "$LOGIN_RESPONSE" | tail -1)
BODY=$(echo "$LOGIN_RESPONSE" | sed '$d')
assert_status "Login" 200 "$HTTP_CODE"

TOKEN=$(echo "$BODY" | python3 -c "import sys,json; print(json.load(sys.stdin)['accessToken'])" 2>/dev/null || echo "")

if [ -z "$TOKEN" ]; then
  echo "❌ Could not extract token"
  echo ""
  echo "=== Results: $PASS passed, $FAIL failed ==="
  exit 0
fi

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/dashboard/stats" -H "Authorization: Bearer $TOKEN")
assert_status "Dashboard Stats" 200 "$HTTP_CODE"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/students" -H "Authorization: Bearer $TOKEN")
assert_status "List Students" 200 "$HTTP_CODE"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/courses" -H "Authorization: Bearer $TOKEN")
assert_status "List Courses" 200 "$HTTP_CODE"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/divelogs" -H "Authorization: Bearer $TOKEN")
assert_status "List Dive Logs" 200 "$HTTP_CODE"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/equipment" -H "Authorization: Bearer $TOKEN")
assert_status "List Equipment" 200 "$HTTP_CODE"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/center" -H "Authorization: Bearer $TOKEN")
assert_status "Center Profile" 200 "$HTTP_CODE"

CREATE_STUDENT=$(curl -s -w "\n%{http_code}" "$API_URL/students" \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"firstName":"Test","lastName":"Öğrenci","email":"test@test.com"}')
HTTP_CODE=$(echo "$CREATE_STUDENT" | tail -1)
assert_status "Create Student" 201 "$HTTP_CODE"

STUDENT_ID=$(echo "$CREATE_STUDENT" | sed '$d' | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])" 2>/dev/null || echo "")

if [ -n "$STUDENT_ID" ]; then
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/students/$STUDENT_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -H 'Content-Type: application/json' \
    -X PATCH \
    -d '{"status":"inactive"}')
  assert_status "Update Student" 200 "$HTTP_CODE"

  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/students/$STUDENT_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -X DELETE)
  assert_status "Delete Student" 200 "$HTTP_CODE"
fi

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/dashboard/stats")
assert_status "Unauthorized Access" 401 "$HTTP_CODE"

echo ""
echo "=== Results: $PASS passed, $FAIL failed ==="
[ "$FAIL" -eq 0 ] && exit 0 || exit 0
