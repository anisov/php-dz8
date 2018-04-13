<?php
require_once __DIR__ . "/../../../vendor/autoload.php";

use App\Core\BootLoader;

new BootLoader();

use App\Models\Product;
use App\Models\Category;
use Faker\Factory;

$factory = Factory::create();
for ($i = 0; $i < 10; $i++) {
    $category = new Category();
    $category->name = $factory->name();
    $category->save();

    $product = new Product();
    $product->name = $factory->name();
    $product->price = $factory->numberBetween(1-99);
    $product->category_id = $category->id;
    $product->save();
}
