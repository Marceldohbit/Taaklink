<?php
require_once "db.php";

class Employer {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function register($erfirstname, $erlastname, $eremail, $erphone, $erpassword, $ercompany = '', $erwebsite = '') {
        try {
            $stmt = $this->conn->prepare("SELECT COUNT(*) FROM employers WHERE eremail = :eremail");
            $stmt->bindParam(':eremail', $eremail);
            $stmt->execute();
            if ($stmt->fetchColumn() > 0) {
                throw new Exception("Email is already registered");
            }

            $hashedPassword = password_hash($erpassword, PASSWORD_BCRYPT);

            $stmt = $this->conn->prepare("INSERT INTO employers 
                (erfirstname, erlastname, eremail, erphone, erpassword, ercompany, erwebsite, created_at) 
                VALUES (:erfirstname, :erlastname, :eremail, :erphone, :erpassword, :ercompany, :erwebsite, NOW())");
            
            $stmt->bindParam(':erfirstname', $erfirstname);
            $stmt->bindParam(':erlastname', $erlastname);
            $stmt->bindParam(':eremail', $eremail);
            $stmt->bindParam(':erphone', $erphone);
            $stmt->bindParam(':erpassword', $hashedPassword);
            $stmt->bindParam(':ercompany', $ercompany);
            $stmt->bindParam(':erwebsite', $erwebsite);
            $stmt->execute();

            return ["success" => true, "message" => "Registration successful!", "erid" => $this->conn->lastInsertId()];
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function login($eremail, $erpassword) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM employers WHERE eremail = :eremail");
            $stmt->bindParam(':eremail', $eremail);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user || !password_verify($erpassword, $user['erpassword'])) {
                throw new Exception('Invalid email or password');
            }

            session_start();
            $_SESSION['user_type'] = 'employer';
            $_SESSION['erid'] = $user['erid'];
            $_SESSION['eremail'] = $user['eremail'];
            $_SESSION['logged_in'] = true;

            return ["success" => true, "message" => "Login successful!", "user" => $user];
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function postJob($erid, $jobtitle, $jobdescription, $jobcategory, $jobbudget, $jobduration, $jobskills) {
        try {
            $stmt = $this->conn->prepare("INSERT INTO jobtasks 
                (erid, jobtitle, jobdescription, jobcategory, jobbudget, jobduration, jobskills, created_at) 
                VALUES (:erid, :jobtitle, :jobdescription, :jobcategory, :jobbudget, :jobduration, :jobskills, NOW())");
            
            $stmt->bindParam(':erid', $erid);
            $stmt->bindParam(':jobtitle', $jobtitle);
            $stmt->bindParam(':jobdescription', $jobdescription);
            $stmt->bindParam(':jobcategory', $jobcategory);
            $stmt->bindParam(':jobbudget', $jobbudget);
            $stmt->bindParam(':jobduration', $jobduration);
            $stmt->bindParam(':jobskills', $jobskills);
            $stmt->execute();

            return ["success" => true, "message" => "Job posted successfully!", "jobid" => $this->conn->lastInsertId()];
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function getPostedJobs($erid) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM jobtasks WHERE erid = :erid");
            $stmt->bindParam(':erid', $erid);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function getJobProposals($jobid) {
        try {
            $stmt = $this->conn->prepare("SELECT p.*, e.emfirstname, e.emlastname, e.emskills 
                                         FROM proposals p 
                                         JOIN employees e ON p.emid = e.emid 
                                         WHERE p.jobid = :jobid");
            $stmt->bindParam(':jobid', $jobid);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }

    public function acceptProposal($pid, $jobid, $emid) {
        try {
            // Update proposal status
            $stmt = $this->conn->prepare("UPDATE proposals SET pstatus = 'accepted' WHERE pid = :pid");
            $stmt->bindParam(':pid', $pid);
            $stmt->execute();

            // Update job status and assign employee
            $stmt = $this->conn->prepare("UPDATE jobtasks SET emid = :emid, jobstatus = 'assigned' WHERE jobid = :jobid");
            $stmt->bindParam(':emid', $emid);
            $stmt->bindParam(':jobid', $jobid);
            $stmt->execute();

            return ["success" => true, "message" => "Proposal accepted successfully!"];
        } catch (Exception $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }
}
?>