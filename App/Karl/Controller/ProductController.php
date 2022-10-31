<?php namespace App\Karl\Controller;
use App\Karl\Model\{Product};
 class ProductController { public static function index(){return Product::all();}
  public static function store() { return Product::create(); }
  public static function show($id) { return Product::find($id); }
  public static function update($id) { return Product::update($id);}
  public static function upsert() {return Product::upsert($_POST);}
  public static function delete($id) { return Product::delete($id); }} 