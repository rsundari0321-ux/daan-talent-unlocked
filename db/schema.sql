-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  sport TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Leaderboard table
CREATE TABLE leaderboard (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  points INT DEFAULT 0,
  rank INT
);

-- Daily tasks table
CREATE TABLE daily_tasks (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  task TEXT,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Records table
CREATE TABLE records (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  activity TEXT,
  value INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  role TEXT CHECK (role IN ('user','assistant')),
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
