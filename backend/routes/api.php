<?php

use App\Http\Controllers\PrestasiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource("/prestasi", PrestasiController::class);