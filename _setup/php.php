<?php

function crud($name, $role, $action, $path = '')
{
 return '$route?->crud' .
  "(['" . implode("','", $action) . "'], '$path" .
  $name .
  "',[ 'read'=>['" . implode("','", $role['read']) . "'],'write'=>['" . implode("','", $role['write']) . "'],'update'=>['" . implode("','", $role['update']) . "'],'delete'=>['" . implode("','", $role['delete']) . "']] , " .
  ucfirst($name) . 'Controller::class' . "" . ");
";
}

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
 return php_w('
namespace App\Model;

use The\Model;

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
function controller($table)
{
 return php_w('
namespace App\Controller;

use App\Model\{
  ' . ucfirst($table['name']) . '
};

class ' . ucfirst($table['name']) . 'Controller {

    public static function index() {
        return ' . ucfirst($table['name']) . '::all();
    }

    public static function store() {
        return ' . ucfirst($table['name']) . '::create();
    }

    public static function show($id) {
        return ' . ucfirst($table['name']) . '::find($id);
    }

    public static function update($id) {
        return ' . ucfirst($table['name']) . '::update($id);
    }

    public static function upsert() {
        return ' . ucfirst($table['name']) . '::upsert($_POST);
    }

    public static function delete($id) {
        return ' . ucfirst($table['name']) . '::delete($id);
    }

}');
}
