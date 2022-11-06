<?php

use App\Dep\Back\{
    Route
};
use App\Dep\Front\View\Page;

$route = new Route();
$route?->get('/', [Page::class, 'Home']);
$route?->get('/contact-us', [Page::class, 'Contact_Us']);
$route?->get('/about-us', [Page::class, 'About_Us']);
$route?->get('/privacy-policy', [Page::class, 'Privacy_Policy']);
