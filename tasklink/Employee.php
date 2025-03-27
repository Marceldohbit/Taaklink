<?php
require_once "db.php";

class Employee {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function register($emfirstname, $emlastname, $ememail, $emphone, $empassword, $emskills = '', $embio = '') {
        try {
            $stmt = $this->conn->prepare("SELECT COUNT(*) FROM employees WHERE ememail = :ememail");
            $stmt->bindParam(':ememail', $ememail);
            $stmt->execute();
            if ($stmt->fetchColumn() > 0) {
                throw new Exception("Email is already registered");
            }

            $hashedPassword = password_hash($empassword, PASSWORD_BCRYPT);

            $stmt = $this->conn->prepare("INSERT INTO employees 
                (emfirstname, emlastname, ememail, emphone, empassword, emskills, embio, created_at) 
                VALUES (:emfirstname, :emlastname, :ememail, :emphone, :empassword, :emskills, :embio, NOW())");
            
            $stmt->bindParam(':emfirstname', $emfirstname);
            $stmt->bindParam(':emlastname', $emlastname);
            $stmt->bindParam(':ememail', $ememail);
            $stmt->bindParam(':emphone', $emphone);
            $stmt->bindParam(':empassword', $hashedPassword);
            $stmt->bindParam(':emskills', $emskills);
            $stmt->bindParam(':embio', $embio);
            $stmt->execute();

            return ["success" => true, "message" => "Registration successful!", "emid" => $this->conn->lastInsertId()];
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function login($ememail, $empassword) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM employees WHERE ememail = :ememail");
            $stmt->bindParam(':ememail', $ememail);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user || !password_verify($empassword, $user['empassword'])) {
                throw new Exception('Invalid email or password');
            }

            session_start();
            $_SESSION['user_type'] = 'employee';
            $_SESSION['emid'] = $user['emid'];
            $_SESSION['ememail'] = $user['ememail'];
            $_SESSION['logged_in'] = true;

            return ["success" => true, "message" => "Login successful!", "user" => $user];
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function getProfile($emid) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM employees WHERE emid = :emid");
            $stmt->bindParam(':emid', $emid);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function updateProfile($emid, $data) {
        try {
            $query = "UPDATE employees SET ";
            $params = [];
            foreach ($data as $key => $value) {
                $query .= "$key = :$key, ";
                $params[":$key"] = $value;
            }
            $query = rtrim($query, ", ") . " WHERE emid = :emid";
            $params[':emid'] = $emid;

            $stmt = $this->conn->prepare($query);
            $stmt->execute($params);

            return ["success" => true, "message" => "Profile updated successfully!"];
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function browseJobs() {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM jobtasks WHERE jobstatus = 'open'");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function submitProposal($jobid, $emid, $coverletter, $bid) {
        try {
            $stmt = $this->conn->prepare("INSERT INTO proposals 
                (jobid, emid, pcoverletter, pbid, created_at) 
                VALUES (:jobid, :emid, :pcoverletter, :pbid, NOW())");
            
            $stmt->bindParam(':jobid', $jobid);
            $stmt->bindParam(':emid', $emid);
            $stmt->bindParam(':pcoverletter', $coverletter);
            $stmt->bindParam(':pbid', $bid);
            $stmt->execute();

            return ["success" => true, "message" => "Proposal submitted successfully!"];
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }
}
?>