<?php

use App\Http\Controllers\EkstrakulikulerController;
use App\Http\Controllers\PpdbController;
use App\Http\Controllers\PrestasiController;
use App\Http\Controllers\prestasiController as ControllersPrestasiController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource("/profile", ProfileController::class);
Route::apiResource("/ppdb", PpdbController::class);
Route::apiResource("/ekstrakulikuler", EkstrakulikulerController::class);
Route::apiResource("/prestasi", ControllersPrestasiController::class);