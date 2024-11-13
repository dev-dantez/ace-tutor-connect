<?php
class Auth {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function register($email, $password, $userType, $userData) {
        try {
            $this->pdo->beginTransaction();

            // Check if email already exists
            $stmt = $this->pdo->prepare("SELECT user_id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->fetch()) {
                throw new Exception("Email already registered");
            }

            // Hash password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Insert into users table
            $stmt = $this->pdo->prepare("INSERT INTO users (email, password, user_type) VALUES (?, ?, ?)");
            $stmt->execute([$email, $hashedPassword, $userType]);
            $userId = $this->pdo->lastInsertId();

            // Insert into respective role table
            if ($userType === 'student') {
                $stmt = $this->pdo->prepare("INSERT INTO students (user_id, first_name, last_name, phone, education_level) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([
                    $userId,
                    $userData['first_name'],
                    $userData['last_name'],
                    $userData['phone'] ?? null,
                    $userData['education_level'] ?? null
                ]);
            } else {
                $stmt = $this->pdo->prepare("INSERT INTO tutors (user_id, first_name, last_name, bio, hourly_rate) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([
                    $userId,
                    $userData['first_name'],
                    $userData['last_name'],
                    $userData['bio'] ?? null,
                    $userData['hourly_rate'] ?? null
                ]);
            }

            $this->pdo->commit();
            return $userId;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    public function login($email, $password) {
        $stmt = $this->pdo->prepare("SELECT u.*, 
            CASE 
                WHEN s.student_id IS NOT NULL THEN 'student'
                WHEN t.tutor_id IS NOT NULL THEN 'tutor'
            END as role_type,
            COALESCE(s.student_id, t.tutor_id) as role_id
            FROM users u
            LEFT JOIN students s ON u.user_id = s.user_id
            LEFT JOIN tutors t ON u.user_id = t.user_id
            WHERE u.email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            // Update last login
            $stmt = $this->pdo->prepare("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?");
            $stmt->execute([$user['user_id']]);

            // Set session
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['user_type'] = $user['user_type'];
            $_SESSION['role_id'] = $user['role_id'];

            return true;
        }
        return false;
    }

    public function logout() {
        session_destroy();
    }

    public function isLoggedIn() {
        return isset($_SESSION['user_id']);
    }

    public function getCurrentUser() {
        if (!$this->isLoggedIn()) {
            return null;
        }

        $userType = $_SESSION['user_type'];
        $table = $userType . 's'; // students or tutors
        $idColumn = $userType . '_id';

        $stmt = $this->pdo->prepare("
            SELECT u.*, r.*
            FROM users u
            JOIN $table r ON u.user_id = r.user_id
            WHERE u.user_id = ?
        ");
        $stmt->execute([$_SESSION['user_id']]);
        return $stmt->fetch();
    }
}
?>