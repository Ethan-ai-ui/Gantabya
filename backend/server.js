require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const allowedOrigins = [
  FRONTEND_URL,  // Production frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, 'users.json');

const readUsers = () => {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }
  const data = fs.readFileSync(usersFilePath, 'utf8');
  return data ? JSON.parse(data) : [];
};

const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// LOGIN route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  try {
    const users = readUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      return res.json({ 
        success: true,
        user: {
          email: user.email,
          fullName: user.fullName,
          role: user.role
        }
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error reading users.json:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// SIGNUP route
app.post('/signup', (req, res) => {
  const { email, password, fullName, role } = req.body;

  if (!email || !password || !fullName || !role) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const users = readUsers();

    if (users.some(u => u.email === email)) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const newUser = { email, password, fullName, role };
    users.push(newUser);
    writeUsers(users);

    return res.status(201).json({ 
      message: 'Signup successful.',
      user: {
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error('Error writing users.json:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Service Provider signup
app.post('/signup-service-provider', (req, res) => {
  const { email, password, fullName, role, extra } = req.body;

  if (!email || !password || !fullName || role !== 'service_provider' || !extra) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const users = readUsers();

    if (users.some(u => u.email === email)) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const { companyName, phone, citizenshipNumber, contactNumber, servicesOffered } = extra;

    const newUser = {
      email,
      password,
      fullName,
      role,
      companyName,
      citizenshipNumber,
      contactNumber,
      servicesOffered
    };

    users.push(newUser);
    writeUsers(users);

    return res.status(201).json({ 
      message: 'Service provider registered successfully.',
      user: {
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error('Error writing users.json:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
