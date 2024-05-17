<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Api\PersonnelController;
use App\Http\Api\CandidatController;


Route::get('/form', function () {
    return view('welcome');
});

//Personnel routes

Route::get('personnel', [PersonnelController::class, 'index']);
Route::post('personnel', [PersonnelController::class, 'store']);
Route::get('personnel/{id}',[PersonnelController::class, 'show']);
Route::put('personnel/{id}/edit', [PersonnelController::class, 'update']);
Route::delete('personnel/{id}/delete', [PersonnelController::class, 'destroy']);

//Candidat routes

Route::get('candidat', [CandidatController::class, 'index']);
Route::post('candidat', [CandidatController::class, 'store']);
Route::get('candidat/{id}',[CandidatController::class, 'show']);
Route::put('candidat/{id}/edit', [CandidatController::class, 'update']);
Route::delete('candidat/{id}/delete', [CandidatController::class, 'destroy']);