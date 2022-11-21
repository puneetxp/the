<?php use App\Karl\Controller\{ UserController};$route?->crud(['c','r','u'], 'user',[ 'read'=>['admin'],'write'=>['admin'],'update'=>['admin'],'delete'=>['-']] , UserController::class);
?> 