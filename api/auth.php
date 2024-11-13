<?php
require_once '../includes/db_connect.php';
require_once '../includes/classes/Auth.php';

header('Content-Type: application/json');
session_start();

$auth = new Auth($pdo);

try {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (isset($data['action'])) {
                switch ($data['action']) {
                    case 'register':
                        $userId = $auth->register(
                            $data['email'],
                            $data['password'],
                            $data['user_type'],
                            $data['user_data']
                        );
                        echo json_encode(['success' => true, 'user_id' => $userId]);
                        break;

                    case 'login':
                        $success = $auth->login($data['email'], $data['password']);
                        if ($success) {
                            echo json_encode([
                                'success' => true,
                                'user' => $auth->getCurrentUser()
                            ]);
                        } else {
                            throw new Exception('Invalid credentials');
                        }
                        break;

                    case 'logout':
                        $auth->logout();
                        echo json_encode(['success' => true]);
                        break;

                    default:
                        throw new Exception('Invalid action');
                }
            }
            break;

        case 'GET':
            if ($auth->isLoggedIn()) {
                echo json_encode([
                    'success' => true,
                    'user' => $auth->getCurrentUser()
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Not logged in'
                ]);
            }
            break;

        default:
            throw new Exception('Method not allowed');
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>