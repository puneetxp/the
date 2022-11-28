<?php namespace App\The\Model;

use App\TheDep\Model;

class Role extends Model {

      public $model = ["name","enable","id","created_at","updated_at"];
      public $name = "role";
      public $nullable = ["id"];
      protected $table = "roles";       
      protected $relations = ['active_role'=>['table'=>'active_roles','name'=>'id','key'=>'role_id','callback'=>Active_role::class]];
      protected $fillable = ['name','enable'];

}
   
   