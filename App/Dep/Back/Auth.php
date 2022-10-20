<?php

namespace App\Dep\Back;

use App\Dep\Back\{
    Req,
    Sessions,
    Response
};
use App\Karl\Model\{
    User
};

/**
 * Description of Auth
 *
 * @author puneetxp
 */
class Auth {

    public static function login() {
        $user = Req::only(['email', 'password']);
        $pass = hash('sha3-256', $user['password']);
        $auth = User::find($user['email'], 'email')?->array();
        if ($auth['password'] == $pass) {
            $_SESSION['user_id'] = $auth['id'];
            session_destroy();
            (Req::one('remember_me')) ?
                            session_set_cookie_params(lifetime_or_options: 0, path: '/', domain: web, secure: true, httponly: true) :
                            session_set_cookie_params(lifetime_or_options: 1440, path: '/', domain: web, secure: true, httponly: true);
            session_start();
            $_SESSION['user_id'] = $auth['id'];
            $auth['roles'] = Sessions::roles();
            return Response::json(array_intersect_key($auth, array_flip(["name", "email", "id", "roles"])));
        }
        return Response::not_found();
    }

    public static function g_auth() {
        return;
    }

    public static function register() {
        $user = Req::only(['name', 'email', 'password']);
        $user['password'] = hash('sha3-256', $user['password']);
        if (User::find($user['email'], 'email')?->array() == null) {
            $auth = User::create($user)->array();
            if (is_array($auth)) {
                session_destroy();
                (Req::one('remember_me')) ?
                                session_set_cookie_params(lifetime_or_options: 0, path: '/', domain: web, secure: true, httponly: true) :
                                session_set_cookie_params(lifetime_or_options: 1440, path: '/', domain: web, secure: true, httponly: true);
                session_start();
                $_SESSION['user_id'] = $auth['id'];
                $auth['roles'] = Sessions::roles();
                return Response::json(array_intersect_key($auth, array_flip(["name", "email", "id", "roles"])));
            }
            return Response::bad_req();
        } else {
            return Response::unprocessable(['email' => 'Email Already Taken']);
        }
    }

    public static function auth_roles() {
        if (isset($_SESSION['user_id'])) {
            return User::find(id: $_SESSION['user_id'], col: ['id', 'email', 'name'])
                            ->wfast([['active_role' => 'role']])
                            ->filter_items(['id', 'email', 'name', 'role'], ['role' => 'name']);
        }
    }

    public static function logout() {
        session_destroy();
        return Response::json('logout');
    }

}
