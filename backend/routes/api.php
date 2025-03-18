<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EkstrakulikulerController;
use App\Http\Controllers\PpdbController;
use App\Http\Controllers\prestasiController as ControllersPrestasiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Resource Routes
Route::apiResource("/profile", ProfileController::class);
Route::apiResource("/ppdb", PpdbController::class);
Route::apiResource("/ekstrakulikuler", EkstrakulikulerController::class);
Route::apiResource("/prestasi", ControllersPrestasiController::class);
// Route::post('/prestasi/update/{id}', [ControllersPrestasiController::class, 'update']);
Route::apiResource('viewUser', UserController::class);
Route::apiResource('/register', UserController::class);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);
});


Route::post('/login', [AuthController::class, 'login']);
