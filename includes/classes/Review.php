<?php
class Review {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function createReview($studentId, $tutorId, $bookingId, $rating, $comment) {
        $sql = "INSERT INTO reviews (student_id, tutor_id, booking_id, rating, comment) 
                VALUES (:student_id, :tutor_id, :booking_id, :rating, :comment)";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            'student_id' => $studentId,
            'tutor_id' => $tutorId,
            'booking_id' => $bookingId,
            'rating' => $rating,
            'comment' => $comment
        ]);

        // Update tutor's average rating
        $this->updateTutorRating($tutorId);
        
        return $this->pdo->lastInsertId();
    }

    public function getTutorReviews($tutorId) {
        $sql = "SELECT r.*, s.first_name, s.last_name 
                FROM reviews r 
                JOIN students s ON r.student_id = s.student_id 
                WHERE r.tutor_id = :tutor_id 
                ORDER BY r.created_at DESC";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['tutor_id' => $tutorId]);
        return $stmt->fetchAll();
    }

    private function updateTutorRating($tutorId) {
        $sql = "UPDATE tutors 
                SET rating = (
                    SELECT AVG(rating) 
                    FROM reviews 
                    WHERE tutor_id = :tutor_id
                )
                WHERE tutor_id = :tutor_id";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['tutor_id' => $tutorId]);
    }
}
?>