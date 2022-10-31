<?php

define('DBUSER', 'username');
define('DBPWD', 'password');
define('DBHOST', 'localhost');
define('DBNAME', 'demo');
define('web', 'the.com');
define('secure',false);
define('httponly',true);
define('same_site',"Strict");

require_once __DIR__ . '/App/Dep/Back/start.php';
require_once __DIR__ . '/vendor/autoload.php';
