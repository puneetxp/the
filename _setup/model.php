<?php

function model($table)
{
   $nullable = [];
   foreach ($table['data'] as $sql) {
      if (str_contains($sql['sql_attribute'], 'NOT NULL')) {
      } else {
         $nullable[] = $sql['name'];
      }
   }
   $relations_key = array_keys($table['relations']);
   $relations = '';
   if (count($relations_key) > 0) {
      $relations .= '[';
      $t = 0;
      foreach ($relations_key as $key) {
         if ($t == 0 || $t == count($relations_key)) {
            $relations .= '';
         } else {
            $relations .= ',';
         }
         $relations .= "'$key'=>[";
         $f = 0;
         foreach ($table['relations'][$key] as $id => $value) {
            if ($f == 0 || $f == count($table['relations'][$key])) {
               $relations .= '';
            } else {
               $relations .= ',';
            }
            $relations .= "'$id'" . '=>'
               . "'$value'";
            ++$f;
         }
         $relations .= ",'callback'" . '=>' . ucfirst($key) . "::class" . ']';
         ++$t;
      }
      $relations .= ']';
   }
   $fillable = "['";
   $fillable_array = [];
   foreach ($table['data'] as $value) {
      if (!isset($value['fillable'])) {
         $fillable_array[] = $value['name'];
      } else {
         if ($value['fillable'] == 'true') {
            $fillable_array[] = $value['name'];
         }
      }
   }
   $fillable .= implode("','", $fillable_array);
   $fillable .= "']";
   return php_w('namespace App\Karl\Model;

use App\Dependencies\Model;

class ' . ucfirst($table['name']) . ' extends Model {

      public $model = ' . json_encode(array_column($table['data'], 'name')) . ';
      public $name = "' . $table['name'] . '";
      public $nullable = ' . json_encode($nullable) . ';
      protected $table = "' . $table['table'] . '";       
      protected $relations = ' . ($relations == '' ? '""' : $relations) . ';
      protected $fillable = ' . $fillable . ';

}
   
   ');
}
