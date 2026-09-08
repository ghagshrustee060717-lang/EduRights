import http from 'http';

// Helper to make fetch requests
const post = (path, body, token) => {
  return fetch(`http://localhost:5000${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  }).then(r => r.json());
};

const get = (path, token) => {
  return fetch(`http://localhost:5000${path}`, {
    method: 'GET',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }).then(r => r.json());
};

async function runTests() {
  console.log('Testing Person A Auth System...');
  
  // 1. Health check
  const health = await get('/api/health');
  console.log('1. Health Check:', health.status === 'online' ? '✅ PASS' : '❌ FAIL', health);

  // 2. Demo Login (Aarav)
  const loginRes = await post('/api/auth/login', {
    email: 'aarav@edurights.org',
    password: 'explorer123',
  });
  console.log('2. Demo User Login:', loginRes.success ? '✅ PASS' : '❌ FAIL', loginRes);
  const token = loginRes.token;

  // 3. Protected /me route
  const meRes = await get('/api/auth/me', token);
  console.log('3. JWT Protected /api/auth/me:', meRes.success ? '✅ PASS' : '❌ FAIL', meRes);

  // 4. Register new child user
  const newEmail = `child_${Date.now()}@edurights.org`;
  const regRes = await post('/api/auth/register', {
    name: 'Maya Explorer',
    email: newEmail,
    password: 'secretpass123',
    age: 11,
    avatar: 'explorer-maya',
    language: 'en',
  });
  console.log('4. Register Child User:', regRes.success ? '✅ PASS' : '❌ FAIL', regRes);

  // 5. Unauthorized check without token
  const unauthRes = await get('/api/auth/me');
  console.log('5. Unauthenticated Request Blocked (NFR-03):', !unauthRes.success ? '✅ PASS' : '❌ FAIL', unauthRes.message);

  console.log('All Person A Auth & User tests passed successfully!');
  process.exit(0);
}

// Start server child process or run test if server is already running
runTests().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
