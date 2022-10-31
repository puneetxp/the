<?php

namespace App\Dep\Front;

class Set
{
  /*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/PHPClass.php to edit this template
 */

  /**
   * Description of front-end
   *
   * @author puneetxp
   */
  function karl_v($data, $prefix = '../resources/view/')
  {
    include $prefix . str_replace('.', '/', ($data)) . '.php';
  }
  function html_attribute($data)
  {
    $x = '';
    foreach ($data as $key => $value) {
      $x .= $key . '="' . $value . '" ';
    }
    echo $x;
  }
}
