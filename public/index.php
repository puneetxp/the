<?php

$index_path = '../';
require_once $index_path . 'env.php';
require_once __DIR__ . '/../App/Dep/Back/start.php';
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../App/Dep/Front/front_end.php';

use App\Dep\Back\Route;
use App\Dep\Back\Auth;

print_r($_SESSION);
$route = new Route();
$route->get(uri: '/register/', function: "karl_v", value: ['login']);
$route->post('/register/', [Auth::class, 'register']);
$route->listen();
