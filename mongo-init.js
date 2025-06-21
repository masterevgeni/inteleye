// Switch to your application database
db = db.getSiblingDB('');

console.log('-------========Initializing Database========-------');

// Create a user for your application
db.createUser({
  user: '',
  pwd: '',
  roles: [
    {
      role: 'readWrite',
      db: ''
    }
  ]
});

print('-------========Database initialized successfully!========-------');