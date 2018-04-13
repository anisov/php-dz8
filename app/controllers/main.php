<?php

namespace App\Controllers;

use App\Core\MainController;

class Main extends MainController
{
    public function index()
    {
        $this->view->twigLoad('index', []);
    }
}