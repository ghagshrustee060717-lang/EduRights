// Test quiz retake and score synchronization
const BASE = 'http://localhost:5000/api';

async function testRetake() {
  console.log('🧪 Testing Retake and Score Synchronization...');

  // 1. Register new user
  const email = `test_retake_${Date.now()}@edurights.org`;
  const regRes = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Retake Tester',
      email,
      password: 'password123',
      age: 11,
    }),
  }).then((r) => r.json());

  const token = regRes.token;
  console.log('1. User registered. Initial totalPoints:', regRes.user.totalPoints);
  if (regRes.user.totalPoints !== 0) {
    throw new Error(`Expected initial totalPoints 0, got ${regRes.user.totalPoints}`);
  }

  // 2. Complete the lesson and earn the first half of its XP
  const lessonRes = await fetch(`${BASE}/users/award-points`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      completedModule: { moduleId: 'm1', title: 'Right to Education' },
    }),
  }).then((r) => r.json());

  if (!lessonRes.success || lessonRes.user.totalPoints !== 67) {
    throw new Error('Expected first lesson completion to award its share of 200 XP.');
  }

  // 3. Fetch quiz questions for m1
  const m1Quiz = await fetch(`${BASE}/quizzes/m1`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());

  const questions = m1Quiz.quiz.questions;
  // Submit with only 1 correct answer (score = 25)
  const answersPartial = {};
  questions.forEach((q, idx) => {
    if (idx === 0 && q.options.includes('6 to 14 years')) {
      answersPartial[q.id] = '6 to 14 years';
    } else {
      answersPartial[q.id] = 'Wrong Answer';
    }
  });

  const submit1 = await fetch(`${BASE}/quizzes/m1/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ answers: answersPartial }),
  }).then((r) => r.json());

  console.log('2. First submission (partial): Score =', submit1.result.score, 'Total XP =', submit1.userProgress.totalPoints);
  if (submit1.result.score !== 25 || submit1.userProgress.totalPoints !== 167) {
    throw new Error('Mismatch on first attempt!');
  }
  if (submit1.userProgress.completedModules[0]?.quizCompleted !== true) {
    throw new Error('Quiz completion was not recorded.');
  }

  // 4. RETAKE quiz with ALL 4 correct answers (score = 100)
  const answersFull = {};
  questions.forEach((q) => {
    if (q.options.includes('6 to 14 years')) answersFull[q.id] = '6 to 14 years';
    else if (q.options.includes('RTE Act 2009')) answersFull[q.id] = 'RTE Act 2009';
    else if (q.options.includes('No, admission cannot be denied')) answersFull[q.id] = 'No, admission cannot be denied';
    else if (q.options.includes('Knowledge, equality, and opportunities')) answersFull[q.id] = 'Knowledge, equality, and opportunities';
    else answersFull[q.id] = q.options[0];
  });

  const submitRetake = await fetch(`${BASE}/quizzes/m1/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ answers: answersFull }),
  }).then((r) => r.json());

  console.log('3. Retake submission (full): Score =', submitRetake.result.score, 'Total XP =', submitRetake.userProgress.totalPoints);
  console.log('   Retake message:', submitRetake.message);
  console.log('   Is retake improved:', submitRetake.isImproved);

  if (submitRetake.result.score !== 100) {
    throw new Error(`Expected updated score 100 on retake, got ${submitRetake.result.score}`);
  }
  if (submitRetake.userProgress.totalPoints !== 167) {
    throw new Error(`Expected XP to remain 167 on retake, got ${submitRetake.userProgress.totalPoints}`);
  }

  // 4. Check user progress API
  const progressRes = await fetch(`${BASE}/quizzes/user/progress`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());

  console.log('4. Progress API Total XP:', progressRes.userProgress.totalPoints);
  const moduleScore = progressRes.userProgress.completedModules.find((m) => m.moduleId === 'm1')?.score;
  console.log('   Module m1 recorded score:', moduleScore);

  if (progressRes.userProgress.totalPoints !== 167 || moduleScore !== 100) {
    throw new Error('Mismatch in progress API!');
  }

  const duplicateAward = await fetch(`${BASE}/users/award-points`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      points: 100,
      completedModule: { moduleId: 'm1', title: 'Right to Education', score: 100 },
    }),
  }).then((r) => r.json());

  if (
    !duplicateAward.success ||
    duplicateAward.user.totalPoints !== 167 ||
    duplicateAward.user.completedModules.length !== 1
  ) {
    throw new Error('Duplicate module completion awarded XP more than once!');
  }

  console.log('\n✅ ALL RETAKE, XP, AND DEDUPLICATION TESTS PASSED!\n');
}

testRetake().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
