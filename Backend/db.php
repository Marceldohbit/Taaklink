<?php
class Database {
    private $host = "localhost";      // Database host
    private $dbname = "tasklink";     // Database name
    private $username = "root";       // Database username
    private $password = "";           // Database password
    private $conn;                    // Database connection object

    // Constructor to establish the database connection
    public function __construct() {
        try {
            // Create PDO connection
            $this->conn = new PDO(
                "mysql:host={$this->host};dbname={$this->dbname};charset=utf8mb4",
                $this->username,
                $this->password
            );
            
            // Set PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Set default fetch mode to associative array
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            
            // Disable emulated prepares for security
            $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            
        } catch (PDOException $e) {
            // Log error and display user-friendly message
            error_log("Database Connection Error: " . $e->getMessage());
            die("Could not connect to the database. Please try again later.");
        }
    }

    // Method to get the database connection
    public function getConnection() {
        return $this->conn;
    }

    // Method to close the database connection
    public function closeConnection() {
        $this->conn = null;
    }

    // Method to execute a query with parameters (for SELECT operations)
    public function query($sql, $params = []) {
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            error_log("Query Error: " . $e->getMessage() . "\nSQL: " . $sql);
            return false;
        }
    }

    // Method to execute INSERT/UPDATE/DELETE operations
    public function execute($sql, $params = []) {
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute($params);
            return $stmt->rowCount();
        } catch (PDOException $e) {
            error_log("Execute Error: " . $e->getMessage() . "\nSQL: " . $sql);
            return false;
        }
    }

    // Method to get the last inserted ID
    public function lastInsertId() {
        return $this->conn->lastInsertId();
    }

    // Method to begin a transaction
    public function beginTransaction() {
        return $this->conn->beginTransaction();
    }

    // Method to commit a transaction
    public function commit() {
        return $this->conn->commit();
    }

    // Method to rollback a transaction
    public function rollBack() {
        return $this->conn->rollBack();
    }

    // Method to check if connection is active
    public function isConnected() {
        return ($this->conn !== null);
    }
}

// Create a global database instance (optional)
$database = new Database();
$db = $database->getConnection();

// You can then use $db in other files by including db.php
?>