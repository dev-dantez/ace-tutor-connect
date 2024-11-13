-- Create the database
CREATE DATABASE IF NOT EXISTS tutor_marketplace;
USE tutor_marketplace;

-- Users table (base table for authentication)
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type ENUM('student', 'tutor') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Students table
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    education_level VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Tutors table (modified to work with users table)
CREATE TABLE tutors (
    tutor_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    profile_image VARCHAR(255),
    bio TEXT,
    hourly_rate DECIMAL(10,2),
    years_experience INT,
    education TEXT,
    rating DECIMAL(3,2) DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Subjects table
CREATE TABLE subjects (
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tutor subjects (many-to-many relationship)
CREATE TABLE tutor_subjects (
    tutor_id INT,
    subject_id INT,
    experience_years INT,
    hourly_rate DECIMAL(10,2),
    FOREIGN KEY (tutor_id) REFERENCES tutors(tutor_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE,
    PRIMARY KEY (tutor_id, subject_id)
);

-- Sample data for subjects
INSERT INTO subjects (name, category, description) VALUES
('Mathematics', 'Science', 'General mathematics including algebra, calculus, and geometry'),
('Physics', 'Science', 'Classical mechanics, thermodynamics, and modern physics'),
('English Literature', 'Languages', 'Classic and contemporary literature analysis'),
('Computer Science', 'Technology', 'Programming, algorithms, and computer theory'),
('Chemistry', 'Science', 'Organic and inorganic chemistry'),
('Spanish', 'Languages', 'Spanish language and culture');
