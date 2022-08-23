<?php use App\Dep\Back\Auth;use  App\Karl\Controller\{Active_roleController,BillController,ClientController,ExecutiveController,GstnController,PaymentController,Payment_methodController,PhotoController,RoleController,ServiceController,Service_attributeController,Service_attribute_valueController,Service_planController,Service_plan_durationController,Service_plan_priceController,SessionController,SubscriptionController,UserController};use App\Dep\Back\Route; $route= new Route();$route->crud(['c','r','u','d'], 'active_role',[ 'read'=>['admin'],'write'=>['admin'],'update'=>['admin'],'delete'=>['admin']] , Active_roleController::class);$route->crud(['c','r','u'], 'bill',[ 'read'=>['admin'],'write'=>['admin'],'update'=>['admin'],'delete'=>['-']] , BillController::class);$route->crud(['c','r','u'], 'client',[ 'read'=>['admin'],'write'=>['admin'],'update'=>['admin'],'delete'=>['admin']] , ClientController::class);$route->crud(['c','r','u','d'], 'executive',[ 'read'=>['admin'],'write'=>['admin'],'update'=>['admin'],'delete'=>['admin']] , ExecutiveController::class);$route->crud(['c','r','u','d'], 'gstn',[ 'read'=>['admin'],'write'=>['admin'],'update'=>['admin'],'delete'=>['admin']] , GstnController::class);$route->crud(['c','r','u'], 'payment',[ 'read'=>['admin'],'write'=>['admin'],'update'=>['admin'],'delete'=>['-']] , PaymentController::class);$route->crud(['c','r','u'], 'payment_method',[ 'read'=>['admin'],'write'=>['admin'],'update'=>['admin'],'delete'=>['-']] , Payment_methodController::class);$route->crud(['c','r','u','d'], 'photo',[ 'read'=>[''],'write'=>['admin'],'update'=>['executive','admin'],'delete'=>['admin']] , PhotoController::class);$route->crud(['c','r','u','d'], 'role',[ 'read'=>['admin'],'write'=>['admin'],'update'=>['admin'],'delete'=>['admin']] , RoleController::class);$route->crud(['c','r','u','d'], 'service',[ 'read'=>[''],'write'=>['admin'],'update'=>['executive','admin'],'delete'=>['admin']] , ServiceController::class);$route->crud(['c','r','u','d'], 'service_attribute',[ 'read'=>[''],'write'=>['admin'],'update'=>['executive','admin'],'delete'=>['admin']] , Service_attributeController::class);$route->crud(['c','r','u','d'], 'service_attribute_value',[ 'read'=>[''],'write'=>['admin'],'update'=>['executive','admin'],'delete'=>['admin']] , Service_attribute_valueController::class);$route->crud(['c','r','u','d'], 'service_plan',[ 'read'=>[''],'write'=>['admin'],'update'=>['executive','admin'],'delete'=>['admin']] , Service_planController::class);$route->crud(['c','r','u','d'], 'service_plan_duration',[ 'read'=>[''],'write'=>['admin'],'update'=>['executive','admin'],'delete'=>['admin']] , Service_plan_durationController::class);$route->crud(['c','r','u','d'], 'service_plan_price',[ 'read'=>[''],'write'=>['admin'],'update'=>['executive','admin'],'delete'=>['admin']] , Service_plan_priceController::class);$route->crud(['c','r','u','d'], 'session',[ 'read'=>['admin'],'write'=>['admin'],'update'=>['admin'],'delete'=>['admin']] , SessionController::class);$route->crud(['c','r','u'], 'subscription',[ 'read'=>['admin'],'write'=>['admin'],'update'=>['admin'],'delete'=>['admin']] , SubscriptionController::class);$route->crud(['c','r','u'], 'user',[ 'read'=>['admin'],'write'=>['admin'],'update'=>['admin'],'delete'=>['-']] , UserController::class);$route->get('/logout/', [Auth::class, 'logout']);$route->listen();