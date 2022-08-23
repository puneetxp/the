<?php

namespace App\Dep\Back;

use App\Dep\Back\db;

class t_fun {

//for muliple file upload
  public static function reArray_Files(&$file_post) {

    $file_ary = array();
    $file_count = count($file_post['name']);
    $file_keys = array_keys($file_post);

    for ($i = 0; $i < $file_count; $i++) {
      foreach ($file_keys as $key) {
        $file_ary[$i][$key] = $file_post[$key][$i];
      }
    }

    return $file_ary;
  }

  public static function file_upload($sorce, $dir) {
    if (!is_dir($dir)) {
      mkdir($dir, 0755, true);
    }
    $x = $dir . $sorce['name'];
    if (move_uploaded_file($sorce['tmp_name'], $x)) {
      return $x;
    } else {
      return false;
    }
  }

  public static function get_data($data) {
    $relation = [];
    $id = isset($data['where_id']) ? $data['where_id'] : 'id';
    if ($data['where'] == '*') {
      $where = '';
    } elseif (is_array($data['where'])) {
      $where = ' where `' . $id . '` in (' . implode(',', $data['where']) . ')';
    } else {
      $where = ' where `' . $id . "` ='" . $data['where'] . "'";
    }
    $query = 'SELECT * FROM ' . $data['tabel'] . $where;
    if (isset($data['n']) && $data['n'] == 'single') {
      $x = db::getInstance()->get_result($query);
      if ($x) {
        if (isset($data['relations'])) {
          foreach ($data['relations'] as $relation) {
            if (!isset($relation['where'])) {
              $relation['where'] = 'id';
            }
            $relation['where'] = $x[$relation['where']];
            $x[$relation['tabel']] = Self::get_data($relation);
          }
        }
      }
    } else {
      $x = db::getInstance()->get_results($query);
      if (isset($data['relations'])) {
        foreach ($data['relations'] as $relation) {
          if (!isset($relation['where'])) {
            $relation['where'] = 'id';
          }
          $relationfresh = $relation;
          $relationfresh['where'] = array_column($x, $relation['where']);
          if (count($relationfresh['where']) > 0) {
            $relationdata = Self::get_data($relationfresh);
          }
          for (
                  $i = 0;
                  count($x) > $i;
                  $i++
          ) {
            if (isset($relation['n']) && $relation['n'] == 'one') {
              $x[$i][$relation['tabel']] = $relationdata[array_search($x[$i][$relation['where']], array_column($relationdata, isset($data['where_id']) ? $data['where_id'] : 'id'))];
            } else {
              $x[$i][$relation['tabel']] = array_values(array_filter($relationdata, function ($var) use ($relation, $x, $i) {
                        return($var[$relation['where_id']] == $x[$i][$relation['where']]);
                      }));
            }
          }
        }
      }
    }
    return $x;
  }

//public static function html_attribute($data) {
//  echo urldecode(http_build_query($data, '', ' '));
//}

  public static function arrays_mysql($data, $table = '', $action = '', $where = '') {
    $property = [];
    $arrayvalues = [];
    foreach ($data as $item) {
      foreach ($item as $key => $value) {
        array_push($property, $key);
      }
    }
    $property = array_unique($property);
    $values = [];
    foreach ($data as $item) {
      $x = [];
      foreach ($property as $value) {
        array_push($x, $item[$value]);
      }
      array_push($values, $x);
    }
    $valmysql = [];
    foreach ($values as $value) {
      array_push($valmysql, "('" . implode("','", $value) . "')");
    }
    $valmysql = implode(",", $valmysql);
    $fields = implode("`,`", $property);
    $r = "$action  `$table` (`$fields`) VALUES $valmysql $where";
    return $r;
  }

  public static function array_mysql($data, $table = '', $action = '', $where = '') {
    if ($action == 'INSERT INTO') {
      $fields = implode("`,`", array_keys($data));
      $values = implode("','", $data);
      $r = "$action  `$table` (`$fields`) VALUES ('$values') $where";
    } elseif ($action == 'DELETE') {
      $r = "DELETE FROM  `$table` $where";
    } elseif ($action == 'SELECT') {
      $r = "SELECT FROM  `$table` $where";
    } else {
      $r = [];
      foreach ($data as $key => $value) {
        array_push($r, '`' . $key . "`='" . $value . "'");
      }
      $r = implode(",", $r);
      $r = "$action `$table` SET $r  $where";
    }
    return $r;
  }

  public static function error_404() {
    http_response_code(404);
    require_once 'error404.php';
  }

}
