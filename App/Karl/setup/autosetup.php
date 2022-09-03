<?php

require_once '../../../env.php';
$pattern_route = '/\$route.*?;/';
$pattern_use_only = '/use.*?\w;/';
$pattern_use_multple = "/use(.*?){(.*.)};/";
$route_use_single = '';
$route_use_array = [];
$route_use_multiple = '';
$route_app = 'use App\Dep\Back\Route; $route= new Route();';
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
      if ($value != ["-"]) {
         $roles = array_merge($value, $roles);
      }
   }
   $table[] = table_set($item, $x);
}

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
$route = fopen($output_path . ucfirst('Web/') . 'api.php', 'w');
$router_write = ' use App\Dep\Back\Route; $route= new Route();';
$controller_route = [];
foreach ($table as $item) {
   isset($json_set['table'][$item['name']]) ? '' : $json_set['table'][$item['name']] = false;
   if ($json_set['table'][$item['name']] == false || $json_set['fresh'] == true) {
      $model = fopen($output_path . ucfirst('model/') . ucfirst($item['name']) . '.php', 'w');
      $model_write = model($item);
      fwrite($model, $model_write);
      $controller_write = controller($item);
      if ($item['controller'] == '') {
         $controller = fopen($output_path . ucfirst('controller/') . ucfirst($item['name']) . 'Controller.php', 'w');
         fwrite($controller, $controller_write);
      }
      $controller_route[] = ucfirst($item['name']) . 'Controller';
      $route_file = fopen($output_path . ucfirst('Route/Routes_crud/') . ucfirst($item['name']) . '.php', 'w');
      $router_model = crud($item['name'], $item['roles'], $item['crud']);
      $router_write .= $router_model;
      fwrite($route_file, php_wrapper("use App\Karl\Controller\{ " . ucfirst($item['name']) . "Controller};" . $router_model));
      $interface = fopen($output_path . ucfirst('interface/') . ucfirst($item['name']) . '.ts', 'w');
      $interface_write = interface_set($item);
      fwrite($interface, $interface_write);
      $mysql = fopen($output_path . ucfirst('mysql/') . ucfirst($item['name']) . '.sql', 'w');
      $mysql_relation_file = fopen($output_path . ucfirst('mysql/') . ucfirst($item['name']) . '_relation.sql', 'w');
      $mysql_write = mysql_table($item);
      $mysql_relation = migrate_table($item);
      fwrite($mysql_relation_file, $mysql_relation);
      fwrite($mysql, $mysql_write);
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
         $route_app .= $item;
      }
   }
}
$router_mode_raw = str_replace("{ ", "{", str_replace(["<?php", "?>", "\n", "\r\n", "\r", "\t", "    "], "", file_get_contents($output_path . ucfirst('Route/Api.php'), 'TRUE')));
if ($router_mode_raw != '') {
   preg_match_all($pattern_use_only, $router_mode_raw, $use_temp_single);
   if ($use_temp_single[0] != []) {
      foreach ($use_temp_single[0] as $item) {
         $route_use_single .= $item;
      }
   }
   preg_match_all($pattern_use_multple, $router_mode_raw, $use_temp_multiple, PREG_SET_ORDER);
   if ($use_temp_multiple != []) {
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
   }
   preg_match_all($pattern_route, $router_mode_raw, $router_temp);
   if ($router_temp[0] != []) {
      foreach ($router_temp[0] as $item) {
         $route_app .= $item;
      }
   }
}
foreach ($route_use_array as $key => $value) {
   $route_use_multiple .= "use $key{" . implode(',', $value) . "};";
}
$migration_sql = '';
$migration_relation = '';
foreach ($table as $item) {
   $migration_sql .= file_get_contents($output_path . ucfirst('mysql/') . ucfirst($item['name']) . '.sql', 'TRUE');
   $migration_relation .= file_get_contents($output_path . ucfirst('mysql/') . ucfirst($item['name']) . '_relation.sql', 'TRUE');
}
$migration_sql .= 'INSERT INTO roles (name) VALUES ("' . implode('"),("', array_values(array_unique($roles))) . '");';
file_put_contents('../Migration.sql', ($migration_sql . ' ' . $migration_relation));
fwrite($route, php_w($route_use_single . $route_use_multiple . $route_app . '$route->listen();'));
file_put_contents('status.json', json_encode($json_set));
