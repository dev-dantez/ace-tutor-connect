<?php
require_once '../config/config.php';
require_once '../includes/db_connect.php';
require_once '../includes/classes/Booking.php';
require_once '../includes/auth_middleware.php';

header('Content-Type: application/json');

// Ensure user is authenticated
if (!isAuthenticated()) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$booking = new Booking($pdo);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if ($booking->createBooking($data)) {
            echo json_encode(['message' => 'Booking created successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create booking']);
        }
        break;

    case 'GET':
        if (isset($_GET['tutor_id'])) {
            $bookings = $booking->getBookingsByTutor($_GET['tutor_id']);
            echo json_encode(['data' => $bookings]);
        } elseif (isset($_GET['student_id'])) {
            $bookings = $booking->getBookingsByStudent($_GET['student_id']);
            echo json_encode(['data' => $bookings]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Missing parameters']);
        }
        break;

    case 'PUT':
        if (isset($_GET['id'])) {
            $data = json_decode(file_get_contents('php://input'), true);
            if ($booking->updateBookingStatus($_GET['id'], $data['status'])) {
                echo json_encode(['message' => 'Booking updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update booking']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Missing booking ID']);
        }
        break;
}
?>