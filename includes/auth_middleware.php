<?php
require_once 'db_connect.php';
require_once 'classes/Auth.php';

function requireAuth() {
    session_start();
    $auth = new Auth($pdo);
    
    if (!$auth->isLoggedIn()) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Authentication required']);
        exit();
    }
    
    return $auth->getCurrentUser();
}

function requireTutor() {
    $user = requireAuth();
    if ($user['user_type'] !== 'tutor') {
        http_response_code(403);
        echo json_encode(['success' => false, 'error' => 'Tutor access required']);
        exit();
    }
    return $user;
}

function requireStudent() {
    $user = requireAuth();
    if ($user['user_type'] !== 'student') {
        http_response_code(403);
        echo json_encode(['success' => false, 'error' => 'Student access required']);
        exit();
    }
    return $user;
}
?>