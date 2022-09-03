<?php

ob_start();
session_start();
$timezone = date_default_timezone_set("Asia/Kolkata");
if (json_decode(file_get_contents('php://input'), true)) {
   $_POST = json_decode(file_get_contents('php://input'), true);
}
