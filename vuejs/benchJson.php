<?php


include __DIR__ . '/../vendor/autoload.php';
$app = new AppGati;
$var = 1;
$app->step('start');
for ($i = 0; $i < 10000000; $i++) {
 $_POST = json_decode(file_get_contents('php://input'), true);
 $var = $_POST['st']*$var;
}

$app->step('end');

$report = $app->getReport('start', 'end');

header('Content-Type: application/json; charset=utf-8');
print_r($report);
