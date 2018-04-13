<?php
require_once __DIR__ . "/../../../vendor/autoload.php";

use App\Core\BootLoader;

new BootLoader();

require_once __DIR__ . "/categoryMigrations.php";
require_once __DIR__ . "/productMigrations.php";


new categoryMigrations();
new productMigrations();
