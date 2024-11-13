<?php
require_once '../includes/db_connect.php';
require_once '../includes/classes/Subject.php';

header('Content-Type: application/json');

$subject = new Subject($pdo);

try {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            if (isset($_GET['id'])) {
                $result = $subject->getSubjectById($_GET['id']);
            } else {
                $result = $subject->getAllSubjects();
            }
            echo json_encode(['success' => true, 'data' => $result]);
            break;

        case 'POST':
            if (!isset($_GET['tutor_id']) || !isset($_GET['subject_id'])) {
                throw new Exception('Both tutor_id and subject_id are required');
            }
            $data = json_decode(file_get_contents('php://input'), true);
            $result = $subject->addSubjectToTutor(
                $_GET['tutor_id'],
                $_GET['subject_id'],
                $data['experience_years'],
                $data['hourly_rate']
            );
            echo json_encode(['success' => true]);
            break;

        default:
            throw new Exception('Method not allowed');
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>