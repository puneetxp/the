<?php

namespace App\Dep\Back;

/**
 * Description of Response with JSON and with HTTP response code
 *
 * @author puneetxp
 */
class Response {

   public static function json($data) {
      header('Content-Type: application/json; charset=utf-8');
      return json_encode($data);
   }

   public static function not_found() {
      http_response_code(404);
      return;
   }

   public static function not_authorised() {
      http_response_code(403);
      return;
   }

   public static function unprocessable() {
      http_response_code(422);
      return;
   }
      public static function bad_req() {
      http_response_code(400);
      return;
   }

}
