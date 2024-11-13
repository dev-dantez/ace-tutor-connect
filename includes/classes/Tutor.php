<?php
class Tutor {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function createTutor($data) {
        $sql = "INSERT INTO tutors (first_name, last_name, email, password, bio, hourly_rate, years_experience, education) 
                VALUES (:first_name, :last_name, :email, :password, :bio, :hourly_rate, :years_experience, :education)";
        
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => password_hash($data['password'], PASSWORD_DEFAULT),
                'bio' => $data['bio'],
                'hourly_rate' => $data['hourly_rate'],
                'years_experience' => $data['years_experience'],
                'education' => $data['education']
            ]);
            return $this->pdo->lastInsertId();
        } catch (PDOException $e) {
            throw new Exception("Error creating tutor: " . $e->getMessage());
        }
    }

    public function getTutorById($id) {
        $sql = "SELECT * FROM tutors WHERE tutor_id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function searchTutors($criteria) {
        $sql = "SELECT t.*, s.name as subject_name 
                FROM tutors t 
                JOIN tutor_subjects ts ON t.tutor_id = ts.tutor_id 
                JOIN subjects s ON ts.subject_id = s.subject_id 
                WHERE 1=1";
        $params = [];

        if (!empty($criteria['subject'])) {
            $sql .= " AND s.subject_id = :subject";
            $params['subject'] = $criteria['subject'];
        }

        if (!empty($criteria['max_rate'])) {
            $sql .= " AND t.hourly_rate <= :max_rate";
            $params['max_rate'] = $criteria['max_rate'];
        }

        if (!empty($criteria['min_rating'])) {
            $sql .= " AND t.rating >= :min_rating";
            $params['min_rating'] = $criteria['min_rating'];
        }

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public function updateTutorProfile($id, $data) {
        $sql = "UPDATE tutors SET 
                bio = :bio,
                hourly_rate = :hourly_rate,
                education = :education,
                updated_at = CURRENT_TIMESTAMP
                WHERE tutor_id = :id";

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            'bio' => $data['bio'],
            'hourly_rate' => $data['hourly_rate'],
            'education' => $data['education'],
            'id' => $id
        ]);
    }
}
?>