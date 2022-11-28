<?php use App\The\Controller\{ UserController};$route?->crud(['c','r','u'], 'user',[ 'read'=>['admin'],'write'=>['admin'],'update'=>['admin'],'delete'=>['-']] , UserController::class);
?> 