<?php

function route($name, $role) {
    return "Route::get('" . $name . "',['" . implode("','", $role['read']) . "'],[" . ucfirst($name) . 'Controller::class' . ", 'index']" . ");" .
            "Route::get('" . $name . "/.+',['" . implode("','", $role['read']) . "'],[" . ucfirst($name) . 'Controller::class' . ", 'show'  " . "]);" .
            "Route::post('" . $name . "',['" . implode("','", $role['write']) . "'],[" . ucfirst($name) . 'Controller::class' . ", 'store'" . "]);" .
            "Route::put('" . $name . "/.+',['" . implode("','", $role['update']) . "'],[" . ucfirst($name) . 'Controller::class' . ", 'update'" . "]);" .
            "Route::delete('" . $name . "/.+',['" . implode("','", $role['delete']) . "'],[" . ucfirst($name) . 'Controller::class' . ", 'delete'" . "]);";
}

function crud($name, $role, $action, $path = '') {
    return '$route->crud' .
            "(['" . implode("','", $action) . "'], '$path" .
            $name .
            "',[ 'read'=>['" . implode("','", $role['read']) . "'],'write'=>['" . implode("','", $role['write']) . "'],'update'=>['" . implode("','", $role['update']) . "'],'delete'=>['" . implode("','", $role['delete']) . "']] , " .
            ucfirst($name) . 'Controller::class' . "" . ");
";
}
