<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Api\PersonnelController;

Route::get('/form', function () {
    return view('welcome');
});

Route::get('personnel', [PersonnelController::class, 'index']);
Route::post('personnel', [PersonnelController::class, 'store']);
Route::get('personnel/{id}',[PersonnelController::class, 'show']);
Route::put('personnel/{id}/edit', [PersonnelController::class, 'update']);
Route::delete('personnel/{id}/delete', [PersonnelController::class, 'destroy']);