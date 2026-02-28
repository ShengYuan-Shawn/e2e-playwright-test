const fs = require('fs');
const path = require('path');

try {
  const resultsFile = path.join(__dirname, '../test-results/results.json');
  
  if (!fs.existsSync(resultsFile)) {
    console.log('No test results found');
    process.exit(0);
  }

  const resultsData = fs.readFileSync(resultsFile, 'utf-8');
  
  if (!resultsData || resultsData.trim() === '') {
    console.log('Test results file is empty');
    process.exit(0);
  }

  const results = JSON.parse(resultsData);
  
  let passed = 0;
  let failed = 0;
  let skipped = 0;
  let total = 0;

  // Navigate the nested structure
  if (results.suites && Array.isArray(results.suites)) {
    results.suites.forEach(fileSuite => {
      // Each file suite contains nested suites
      if (fileSuite.suites && Array.isArray(fileSuite.suites)) {
        fileSuite.suites.forEach(testSuite => {
          // Each test suite contains specs
          if (testSuite.specs && Array.isArray(testSuite.specs)) {
            testSuite.specs.forEach(spec => {
              // Each spec has tests
              if (spec.tests && Array.isArray(spec.tests)) {
                spec.tests.forEach(test => {
                  // Each test has results
                  if (test.results && Array.isArray(test.results)) {
                    test.results.forEach(result => {
                      total++;
                      if (result.status === 'passed') passed++;
                      else if (result.status === 'failed') failed++;
                      // Check if skipped
                      if (spec.ok === false) skipped++;
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  // Get stats from the results object (more reliable)
  if (results.stats) {
    passed = results.stats.expected || 0;
    failed = results.stats.unexpected || 0;
    skipped = results.stats.skipped || 0;
    total = passed + failed + skipped;
  }

  const summary = `## 📊 Test Execution Summary

### Test Statistics
| Status | Count |
|--------|-------|
| ✅ Passed | ${passed} |
| ❌ Failed | ${failed} |
| ⏭️ Skipped | ${skipped} |
| 📝 Total | ${total} |

### Success Rate
${total > 0 && passed > 0 ? `🎯 ${((passed / total) * 100).toFixed(2)}% Success Rate` : total === 0 ? '⚠️ No tests found' : '❌ All tests failed'}

### Reports
- 📋 Playwright Report: Check Artifacts
- 📊 Allure Report: Check Artifacts
`;

  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (summaryFile) {
    fs.appendFileSync(summaryFile, summary);
  } else {
    console.log(summary);
  }
} catch (error) {
  console.error('Error parsing test results:', error);
  process.exit(1);
}