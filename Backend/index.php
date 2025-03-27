<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'Employee.php';
require_once 'Employer.php';

$response = ['success' => false, 'message' => ''];

try {
    $data = json_decode(file_get_contents('php://input'), true) ?? $_POST;

    if (isset($data['action'])) {
        $action = $data['action'];

        if ($action == 'employee_register') {
            $employee = new Employee();
            $response = $employee->register(
                $data['emfirstname'],
                $data['emlastname'],
                $data['ememail'],
                $data['emphone'],
                $data['empassword'],
                $data['emskills'] ?? '',
                $data['embio'] ?? ''
            );
        } 
        elseif ($action == 'employer_register') {
            $employer = new Employer();
            $response = $employer->register(
                $data['erfirstname'],
                $data['erlastname'],
                $data['eremail'],
                $data['erphone'],
                $data['erpassword'],
                $data['ercompany'] ?? '',
                $data['erwebsite'] ?? ''
            );
        }
        elseif ($action == 'employee_login') {
            $employee = new Employee();
            $response = $employee->login($data['ememail'], $data['empassword']);
        }
        elseif ($action == 'employer_login') {
            $employer = new Employer();
            $response = $employer->login($data['eremail'], $data['erpassword']);
        }
        elseif ($action == 'post_job') {
            session_start();
            if (!isset($_SESSION['logged_in']) || $_SESSION['user_type'] != 'employer') {
                throw new Exception('Unauthorized access');
            }
            $employer = new Employer();
            $response = $employer->postJob(
                $_SESSION['erid'],
                $data['jobtitle'],
                $data['jobdescription'],
                $data['jobcategory'],
                $data['jobbudget'],
                $data['jobduration'],
                $data['jobskills']
            );
        }
        elseif ($action == 'browse_jobs') {
            $employee = new Employee();
            $response = $employee->browseJobs();
        }
        elseif ($action == 'submit_proposal') {
            session_start();
            if (!isset($_SESSION['logged_in']) || $_SESSION['user_type'] != 'employee') {
                throw new Exception('Unauthorized access');
            }
            $employee = new Employee();
            $response = $employee->submitProposal(
                $data['jobid'],
                $_SESSION['emid'],
                $data['pcoverletter'],
                $data['pbid']
            );
        }
        elseif ($action == 'get_job_proposals') {
            session_start();
            if (!isset($_SESSION['logged_in']) || $_SESSION['user_type'] != 'employer') {
                throw new Exception('Unauthorized access');
            }
            $employer = new Employer();
            $response = $employer->getJobProposals($data['jobid']);
        }
        elseif ($action == 'accept_proposal') {
            session_start();
            if (!isset($_SESSION['logged_in']) || $_SESSION['user_type'] != 'employer') {
                throw new Exception('Unauthorized access');
            }
            $employer = new Employer();
            $response = $employer->acceptProposal(
                $data['pid'],
                $data['jobid'],
                $data['emid']
            );
        }
        else {
            $response['message'] = "No action matched.";
        }
    } else {
        $response['message'] = "Action parameter is missing!";
    }
} catch (Exception $e) {
    $response['message'] = "Error: " . $e->getMessage();
}

echo json_encode($response);