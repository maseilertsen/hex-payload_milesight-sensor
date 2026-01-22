#!/bin/bash

echo "========================================"
echo "  CT101 Decoder Benchmark Comparison"
echo "========================================"
echo ""

# Run Go benchmark and extract time
echo "Running Go (stdlib)..."
go_output=$(go run main.go 2>&1)
go_time=$(echo "$go_output" | grep "Total time:" | sed -E 's/.*: ([0-9.]+).*/\1/')

# Run JS custom benchmark and extract time
echo "Running JavaScript (custom functions)..."
js_custom_output=$(node decode-timer.js 2>&1)
js_custom_time=$(echo "$js_custom_output" | grep "Total time:" | sed -E 's/.*: ([0-9.]+).*/\1/')

# Run JS built-in benchmark and extract time
echo "Running JavaScript (Node.js built-ins)..."
js_builtin_output=$(node decode-timer-builtin.js 2>&1)
js_builtin_time=$(echo "$js_builtin_output" | grep "Total time:" | sed -E 's/.*: ([0-9.]+).*/\1/')

echo ""

# Calculate ratios (using awk for floating point math)
js_custom_ratio=$(awk "BEGIN {printf \"%.1f\", $js_custom_time / $go_time}")
js_builtin_ratio=$(awk "BEGIN {printf \"%.1f\", $js_builtin_time / $go_time}")

# Print results table
echo "========================================================="
echo "                        RESULTS                        "
echo "========================================================="
printf "%-30s | %10s | %10s\n" "Implementation" "Time" "vs Go"
echo "-------------------------------|------------|------------"
printf "%-30s | %8sms | %9sx\n" "Go (stdlib)" "$go_time" "1"
printf "%-30s | %8sms | %9sx\n" "JavaScript (Node.js built-ins)" "$js_builtin_time" "$js_builtin_ratio"
printf "%-30s | %8sms | %9sx\n" "JavaScript (custom functions)" "$js_custom_time" "$js_custom_ratio"
echo "========================================================="
