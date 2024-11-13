<?php
session_start();

// Base URL configuration
define('BASE_URL', 'http://localhost/ace-tutor-connect');

// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'tutor_marketplace');
define('DB_USER', 'root');
define('DB_PASS', '');

// File upload configuration
define('UPLOAD_DIR', '../uploads/');
define('MAX_FILE_SIZE', 5242880); // 5MB
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'pdf']);

// Email configuration
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'your-email@gmail.com');
define('SMTP_PASS', 'your-password');

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>