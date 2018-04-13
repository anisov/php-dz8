<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Capsule\Manager as Capsule;

require_once "config.php";

Capsule::schema()->dropIfExists('category');
Capsule::schema()->create('category', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
});

Capsule::schema()->dropIfExists('product');
Capsule::schema()->create('product', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
    $table->string('price');
    $table->integer('category_id')->unsigned();
    $table->foreign('category_id')->references('id')->on('category');
});
