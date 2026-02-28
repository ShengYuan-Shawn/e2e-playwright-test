import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

interface TestCase {
  status: "pass" | "fail" | "skip";
  title: string;
}

interface TestSuite {
  title: string;
  tests?: TestCase[];
}

interface TestResults {
  suites?: TestSuite[];
}

try {
  // Get __dirname equivalent in ES modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Read Playwright test results
  const resultsFile = path.join(__dirname, "../test-results/results.json");

  if (!fs.existsSync(resultsFile)) {
    console.log("No test results found");
    process.exit(0);
  }

  const resultsData = fs.readFileSync(resultsFile, "utf-8");
  const results: TestResults = JSON.parse(resultsData);

  // Count results
  const suites = results.suites || [];
  let passed = 0;
  let failed = 0;
  let skipped = 0;
  let total = 0;

  suites.forEach((suite: TestSuite) => {
    suite.tests?.forEach((test: TestCase) => {
      total++;
      if (test.status === "pass") passed++;
      else if (test.status === "fail") failed++;
      else if (test.status === "skip") skipped++;
    });
  });

  // Calculate success rate
  const successRate = total > 0 ? ((passed / total) * 100).toFixed(2) : "0.00";

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
${passed > 0 ? `🎯 ${successRate}% Success Rate` : "❌ All tests failed"}

### Reports
- 📋 Playwright Report: Check Artifacts
- 📊 Allure Report: Check Artifacts
`;

  // Append to GitHub summary
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (summaryFile) {
    fs.appendFileSync(summaryFile, summary);
    console.log("✅ Summary written to GitHub Step Summary");
  } else {
    console.log(summary);
  }
} catch (error) {
  console.error("Error parsing test results:", error);
  process.exit(1);
}
