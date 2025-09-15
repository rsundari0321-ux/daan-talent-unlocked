-- Insert sample users
INSERT INTO users (username, email) VALUES
('alice', 'alice@example.com'),
('bob', 'bob@example.com'),
('charlie', 'charlie@example.com');

-- Insert sample leaderboard entries
INSERT INTO leaderboard (user_id, score, rank) VALUES
(1, 120, 1),
(2, 95, 2),
(3, 75, 3);

-- Insert sample tasks
INSERT INTO tasks (title, description, assigned_to, status) VALUES
('Setup project', 'Initialize GitHub repo and basic structure', 1, 'completed'),
('Create login page', 'Frontend for user authentication', 2, 'in_progress'),
('Integrate AI assistant', 'Connect backend AI service', 3, 'pending');

-- Insert sample records
INSERT INTO records (user_id, activity, value) VALUES
(1, 'Login', 1),
(2, 'Feedback Submitted', 5),
(3, 'AI Query', 3);

-- Insert sample messages
INSERT INTO messages (user_id, role, content) VALUES
(1, 'user', 'Hello, AI assistant!'),
(1, 'assistant', 'Hi Alice, how can I help you today?'),
(2, 'user', 'I am facing an issue with login.'),
(2, 'assistant', 'Sure, I will look into it.');
