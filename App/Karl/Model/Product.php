<?php namespace App\Karl\Model;use App\Karl\Model; class Product extends Model {public $model = ["name","slug","enable","id","created_at","updated_at"];public $name = "product";public $nullable = ["id"];protected $table ="products";protected $relations ="";protected $fillable =['name','slug','enable'];} 