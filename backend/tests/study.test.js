import axios from 'axios'

const API_URL = process.env.API_URL || 'http://localhost:5000'

// Test utilities
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

async function runTest(name, testFn) {
  try {
    log(`\n🧪 Testing: ${name}`, 'yellow')
    await testFn()
    log(`✅ PASSED: ${name}`, 'green')
    return true
  } catch (error) {
    log(`❌ FAILED: ${name}`, 'red')
    log(`   Error: ${error.message}`, 'red')
    return false
  }
}

// Test Cases
async function testHealthCheck() {
  const response = await axios.get(`${API_URL}/health`)
  
  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`)
  }
  
  if (!response.data.status || response.data.status !== 'ok') {
    throw new Error('Health check failed')
  }
  
  log('   Health check response:', 'reset')
  log(`   ${JSON.stringify(response.data, null, 2)}`, 'reset')
}

async function testValidTopicRequest() {
  const response = await axios.get(`${API_URL}/study`, {
    params: { topic: 'photosynthesis' }
  })
  
  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`)
  }
  
  const { data } = response.data
  
  // Validate structure
  if (!data.summary || !Array.isArray(data.summary)) {
    throw new Error('Summary is missing or not an array')
  }
  
  if (data.summary.length !== 3) {
    throw new Error(`Expected 3 summary points, got ${data.summary.length}`)
  }
  
  if (!data.quiz || !Array.isArray(data.quiz)) {
    throw new Error('Quiz is missing or not an array')
  }
  
  if (data.quiz.length !== 3) {
    throw new Error(`Expected 3 quiz questions, got ${data.quiz.length}`)
  }
  
  // Validate quiz structure
  data.quiz.forEach((q, i) => {
    if (!q.question || typeof q.question !== 'string') {
      throw new Error(`Quiz ${i}: question is invalid`)
    }
    if (!q.options || !Array.isArray(q.options) || q.options.length !== 4) {
      throw new Error(`Quiz ${i}: options must be array of 4`)
    }
    if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
      throw new Error(`Quiz ${i}: correctAnswer must be 0-3`)
    }
  })
  
  if (!data.studyTip || typeof data.studyTip !== 'string') {
    throw new Error('Study tip is missing or not a string')
  }
  
  if (data.mode !== 'regular') {
    throw new Error(`Expected mode 'regular', got '${data.mode}'`)
  }
  
  log('   Sample response:', 'reset')
  log(`   Topic: ${data.topic}`, 'reset')
  log(`   Summary points: ${data.summary.length}`, 'reset')
  log(`   Quiz questions: ${data.quiz.length}`, 'reset')
  log(`   Study tip: ${data.studyTip.substring(0, 50)}...`, 'reset')
}

async function testMathModeRequest() {
  const response = await axios.get(`${API_URL}/study`, {
    params: { 
      topic: 'calculus',
      mode: 'math'
    }
  })
  
  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`)
  }
  
  const { data } = response.data
  
  // Validate structure
  if (!data.summary || !Array.isArray(data.summary) || data.summary.length !== 3) {
    throw new Error('Summary must have 3 points')
  }
  
  if (!data.quiz || !Array.isArray(data.quiz) || data.quiz.length !== 1) {
    throw new Error('Math mode should have 1 quiz question')
  }
  
  const mathQuestion = data.quiz[0]
  if (!mathQuestion.question || typeof mathQuestion.question !== 'string') {
    throw new Error('Math question is invalid')
  }
  
  if (!mathQuestion.answer || typeof mathQuestion.answer !== 'string') {
    throw new Error('Math answer is missing')
  }
  
  if (!mathQuestion.explanation || typeof mathQuestion.explanation !== 'string') {
    throw new Error('Math explanation is missing')
  }
  
  if (data.mode !== 'math') {
    throw new Error(`Expected mode 'math', got '${data.mode}'`)
  }
  
  log('   Math mode response:', 'reset')
  log(`   Question: ${mathQuestion.question}`, 'reset')
  log(`   Answer: ${mathQuestion.answer}`, 'reset')
  log(`   Explanation: ${mathQuestion.explanation.substring(0, 50)}...`, 'reset')
}

async function testMissingTopicParameter() {
  try {
    await axios.get(`${API_URL}/study`)
    throw new Error('Should have thrown an error')
  } catch (error) {
    if (error.response?.status !== 400) {
      throw new Error(`Expected status 400, got ${error.response?.status}`)
    }
    
    if (!error.response.data.error) {
      throw new Error('Error message is missing')
    }
    
    log('   Error response:', 'reset')
    log(`   ${JSON.stringify(error.response.data, null, 2)}`, 'reset')
  }
}

async function testInvalidEndpoint() {
  try {
    await axios.get(`${API_URL}/invalid-endpoint`)
    throw new Error('Should have thrown an error')
  } catch (error) {
    if (error.response?.status !== 404) {
      throw new Error(`Expected status 404, got ${error.response?.status}`)
    }
    
    log('   404 handled correctly', 'reset')
  }
}

// Run all tests
async function runAllTests() {
  log('\n' + '='.repeat(50), 'yellow')
  log('  STUDY HELPER AI - BACKEND TESTS', 'yellow')
  log('='.repeat(50), 'yellow')
  log(`\nAPI URL: ${API_URL}\n`, 'reset')
  
  const results = []
  
  results.push(await runTest('Health Check', testHealthCheck))
  results.push(await runTest('Valid Topic Request', testValidTopicRequest))
  results.push(await runTest('Math Mode Request', testMathModeRequest))
  results.push(await runTest('Missing Topic Parameter', testMissingTopicParameter))
  results.push(await runTest('Invalid Endpoint', testInvalidEndpoint))
  
  // Summary
  const passed = results.filter(r => r).length
  const total = results.length
  
  log('\n' + '='.repeat(50), 'yellow')
  log(`  TEST SUMMARY: ${passed}/${total} PASSED`, passed === total ? 'green' : 'red')
  log('='.repeat(50), 'yellow')
  
  if (passed === total) {
    log('\n🎉 All tests passed!', 'green')
    process.exit(0)
  } else {
    log(`\n⚠️  ${total - passed} test(s) failed`, 'red')
    process.exit(1)
  }
}

// Check if server is running
async function checkServer() {
  try {
    await axios.get(`${API_URL}/health`, { timeout: 5000 })
    return true
  } catch (error) {
    log(`\n❌ Cannot connect to server at ${API_URL}`, 'red')
    log('   Make sure the server is running with: npm start', 'yellow')
    log('   Or set API_URL environment variable\n', 'yellow')
    return false
  }
}

// Main execution
(async () => {
  const serverRunning = await checkServer()
  if (serverRunning) {
    await runAllTests()
  } else {
    process.exit(1)
  }
})()