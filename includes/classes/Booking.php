<?php
class Booking {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function createBooking($data) {
        $sql = "INSERT INTO bookings (student_id, tutor_id, subject_id, start_time, end_time) 
                VALUES (:student_id, :tutor_id, :subject_id, :start_time, :end_time)";
        
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            'student_id' => $data['student_id'],
            'tutor_id' => $data['tutor_id'],
            'subject_id' => $data['subject_id'],
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time']
        ]);
    }

    public function getBookingsByTutor($tutorId) {
        $sql = "SELECT b.*, s.first_name as student_name, sub.name as subject_name 
                FROM bookings b 
                JOIN students s ON b.student_id = s.student_id 
                JOIN subjects sub ON b.subject_id = sub.subject_id 
                WHERE b.tutor_id = :tutor_id 
                ORDER BY b.start_time DESC";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['tutor_id' => $tutorId]);
        return $stmt->fetchAll();
    }

    public function getBookingsByStudent($studentId) {
        $sql = "SELECT b.*, t.first_name as tutor_name, sub.name as subject_name 
                FROM bookings b 
                JOIN tutors t ON b.tutor_id = t.tutor_id 
                JOIN subjects sub ON b.subject_id = sub.subject_id 
                WHERE b.student_id = :student_id 
                ORDER BY b.start_time DESC";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['student_id' => $studentId]);
        return $stmt->fetchAll();
    }

    public function updateBookingStatus($bookingId, $status) {
        $sql = "UPDATE bookings SET status = :status WHERE booking_id = :booking_id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            'status' => $status,
            'booking_id' => $bookingId
        ]);
    }
}
?>