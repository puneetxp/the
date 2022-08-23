<?php

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/PHPClass.php to edit this template
 */

namespace App\Dep\Back;

/**
 * Get The $_POST value 
 *
 * @author puneetxp
 */
class Req {

   public static function only(array $array) {
      $filtered = [];
      foreach ($_POST as $k => $v) {
         if (in_array($k, $array)) {
            $filtered[$k] = $v;
         }
      }
      return $filtered;
   }

   public static function one(string $one) {
      return self::only([$one]);
   }

   //put your code here
}
