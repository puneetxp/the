<?php

function controller($table) {
  return php_w(
          'namespace App\Karl\Controller;' .
          'use App\Karl\Model\{' . ucfirst($table['name']) . '}; ' .
          class_wrapper(ucfirst($table['name']) . 'Controller',
                  " public static function index(){return " . ucfirst($table['name']) . "::all();}" .
                  ' public static function store() { return ' . ucfirst($table['name']) . '::create(); }' .
                  " public static function show(" . '$id' . ") { return " . ucfirst($table['name']) . '::find($id); }' .
                  " public static function update(" . '$id' . ') { return ' . ucfirst($table['name']) . '::update($id);}' .
                  " public static function delete(" . '$id' . ") { return " . ucfirst($table['name']) . '::delete($id); }'));
}
