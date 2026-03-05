#!/usr/bin/env bash
# TDD test for 003_analytics.sql migration
# RED: Run before migration file exists — should fail
# GREEN: Run after migration file exists — should pass

set -e

MIGRATION_FILE="$(dirname "$0")/003_analytics.sql"

echo "=== Testing 003_analytics.sql migration structure ==="

# Test 1: File must exist
if [ ! -f "$MIGRATION_FILE" ]; then
  echo "FAIL: $MIGRATION_FILE does not exist"
  exit 1
fi
echo "PASS: Migration file exists"

# Test 2: platform_analytics table must be defined with CHECK constraint
if ! grep -q "CHECK (platform IN ('youtube', 'twitter', 'instagram', 'threads', 'substack'))" "$MIGRATION_FILE"; then
  echo "FAIL: platform_analytics missing CHECK constraint on platform column"
  exit 1
fi
echo "PASS: platform_analytics has CHECK constraint on platform values"

# Test 3: platform_analytics must have metric_date as DATE type
if ! grep -q "metric_date DATE" "$MIGRATION_FILE"; then
  echo "FAIL: platform_analytics missing metric_date DATE column"
  exit 1
fi
echo "PASS: platform_analytics has metric_date DATE column"

# Test 4: ai_usage table must exist
if ! grep -q "CREATE TABLE IF NOT EXISTS ai_usage" "$MIGRATION_FILE"; then
  echo "FAIL: ai_usage table missing"
  exit 1
fi
echo "PASS: ai_usage table defined"

# Test 5: ai_cost_tracking VIEW must exist
if ! grep -q "CREATE OR REPLACE VIEW ai_cost_tracking" "$MIGRATION_FILE"; then
  echo "FAIL: ai_cost_tracking view missing"
  exit 1
fi
echo "PASS: ai_cost_tracking view defined"

# Test 6: monthly_cost_summary VIEW must exist
if ! grep -q "CREATE OR REPLACE VIEW monthly_cost_summary" "$MIGRATION_FILE"; then
  echo "FAIL: monthly_cost_summary view missing"
  exit 1
fi
echo "PASS: monthly_cost_summary view defined"

# Test 7: brand CHECK constraint must include both brands
if ! grep -q "brand IN ('sameer_automations', 'raj_photo_video')" "$MIGRATION_FILE"; then
  echo "FAIL: platform_analytics missing brand CHECK constraint"
  exit 1
fi
echo "PASS: platform_analytics has brand CHECK constraint for multi-brand routing"

# Test 8: UNIQUE constraint on (content_bank_id, platform, metric_date)
if ! grep -q "UNIQUE(content_bank_id, platform, metric_date)" "$MIGRATION_FILE"; then
  echo "FAIL: platform_analytics missing UNIQUE constraint"
  exit 1
fi
echo "PASS: UNIQUE constraint on (content_bank_id, platform, metric_date) present"

# Test 9: budget_status logic in monthly_cost_summary
if ! grep -q "OVER BUDGET" "$MIGRATION_FILE"; then
  echo "FAIL: monthly_cost_summary missing OVER BUDGET budget_status"
  exit 1
fi
echo "PASS: monthly_cost_summary has OVER BUDGET budget_status"

# Test 10: Multi-brand routing documentation present
if ! grep -q "MULTI-BRAND ROUTING PATTERN" "$MIGRATION_FILE"; then
  echo "FAIL: Multi-brand routing pattern comment missing"
  exit 1
fi
echo "PASS: Multi-brand routing pattern documented in migration"

# Count CREATE TABLE and CREATE VIEW statements
TABLE_VIEW_COUNT=$(grep -c "CREATE TABLE\|CREATE OR REPLACE VIEW" "$MIGRATION_FILE" || true)
if [ "$TABLE_VIEW_COUNT" -lt 4 ]; then
  echo "FAIL: Expected at least 4 CREATE TABLE/VIEW statements, found $TABLE_VIEW_COUNT"
  exit 1
fi
echo "PASS: Found $TABLE_VIEW_COUNT CREATE TABLE/VIEW statements"

echo ""
echo "=== ALL TESTS PASSED ==="
