<?php
class Subject {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAllSubjects() {
        $sql = "SELECT * FROM subjects ORDER BY name";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll();
    }

    public function getSubjectById($id) {
        $sql = "SELECT * FROM subjects WHERE subject_id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function addSubjectToTutor($tutorId, $subjectId, $experienceYears, $hourlyRate) {
        $sql = "INSERT INTO tutor_subjects (tutor_id, subject_id, experience_years, hourly_rate) 
                VALUES (:tutor_id, :subject_id, :experience_years, :hourly_rate)";
        
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            'tutor_id' => $tutorId,
            'subject_id' => $subjectId,
            'experience_years' => $experienceYears,
            'hourly_rate' => $hourlyRate
        ]);
    }
}
?>