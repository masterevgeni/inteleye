// Switch to your application database
db = db.getSiblingDB('inteleye');

// Create a user for your application
db.createUser({
  user: 'inteleye_user',
  pwd: 'inteleye_password',
  roles: [
    {
      role: 'readWrite',
      db: 'inteleye'
    }
  ]
});

// Create some initial collections (optional)
db.createCollection('users');
db.createCollection('projects');

// Insert some sample data (optional)
db.users.insertOne({
  name: 'Admin User',
  email: 'admin@inteleye.com',
  role: 'admin',
  createdAt: new Date()
});

print('Database initialized successfully!');