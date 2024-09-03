<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/messages', [MessageController::class, 'index']);
Route::post('/user/login', [UserController::class, 'userLogin']);
Route::post('/user/register', [UserController::class, 'registerUser']);
Route::get('/properties', [PropertyController::class, 'getAllProperties']);
Route::get('/properties/search', [PropertyController::class, 'searchProperty']);
Route::get('/properties/types', [PropertyController::class, 'getPropertyTypes']);
Route::post('/add/property', [PropertyController::class, 'addProperty']);
Route::delete('/deleteProperty/{id}', [PropertyController::class, 'deleteProperty']);

