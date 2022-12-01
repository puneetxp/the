<?php

require_once '../php/env.php';
$pattern_route = '/\$route.*?;/';
$pattern_use_only = '/use.*?\w;/';
$pattern_use_multple = "/use (.*?){(.*?)};/";
$route_use_single = '';
$route_use_array = [];
$route_use_array['App\Dep\Back\\'] = ["Route"];
$route_use_multiple = '';
$route_app = ' (new Route())';
$json_set = json_decode(file_get_contents('status.json'), TRUE);

foreach (glob("*.php") as $filename) {
    require_once $filename;
}
$x = [];
foreach (glob("model/*.json") as $filename) {
    $x[] = json_decode(file_get_contents($filename), TRUE);
}
$table = [];
$roles = [];
foreach ($x as $item) {
    foreach ($item['roles'] as $key => $value) {
        if ($value != ["-"] || $value != ["*"]) {
            $roles = array_merge($value, $roles);
        }
    }
    $table[] = table_set($item, $x);
}

$roles = array_filter(array_unique($roles), fn ($role) => !($role == "*" || $role == "-"));
for ($i = 0; $i < count($table); ++$i) {
    if (count($table[$i]['relations']) > 0) {
        foreach ($table[$i]['relations'] as $key => $items) {
            for ($t = 0; $t < count($table); ++$t) {
                if ($table[$t]['name'] == $key) {
                    $table[$t]['relations'][$table[$i]['name']] = ['table' => $table[$i]['table'], 'name' => $items['key'], 'key' => $items['name']];
                }
            }
        }
    }
}
$route = fopen_dir($output_path . ucfirst('Web/') . 'api.php');
$controller_route = [];
foreach (['Auth.php', 'Api.php'] as $api) {
    $router_mode_raw = str_replace("{ ", "{", str_replace(["<?php", "?>", "\n", "\r\n", "\r", "\t", "    "], "", file_get_contents($output_path . ucfirst('Route/' . $api), 'TRUE')));
    if ($router_mode_raw != '') {
        preg_match_all($pattern_use_only, $router_mode_raw, $use_temp_single);
        if ($use_temp_single[0] != []) {
            foreach ($use_temp_single as $item) {
                $route_use_single .= $item;
            }
        }
        preg_match_all($pattern_use_multple, $router_mode_raw, $use_temp_multiple, PREG_SET_ORDER);
        if ($use_temp_multiple[0] != []) {
            foreach ($use_temp_multiple as $item) {
                if (isset($route_use_array[$item[1]])) {
                    foreach (explode(',', $item[2]) as $controller_roter) {
                        $route_use_array[$item[1]][] = $controller_roter;
                    }
                } else {
                    $route_use_array[$item[1]] = array_values(explode(',', $item[2]));
                }
            }
        }
        preg_match_all($pattern_route, $router_mode_raw, $router_temp);
        if ($router_temp[0] != []) {
            foreach ($router_temp[0] as $item) {
                $route_app .= "\n" . preg_replace('/(;(?!.*;))/', '', $item);
            }
        }
    }
}
foreach ($table as $item) {
    isset($json_set['table'][$item['name']]) ? '' : $json_set['table'][$item['name']] = false;
    //php
    $model = fopen_dir($output_path . ucfirst('model/') . ucfirst($item['name']) . '.php');
    $model_write = model($item);
    fwrite($model, $model_write);
    $controller_write = controller($item);
    if ($item['controller'] == '') {
        $controller = fopen_dir($output_path . ucfirst('controller/') . ucfirst($item['name']) . 'Controller.php');
        fwrite($controller, $controller_write);
    }
    $mysql_write = mysql_table($item);
    $mysql_relation = migrate_table($item);
    $controller_route[] = ucfirst($item['name']) . 'Controller';
    $route_file = fopen_dir($output_path . ucfirst('Route/Routes_crud/') . ucfirst($item['name']) . '.php');
    $router_model = crud($item['name'], $item['roles'], $item['crud']);
    fwrite($route_file, php_wrapper("use App\The\Controller\{ " . ucfirst($item['name']) . "Controller};" . $router_model));
    $mysql = fopen_dir("../database/" . ucfirst('mysql/') . ucfirst($item['name']) . '.sql');
    $mysql_relation_file = fopen_dir("../database/" . ucfirst('mysql/') . ucfirst('relations/') . ucfirst($item['name']) . '_relation.sql');
    fwrite($mysql_relation_file, $mysql_relation);
    fwrite($mysql, $mysql_write);
    //demo vue with cdn
    $vuedjs = '../vuejs/src/shared/';
    $Interface = fopen_dir($vuedjs . 'Interface/' . ucfirst('model/') . ucfirst($item['name']) . '.ts');
    $Interface_write = Interface_set($item);
    fwrite($Interface, $Interface_write);
    $vuestore = fopen_dir($vuedjs . 'Store/' . ucfirst('model/') . ucfirst($item['name']) . '.js');
    $vuestore_write = Vue_StoreJs($item);
    fwrite($vuestore, $vuestore_write);
    $vueservice = fopen_dir($vuedjs . 'Service/' . ucfirst('model/') . ucfirst($item['name']) . '.js');
    $vueservice_write = Vue_ServiceJs($item);
    fwrite($vueservice, $vueservice_write);
    //
    if ($json_set['table'][$item['name']] == false || $json_set['fresh'] == true) {
        $Interface_write = Interface_set($item);
        if (in_array('angular', $json_set['front-end'])) {
            $angular_path = '../angular/src/app/shared/';
            $servicets = fopen_dir($angular_path  . ucfirst('service/') . ucfirst('model/') . ucfirst($item['name']) . '.service.ts');
            $servicets_write = servicets_set($item);
            fwrite($servicets, $servicets_write);
            $statesngxs = fopen_dir($angular_path  . ucfirst('ngxs/') . ucfirst('state/') . ucfirst($item['name']) . '.state.ts');
            $statesngxs_write = statengxs_set($item);
            fwrite($statesngxs, $statesngxs_write);
            $actionngxs = fopen_dir($angular_path . ucfirst('ngxs/') . ucfirst('action/') . ucfirst($item['name']) . '.action.ts');
            $actionngxs_write = actionngxs_set($item);
            fwrite($actionngxs, $actionngxs_write);
            $Interface = fopen_dir($angular_path . 'Interface/' . ucfirst('model/') . ucfirst($item['name']) . '.ts');
            fwrite($Interface, $Interface_write);
        }
        if (in_array('vuets', $json_set['front-end'])) {
            $vuedjs = '../vuets/src/shared/';
            $Interface = fopen_dir($vuedjs . 'Interface/' . ucfirst('model/') . ucfirst($item['name']) . '.ts');
            fwrite($Interface, $Interface_write);
            $vuestore = fopen_dir($vuedjs . 'Store/' . ucfirst('model/') . ucfirst($item['name']) . '.js');
            $vuestore_write = Vue_StoreJs($item);
            fwrite($vuestore, $vuestore_write);
            $vueservice = fopen_dir($vuedjs . 'Service/' . ucfirst('model/') . ucfirst($item['name']) . '.js');
            $vueservice_write = Vue_ServiceJs($item);
            fwrite($vueservice, $vueservice_write);
        }
        if (in_array('soildjs', $json_set['front-end'])) {
            $solidjs = '../solidjs/src/shared/';
            $Interface = fopen_dir($solidjs . 'Interface/' . ucfirst('model/') . ucfirst($item['name']) . '.ts');
            fwrite($Interface, $Interface_write);
            $solidstore = fopen_dir($solidjs . 'Store/' . ucfirst('model/') . ucfirst($item['name']) . '.ts');
            $solidstore_write = SolidTsStore($item);
            fwrite($solidstore, $solidstore_write);
            $solidservice = fopen_dir($solidjs  . 'Service/' . ucfirst('model/') . ucfirst($item['name']) . '.ts');
            $solidservice_write = SolidServicesTs($item);
            fwrite($solidservice, $solidservice_write);
        }
    }
    $router_mode_raw = str_replace("{ ", "{", str_replace(["<?php", "?>", "\n", "\r\n", "\r", "\t", "    "], "", file_get_contents($output_path . ucfirst('Route/Routes_crud/') . ucfirst($item['name']) . '.php', 'TRUE')));
    preg_match_all($pattern_use_only, $router_mode_raw, $use_temp_single);
    if ($use_temp_single[0] != []) {
        foreach ($use_temp_single as $item) {
            $route_use_single .= $item;
        }
    }
    preg_match_all($pattern_use_multple, $router_mode_raw, $use_temp_multiple, PREG_SET_ORDER);
    if ($use_temp_multiple[0] != []) {
        foreach ($use_temp_multiple as $item) {
            if (isset($route_use_array[$item[1]])) {
                $route_use_array[$item[1]] = [...$route_use_array[$item[1]], ...array_values(explode(',', $item[2]))];
            } else {
                $route_use_array[$item[1]] = array_values(explode(',', $item[2]));
            }
        }
    }
    preg_match_all($pattern_route, $router_mode_raw, $router_temp);
    if ($router_temp[0] != []) {
        foreach ($router_temp[0] as $item) {
            $route_app .= "\n" . preg_replace('/(;(?!.*;))/', '', $item);
        }
    }
}
foreach ($route_use_array as $key => $value) {
    $route_use_multiple .= "use $key{" . implode(',', array_unique($value)) . "}; ";
}
$migration_sql = '';
$migration_relation = '';
foreach ($table as $item) {
    $migration_sql .= file_get_contents("../database/" . ucfirst('mysql/') . ucfirst($item['name']) . '.sql', 'TRUE');
    $migration_relation .= file_get_contents("../database/" . ucfirst('mysql/') . ucfirst('relations/') . ucfirst($item['name']) . '_relation.sql', 'TRUE');
}
$migration_sql .= 'INSERT INTO roles (name) VALUES ("' . implode('"),("', array_values(array_unique($roles))) . '");';
file_put_contents('../database/Migration.sql', ($migration_sql . ' ' . $migration_relation));
fwrite($route, str_replace('$route', '', php_w($route_use_single . $route_use_multiple . $route_app . "\n?->not_found();")));
file_put_contents('status.json', json_encode($json_set));
