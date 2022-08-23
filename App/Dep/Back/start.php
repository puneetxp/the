<?php

ob_start();
session_start();
if (isset($_SESSION['user_id'])) {
   session_regenerate_id();
}
$timezone = date_default_timezone_set("Asia/Kolkata");
if (json_decode(file_get_contents('php://input'), true)) {
   $_POST = json_decode(file_get_contents('php://input'), true);
}
