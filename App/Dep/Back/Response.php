<?php

namespace App\Dep\Back;

/**
 * Description of Response with JSON and with HTTP response code
 *
 * @author puneetxp
 */
class Response
{

    public static function json($data = '')
    {
        header('Content-Type: application/json; charset=utf-8');
        if (isset($_SESSION['user_id'])) {
            session_regenerate_id();
        }
        return json_encode($data);
    }
    public static function not_found($data = '')
    {
        if (isset($_SESSION['user_id'])) {
            session_regenerate_id();
        }
        http_response_code(404);
        return json_encode($data);
    }

    public static function not_authorised($data = '')
    {
        if (isset($_SESSION['user_id'])) {
            session_regenerate_id();
        }
        http_response_code(403);
        return json_encode($data);
    }

    public static function unprocessable($data = '')
    {
        if (isset($_SESSION['user_id'])) {
            session_regenerate_id();
        }
        http_response_code(422);
        return json_encode($data);
    }

    public static function bad_req($data = '')
    {
        if (isset($_SESSION['user_id'])) {
            session_regenerate_id();
        }
        http_response_code(400);
        return json_encode($data);
    }

    public static function why($data = ["erro" => "your should not be here"])
    {
        if (isset($_SESSION['user_id'])) {
            session_regenerate_id();
        }
        return json_encode($data);
    }
}
