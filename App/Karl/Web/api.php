<?php

use App\Dep\Back\{Route, Auth};
use App\Karl\Controller\{Active_roleController, RoleController, UserController};

$route = new Route();
$route->crud(['c', 'r', 'u', 'd'], 'active_role', ['read' => ['admin'], 'write' => ['admin'], 'update' => ['admin'], 'delete' => ['admin']], Active_roleController::class);
$route->crud(['c', 'r', 'u', 'd'], 'role', ['read' => ['admin'], 'write' => ['admin'], 'update' => ['admin'], 'delete' => ['admin']], RoleController::class);
$route->crud(['c', 'r', 'u'], 'user', ['read' => ['admin'], 'write' => ['admin'], 'update' => ['admin'], 'delete' => ['-']], UserController::class);
$route->post('register', [Auth::class, 'register']);
$route->post('login', [Auth::class, 'login']);
$route->get('logout', [Auth::class, 'logout']);
$route->listen();
