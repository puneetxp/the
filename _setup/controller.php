<?php

function controller($table){
  return php_w('namespace App\The\Controller;

use App\The\Model\{
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