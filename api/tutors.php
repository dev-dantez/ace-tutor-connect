<?php
require_once '../includes/db_connect.php';
require_once '../includes/classes/Tutor.php';

header('Content-Type: application/json');

$tutor = new Tutor($pdo);

try {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            if (isset($_GET['id'])) {
                $result = $tutor->getTutorById($_GET['id']);
            } else {
                $searchCriteria = [
                    'subject' => $_GET['subject'] ?? null,
                    'max_rate' => $_GET['max_rate'] ?? null,
                    'min_rating' => $_GET['min_rating'] ?? null
                ];
                $result = $tutor->searchTutors($searchCriteria);
            }
            echo json_encode(['success' => true, 'data' => $result]);
            break;

        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $tutorId = $tutor->createTutor($data);
            echo json_encode(['success' => true, 'tutor_id' => $tutorId]);
            break;

        case 'PUT':
            if (!isset($_GET['id'])) {
                throw new Exception('Tutor ID is required');
            }
            $data = json_decode(file_get_contents('php://input'), true);
            $result = $tutor->updateTutorProfile($_GET['id'], $data);
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