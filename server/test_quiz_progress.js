// Automated verification test for Person C1 & Person C2 flows

const BASE = 'http://localhost:5000/api';

async function runQuizProgressTests() {
  console.log('🧪 Running Person C1 & C2 Quiz, Progress & Gamification Tests...\n');

  // 1. Fetch Quiz for m1 (Right to Education)
  const quizRes = await fetch(`${BASE}/quizzes/m1`).then((r) => r.json());
  console.log('1. Fetch Quiz (m1):', quizRes.success ? '✅ PASS' : '❌ FAIL');
  if (!quizRes.success || !quizRes.quiz) {
    throw new Error('Failed to fetch quiz');
  }
  console.log(`   Module: ${quizRes.quiz.moduleId}, Questions count: ${quizRes.quiz.questions.length}`);

  // 2. Register fresh test child to verify starting at Level 1, 0 XP
  const testEmail = `test_c2_${Date.now()}@edurights.org`;
  const regRes = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Rohan Test',
      email: testEmail,
      password: 'password123',
      age: 12,
      avatar: 'superhero-aarav',
    }),
  }).then((r) => r.json());

  console.log('2. Register Test Child:', regRes.success ? '✅ PASS' : '❌ FAIL');
  console.log(`   Initial Level: ${regRes.user.currentLevel} (${regRes.user.levelTitle}), Total XP: ${regRes.user.totalPoints}`);
  const token = regRes.token;

  // 3. Prepare answers for m1
  // Correct answers:
  // Q1: "6 to 14 years"
  // Q2: "RTE Act 2009"
  // Q3: "No, admission cannot be denied"
  // Q4: "Knowledge, equality, and opportunities"
  const answers = {};
  quizRes.quiz.questions.forEach((q) => {
    // Pick the expected correct answer from options
    if (q.options.includes('6 to 14 years')) answers[q.id] = '6 to 14 years';
    else if (q.options.includes('RTE Act 2009')) answers[q.id] = 'RTE Act 2009';
    else if (q.options.includes('No, admission cannot be denied')) answers[q.id] = 'No, admission cannot be denied';
    else if (q.options.includes('Knowledge, equality, and opportunities')) answers[q.id] = 'Knowledge, equality, and opportunities';
    else answers[q.id] = q.options[0];
  });

  // 4. Submit Quiz
  const submitRes = await fetch(`${BASE}/quizzes/m1/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ answers }),
  }).then((r) => r.json());

  console.log('3. Submit Quiz (m1):', submitRes.success ? '✅ PASS' : '❌ FAIL');
  console.log(`   Score: ${submitRes.result?.score}/${submitRes.result?.totalPoints} (${submitRes.result?.percentage}%)`);
  console.log(`   New Total XP: ${submitRes.userProgress?.totalPoints}`);
  console.log(`   New Level: ${submitRes.userProgress?.currentLevel} (${submitRes.userProgress?.levelTitle})`);
  console.log(`   Badges Awarded:`, submitRes.userProgress?.badgesEarned?.map((b) => b.name));

  // 5. Query user progress API (Person C2 requirement)
  const progressRes = await fetch(`${BASE}/quizzes/user/progress`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());

  console.log('4. User Progress API (/api/quizzes/user/progress):', progressRes.success ? '✅ PASS' : '❌ FAIL');
  console.log(`   Completed Modules: ${progressRes.userProgress?.completedModules?.length}`);
  console.log(`   Badges Count: ${progressRes.userProgress?.badgesEarned?.length}`);

  // Assertions
  const passed =
    quizRes.success &&
    regRes.success &&
    submitRes.success &&
    submitRes.result?.score === 100 &&
    submitRes.userProgress?.totalPoints >= 100 &&
    submitRes.userProgress?.badgesEarned?.length >= 2 &&
    progressRes.success;

  if (passed) {
    console.log('\n🎉 ALL PERSON C1 & C2 BACKEND INTEGRATION TESTS PASSED!');
    process.exit(0);
  } else {
    console.error('\n❌ Test assertion failure!');
    process.exit(1);
  }
}

runQuizProgressTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
