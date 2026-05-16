console.log('🔍 Testing imports sequentially...\n');

try {
  console.log('1. Testing dotenv...');
  import('dotenv').then(() => console.log('   ✓ dotenv imported\n'));
} catch(e) {
  console.error('   ✗ dotenv failed:', e.message, '\n');
}

try {
  console.log('2. Testing express...');
  import('express').then(() => console.log('   ✓ express imported\n'));
} catch(e) {
  console.error('   ✗ express failed:', e.message, '\n');
}

try {
  console.log('3. Testing config/db.js...');
  import('./config/db.js').then(() => console.log('   ✓ config/db.js imported\n'));
} catch(e) {
  console.error('   ✗ config/db.js failed:', e.message, '\n');
}

try {
  console.log('4. Testing authRoutes...');
  import('./routes/authRoutes.js').then(() => console.log('   ✓ authRoutes imported\n'));
} catch(e) {
  console.error('   ✗ authRoutes failed:', e.message, '\n');
}

try {
  console.log('5. Testing hospitalRoutes...');
  import('./routes/hospitalRoutes.js').then(() => console.log('   ✓ hospitalRoutes imported\n'));
} catch(e) {
  console.error('   ✗ hospitalRoutes failed:', e.message, '\n');
}

try {
  console.log('6. Testing pharmacyRoutes...');
  import('./routes/pharmacyRoutes.js').then(() => console.log('   ✓ pharmacyRoutes imported\n'));
} catch(e) {
  console.error('   ✗ pharmacyRoutes failed:', e.message, '\n');
}

try {
  console.log('7. Testing adminRoutes...');
  import('./routes/adminRoutes.js').then(() => console.log('   ✓ adminRoutes imported\n'));
} catch(e) {
  console.error('   ✗ adminRoutes failed:', e.message, '\n');
}

try {
  console.log('8. Testing locationRoutes...');
  import('./routes/locationRoutes.js').then(() => console.log('   ✓ locationRoutes imported\n'));
} catch(e) {
  console.error('   ✗ locationRoutes failed:', e.message, '\n');
}

try {
  console.log('9. Testing assistantRoutes...');
  import('./routes/assistantRoutes.js').then(() => console.log('   ✓ assistantRoutes imported\n'));
} catch(e) {
  console.error('   ✗ assistantRoutes failed:', e.message, '\n');
}

setTimeout(() => {
  console.log('\n✅ All import tests completed');
  process.exit(0);
}, 3000);
