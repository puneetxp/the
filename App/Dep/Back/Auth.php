<?php

namespace App\Dep\Back;

use App\Dep\Back\{
   Req,
   Sessions,
   Response
};
use App\Karl\Model\{
   User,
};

/**
 * Description of Auth
 *
 * @author puneetxp
 */
class Auth {

   public static function login() {
      $user = Req::only(['user', 'email', 'password']);
      $pass = hash('sha3-256', $user['password']);
      $auth = User::find($user['email'], 'email')->array();
      if ($auth['password'] == $pass) {
         $_SESSION['user_id'] = $auth['id'];
         (Req::one('remember_me')) ? session_set_cookie_params(lifetime_or_options: 0, path: '/', domain: web, secure: false, httponly: true) : session_set_cookie_params(lifetime_or_options: 1440, path: '/', domain: web, secure: false, httponly: true);
         $auth['roles'] = Sessions::roles();
         return Response::json($auth);
      }
      return Response::not_found();
   }

   public static function register() {
      $user = Req::only(['name', 'email', 'password']);
      $user['password'] = hash('sha3-256', $user['password']);
      $auth = User::create($user)->array();
      if (is_array($auth)) {
         $_SESSION['user_id'] = $auth['id'];
         (Req::one('remember_me')) ? session_set_cookie_params(lifetime_or_options: 0, path: '/', domain: web, secure: false, httponly: true) : session_set_cookie_params(lifetime_or_options: 1440, path: '/', domain: web, secure: false, httponly: true);
         $auth['roles'] = Sessions::roles();
         return Response::json($auth);
      }
      return Response::bad_req();
   }

   public static function logout() {
      session_destroy();
      return Response::json('logout');
   }

   public static function session() {
      
   }

}
