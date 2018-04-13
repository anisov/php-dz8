<?php

namespace App\Controllers;

use App\Core\MainController;
use App\Models\Product;

class Products extends MainController
{
    public function index()
    {
        if ($_SERVER['REQUEST_METHOD'] == "GET") {
            if (isset($_REQUEST['id'])) {
                $id = $_REQUEST['id'];
                $product = Product::with('category')->where('id', '=', $id)->first();
                echo $product->toJson();
            } else {
                $product = Product::all()->toJson();
                echo $product;
                die();
            }
        }

        if ($_SERVER['REQUEST_METHOD'] == "POST") {
            try {
                $product = new Product();
                $product->name = $_POST['name'];
                if (!is_numeric($_POST['price'])) {
                    header("HTTP/1.1 404 Not Found");
                    echo json_encode('Цена должна быть числовой');
                    die();
                }
                $product->category_id = $_POST['category_id'];
                $product->price = $_POST['price'];
                $product->save();
            } catch (\Exception $e) {
                header("HTTP/1.1 404 Not Found");
                echo json_encode('Такой категории нет');
                die();
            }
            echo $product->toJson();
            die();
        }

        if ($_SERVER['REQUEST_METHOD'] == "DELETE") {
            $product = Product::find($_REQUEST['id']);
            $product->delete();
            echo $product->toJson();
            die();
        }

        if ($_SERVER['REQUEST_METHOD'] == "PUT") {
            parse_str(file_get_contents('php://input'), $_PUT);
            $product = Product::find($_PUT['id']);
            $product->name = $_PUT['name'];
            if (!is_numeric($_PUT['price'])) {
                header("HTTP/1.1 404 Not Found");
                echo json_encode('Цена должна быть числовой');
                die();
            }
            $product->price = $_PUT['price'];
            $product->save();
            echo $product->toJson();
            die();
        }
    }
}