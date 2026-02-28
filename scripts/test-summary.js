const fs = require("fs");
const path = require("path");

try {
  // Read Playwright test results
  const resultsFile = path.join(__dirname, "../test-results/results.json");

  if (!fs.existsSync(resultsFile)) {
    console.log("No test results found");
    process.exit(0);
  }

  const results = JSON.parse(fs.readFileSync(resultsFile, "utf-8"));

  // Count results
  const suites = results.suites || [];
  let passed = 0;
  let failed = 0;
  let skipped = 0;
  let total = 0;

  suites.forEach((suite) => {
    suite.tests?.forEach((test) => {
      total++;
      if (test.status === "pass") passed++;
      else if (test.status === "fail") failed++;
      else if (test.status === "skip") skipped++;
    });
  });

  // Write summary
  const summary = `## 📊 Test Execution Summary

### Test Statistics
| Status | Count |
|--------|-------|
| ✅ Passed | ${passed} |
| ❌ Failed | ${failed} |
| ⏭️ Skipped | ${skipped} |
| 📝 Total | ${total} |

### Success Rate
${passed > 0 ? `🎯 ${((passed / total) * 100).toFixed(2)}% Success Rate` : "❌ All tests failed"}

### Reports
- 📋 Playwright Report: Check Artifacts
- 📊 Allure Report: Check Artifacts
`;

  // Append to GitHub summary
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (summaryFile) {
    fs.appendFileSync(summaryFile, summary);
  } else {
    console.log(summary);
  }
} catch (error) {
  console.error("Error parsing test results:", error);
  process.exit(1);
}
