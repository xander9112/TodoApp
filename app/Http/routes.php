<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

Route::group(['prefix' => 'auth'], function () {
    // Маршруты аутентификации...
    Route::get('login', 'Auth\AuthController@getLogin');
    Route::post('login', 'Auth\AuthController@postLogin');
    Route::get('logout', 'Auth\AuthController@getLogout');

    // Маршруты регистрации...
    Route::get('registration', 'Auth\AuthController@getRegister');
    Route::post('registration', 'Auth\AuthController@postRegister');
    Route::post('registration/validateEmail', 'Auth\AuthController@validateEmail');
});

Route::group(['prefix' => 'tasks'], function () {
    Route::get('/', 'TaskController@index');
    Route::post('/', 'TaskController@store');
    Route::get('/{task}', 'TaskController@task');
    Route::put('/{task}', 'TaskController@updateTask');
    Route::delete('/{task}', 'TaskController@destroy');
});
