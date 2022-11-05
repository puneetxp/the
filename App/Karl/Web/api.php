<?php

use App\Dep\Back\{Route, Auth};
use App\Karl\Controller\{Active_roleController, ProductController, RoleController, UserController};

(new Route())
 ?->get('login', [Auth::class, 'status'])
 ?->post('register', [Auth::class, 'register'])
 ?->post('login', [Auth::class, 'login'])
 ?->get('logout', [Auth::class, 'logout'])
 ?->crud(['c', 'r', 'u', 'd'], 'active_role', ['read' => ['admin'], 'write' => ['admin'], 'update' => ['admin'], 'delete' => ['admin']], Active_roleController::class)
 ?->crud(['c', 'r', 'u', 'd'], 'product', ['read' => ['*'], 'write' => ['manager', 'admin'], 'update' => ['manager', 'admin'], 'delete' => ['admin']], ProductController::class)
 ?->crud(['c', 'r', 'u', 'd'], 'role', ['read' => ['admin'], 'write' => ['admin'], 'update' => ['admin'], 'delete' => ['admin']], RoleController::class)
 ?->crud(['c', 'r', 'u'], 'user', ['read' => ['admin'], 'write' => ['admin'], 'update' => ['admin'], 'delete' => ['-']], UserController::class)
 ?->not_found();
