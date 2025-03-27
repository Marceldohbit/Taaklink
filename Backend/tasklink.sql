-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2025 at 01:48 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tasklink`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `emid` int(11) NOT NULL,
  `emfirstname` varchar(50) NOT NULL,
  `emlastname` varchar(50) NOT NULL,
  `ememail` varchar(100) NOT NULL,
  `emphone` varchar(20) NOT NULL,
  `empassword` varchar(255) NOT NULL,
  `emskills` text DEFAULT NULL,
  `embio` text DEFAULT NULL,
  `emresume` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`emid`, `emfirstname`, `emlastname`, `ememail`, `emphone`, `empassword`, `emskills`, `embio`, `emresume`, `created_at`) VALUES
(1, 'John', 'Doe', 'bayindoh@gmail.com', '373274786432', '$2y$10$wYH46QuR0IkYYDBocdrdN.gsT8z4ayfpm4GkFBypH18beNdm0C8f2', 'Designer', 'Big guy', NULL, '2025-03-27 10:35:09');

-- --------------------------------------------------------

--
-- Table structure for table `employers`
--

CREATE TABLE `employers` (
  `erid` int(11) NOT NULL,
  `erfirstname` varchar(50) NOT NULL,
  `erlastname` varchar(50) NOT NULL,
  `eremail` varchar(100) NOT NULL,
  `erphone` varchar(20) NOT NULL,
  `erpassword` varchar(255) NOT NULL,
  `ercompany` varchar(100) DEFAULT NULL,
  `erwebsite` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employers`
--

INSERT INTO `employers` (`erid`, `erfirstname`, `erlastname`, `eremail`, `erphone`, `erpassword`, `ercompany`, `erwebsite`, `created_at`) VALUES
(1, 'John', 'Colman', 'marceldohbit@gm', '682570839', '$2y$10$r5uwlg2DLnpAfr6rH6kCaOCLu95/FUKpakFpoLLS0egwTuae1wfhW', 'Techline', 'techline.jobs', '2025-03-27 10:37:56');

-- --------------------------------------------------------

--
-- Table structure for table `jobtasks`
--

CREATE TABLE `jobtasks` (
  `jobid` int(11) NOT NULL,
  `erid` int(11) NOT NULL,
  `emid` int(11) DEFAULT NULL,
  `jobtitle` varchar(100) NOT NULL,
  `jobdescription` text NOT NULL,
  `jobcategory` varchar(50) NOT NULL,
  `jobbudget` decimal(10,2) DEFAULT NULL,
  `jobduration` varchar(50) DEFAULT NULL,
  `jobskills` text DEFAULT NULL,
  `jobstatus` enum('open','assigned','completed') DEFAULT 'open',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proposals`
--

CREATE TABLE `proposals` (
  `pid` int(11) NOT NULL,
  `jobid` int(11) NOT NULL,
  `emid` int(11) NOT NULL,
  `pcoverletter` text NOT NULL,
  `pbid` decimal(10,2) NOT NULL,
  `pstatus` enum('pending','accepted','rejected') DEFAULT 'pending',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`emid`),
  ADD UNIQUE KEY `ememail` (`ememail`);

--
-- Indexes for table `employers`
--
ALTER TABLE `employers`
  ADD PRIMARY KEY (`erid`),
  ADD UNIQUE KEY `eremail` (`eremail`);

--
-- Indexes for table `jobtasks`
--
ALTER TABLE `jobtasks`
  ADD PRIMARY KEY (`jobid`),
  ADD KEY `erid` (`erid`),
  ADD KEY `emid` (`emid`);

--
-- Indexes for table `proposals`
--
ALTER TABLE `proposals`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `jobid` (`jobid`),
  ADD KEY `emid` (`emid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `emid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employers`
--
ALTER TABLE `employers`
  MODIFY `erid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jobtasks`
--
ALTER TABLE `jobtasks`
  MODIFY `jobid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proposals`
--
ALTER TABLE `proposals`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jobtasks`
--
ALTER TABLE `jobtasks`
  ADD CONSTRAINT `jobtasks_ibfk_1` FOREIGN KEY (`erid`) REFERENCES `employers` (`erid`),
  ADD CONSTRAINT `jobtasks_ibfk_2` FOREIGN KEY (`emid`) REFERENCES `employees` (`emid`);

--
-- Constraints for table `proposals`
--
ALTER TABLE `proposals`
  ADD CONSTRAINT `proposals_ibfk_1` FOREIGN KEY (`jobid`) REFERENCES `jobtasks` (`jobid`),
  ADD CONSTRAINT `proposals_ibfk_2` FOREIGN KEY (`emid`) REFERENCES `employees` (`emid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
