<?php
require_once '../includes/db_connect.php';
require_once '../includes/classes/Review.php';
require_once '../includes/auth_middleware.php';

header('Content-Type: application/json');

$review = new Review($pdo);

try {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            $user = requireStudent();
            $data = json_decode(file_get_contents('php://input'), true);
            
            $reviewId = $review->createReview(
                $user['student_id'],
                $data['tutor_id'],
                $data['booking_id'],
                $data['rating'],
                $data['comment']
            );
            
            echo json_encode(['success' => true, 'review_id' => $reviewId]);
            break;

        case 'GET':
            if (!isset($_GET['tutor_id'])) {
                throw new Exception('Tutor ID is required');
            }
            
            $reviews = $review->getTutorReviews($_GET['tutor_id']);
            echo json_encode(['success' => true, 'data' => $reviews]);
            break;

        default:
            throw new Exception('Method not allowed');
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>