<?php
/*
Name: Mia Ehrlich
Coding 06
Purpose: This is the php contact page that loads the mustache templates for for a mobile first responsive
    site using bootstrap and jquery
 */

//this will load the mustache template library
require_once 'mustache/mustache/src/Mustache/Autoloader.php';
Mustache_Autoloader::register();

//this will create a new mustache template engine
$mustache = new Mustache_Engine;

//these lines load your header, footer, and body template into strings
$header = file_get_contents('templates/header.html');
$body = file_get_contents('templates/contact.html');
$footer = file_get_contents('templates/footer.html');

/*
 * the following three lines of code set up your PAGE SPECIFIC variables
 * these will be different page to page. page specific data is loaded into
 * an associative array where the key is used by Mustache as a {{variable}}
 * and the value is inserted into the page (see the template examples).
 */

//this will be used to send the page title into the page
$header_data = ["pagetitle" => "Contact"];

//this is empty because there is no data to send to the body in this example
$body_data = [];

//this is being used to send a footer title and local time to the footer
$footer_data = [];

/*
 * this combines the variables with the templates and creates a complete web page.
 * each page can now have the same header and footer style with different variables
 * such as page title. in this way we can use a single header and footer template
 * for all pages, and only worry about changing the body from page to page.
 */
echo $mustache->render($header, $header_data) . PHP_EOL;
echo $mustache->render($body, $body_data) . PHP_EOL;
echo $mustache->render($footer, $footer_data) . PHP_EOL;