<?php

use App\TheDep\{Route, Auth};
use App\The\Controller\{Active_roleController, RoleController, UserController};

(new Route())
 ?->get('login', [Auth::class, 'status'])
 ?->post('register', [Auth::class, 'register'])
 ?->post('login', [Auth::class, 'login'])
 ?->get('logout', [Auth::class, 'logout'])
 ?->crud(['c', 'r', 'u', 'd'], 'active_role', ['read' => ['admin'], 'write' => ['admin'], 'update' => ['admin'], 'delete' => ['admin']], Active_roleController::class)
 ?->crud(['c', 'r', 'u', 'd'], 'role', ['read' => ['admin'], 'write' => ['admin'], 'update' => ['admin'], 'delete' => ['admin']], RoleController::class)
 ?->crud(['c', 'r', 'u'], 'user', ['read' => ['admin'], 'write' => ['admin'], 'update' => ['admin'], 'delete' => ['-']], UserController::class)
 ?->not_found();