<?php

$y = fopen('./Component.php', 'w');
$x = "<?php namespace App\Dep\Front\View; \n class Component {";
$pattern = "/<\?php(.*)\?>/";
foreach (glob("*/*/*.php") as $filename) {
    $small = str_replace(["\n", "\r\n", "\r", "\t", "    ","                  "], "", fread(fopen($filename, "r"), filesize($filename)));
    preg_match_all($pattern, $small, $use_temp_multiple, PREG_SET_ORDER);
    $x .= $use_temp_multiple[0][1];
}
$x .= " }";
$x = str_replace('?><?php', '', $x);
$x = str_replace('function ', 'public static function ', $x);
fwrite($y, $x);
?>