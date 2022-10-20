<?php

namespace App\Dep\Back;

use App\Dep\Back\{
   Response,
   Sessions
};

/**
 * Routing Module of TPHP 
 *
 * @author puneetxp
 */
class Route {

   public function __construct(
           private $_routes = [
               "GET" => [],
               "POST" => [],
               "PATCH" => [],
               "DELETE" => [],
               "PUT" => [],
           ],
           private $_trim = '/\^$',
           private $_uri = '',
           private $_method = '',
           private $_match_route = [],
           private $_roles = []
   ) {
      $this->active_route_set();
   }

   public function active_route_set() {
      $this->_uri = trim(isset($_REQUEST['uri']) ? filter_var($_REQUEST['uri'], FILTER_SANITIZE_URL) : '/', $this->_trim);
      $this->_method = isset($_SERVER['REQUEST_METHOD']) ? filter_var($_SERVER['REQUEST_METHOD'], FILTER_SANITIZE_URL) : 'GET';
      $this->_realUri = explode('/', $this->_uri);
      $this->_roles = Sessions::roles();
   }

   public function listen() {
      foreach ($this->_routes[$this->_method] as $route) {
         $route_uri = $route['uri'];
         if (preg_match("#^$route_uri$#", $this->_uri)) {
            $this->_match_route = $route;
            $this->match_permission();
            return;
         }
      }
      http_response_code(404);
      return;
   }

   public function match_permission() {
      if ($this->_match_route['roles'] === [''] || array_intersect($this->_match_route['roles'], $this->_roles)) {
         $this->run_route();
      } else {
         http_response_code(403);
      }
      return;
   }

   public function run_route() {
      $fakeUri = explode('/', $this->_match_route['uri']);
      foreach ($fakeUri as $key => $value) {
         if ($value == '.+') {
            $this->_match_route['value'][] = $this->_realUri[$key];
         }
      }
      $return = call_user_func_array($this->_match_route['call'], $this->_match_route['value']);
      echo $return;
      return;
   }

   public function get($uri, $function, $roles = [''], $value = []) {
      $this->_routes['GET'][] = ["uri" => trim($uri, $this->_trim), "roles" => $roles, "call" => $function, 'value' => $value];
   }

   public function post($uri, $function, $roles = [''], $value = []) {
      $this->_routes['POST'][] = ["uri" => trim($uri, $this->_trim), "roles" => $roles, "call" => $function, 'value' => $value];
   }

   public function patch($uri, $function, $roles = [''], $value = []) {
      $this->_routes['PATCH'][] = ["uri" => trim($uri, $this->_trim), "roles" => $roles, "call" => $function, 'value' => $value];
   }

   public function put($uri, $function, $roles = [''], $value = []) {
      $this->_routes['PUT'][] = ["uri" => trim($uri, $this->_trim), "roles" => $roles, "call" => $function, 'value' => $value];
   }

   public function delete($uri, $function, $roles = [''], $value = []) {
      $this->_routes['DELETE'][] = ["uri" => trim($uri, $this->_trim), "roles" => $roles, "call" => $function, 'value' => $value];
   }

   public function crud($crud, $name, $permission, $controller) {
      if (in_array('r', $crud)) {
         Self::get($name, [$controller, 'index'], $permission['read']);
         Self::get($name . '/.+', [$controller, 'show'], $permission['read']);
      }
      if (in_array('c', $crud)) {
         Self::post($name, [$controller, 'store'], $permission['write']);
      }
      if (in_array('u', $crud)) {
         Self::patch($name . '/.+', [$controller, 'update'], $permission['update']);
         Self::put($name, [$controller, 'upsert'], $permission['update']);
      }
      if (in_array('d', $crud)) {
         Self::delete($name . '/.+', [$controller, 'delete'], $permission['delete']);
      }
   }

   public function allroutes() {
      echo Response::json($this->_routes);
      return;
   }

// end of Listen
}
