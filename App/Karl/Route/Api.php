<?php

use App\Dep\Back\Auth;

$route->post('register', [Auth::class, 'register']);
$route->post('login', [Auth::class, 'login']);
$route->get('/logout/', [Auth::class, 'logout']);
