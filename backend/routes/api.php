<?php

use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ImageController;
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


Route::post('/user/login', [UserController::class, 'userLogin']);

Route::post('/user/register', [UserController::class, 'registerUser']);

Route::middleware('auth:sanctum')->post('/user/logout', [UserController::class, 'userLogout']);

Route::get('/properties', [PropertyController::class, 'getAllProperties']);

Route::get('/properties/search', [PropertyController::class, 'searchProperty']);

Route::get('/properties/types', [PropertyController::class, 'getPropertyTypes']);

Route::get('/image/{property_id}', [ImageController::class, 'getFirstPictures']);

Route::post('/favorites/isin', [FavoriteController::class, 'checkIsItIn']);

Route::middleware('auth:sanctum')->post('/properties/myproperties', [PropertyController::class, 'getAllPropertiesToUser']);

Route::middleware('auth:sanctum')->post('/add/property', [PropertyController::class, 'addProperty']);

Route::middleware('auth:sanctum')->delete('/deleteProperty/{id}', [PropertyController::class, 'deleteProperty']);

Route::middleware('auth:sanctum')->post('/upload_image', [ImageController::class, 'store']);

Route::middleware('auth:sanctum')->get('/images/{property_id}', [ImageController::class, 'getImages']);

Route::middleware('auth:sanctum')->get('/property/{property_id}', [PropertyController::class, 'getProperty']);

Route::middleware('auth:sanctum')->get('/owner/{user_id}', [UserController::class, 'getUserNameAndEmail']);

//Route::get('/properties/number', [PropertyController::class, 'getPropertiesNumber']);

Route::middleware('auth:sanctum')->post('/message/send', [MessageController::class, 'newMessage']);

Route::middleware('auth:sanctum')->post('/user/messages', [MessageController::class, 'getMessages']);

Route::middleware('auth:sanctum')->post('/user/favorites', [FavoriteController::class, 'getUserFavorites']);

Route::middleware('auth:sanctum')->post('/favorites', [FavoriteController::class, 'addFavorite']);

Route::middleware('auth:sanctum')->post('/favorites/delete', [FavoriteController::class, 'removeFavorite']);



