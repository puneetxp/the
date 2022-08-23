<?php

function interface_set($table) {
  $x = [];
  foreach ($table['data'] as $item) {
    $x[] = $item['name'] . ':' . $item['datatype'];
  }
  return "export interface " . $table['name'] . "{ " . implode(',',$x) . '}';
}
