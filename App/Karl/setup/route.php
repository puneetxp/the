<?php

function crud($name, $role, $action, $path = '') {
    return '$route?->crud' .
            "(['" . implode("','", $action) . "'], '$path" .
            $name .
            "',[ 'read'=>['" . implode("','", $role['read']) . "'],'write'=>['" . implode("','", $role['write']) . "'],'update'=>['" . implode("','", $role['update']) . "'],'delete'=>['" . implode("','", $role['delete']) . "']] , " .
            ucfirst($name) . 'Controller::class' . "" . ");
";
}
