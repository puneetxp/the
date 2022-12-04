<?php

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/env.php';

ob_start();
session_start([
 'cookie_secure' => secure,
 "cookie_path" => '/',
 'cookie_domain' => web,
 'cookie_httponly' => httponly,
 'cookie_samesite' => same_site
]);
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/Route/Api.php';
if (isset($_SESSION)) {
 if (isset($_SESSION['user_id'])) {
  session_regenerate_id();
 }
}
