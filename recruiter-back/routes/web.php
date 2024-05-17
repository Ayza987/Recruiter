<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Api\PersonnelController;
use App\Http\Api\CandidatController;
use App\Http\Api\OffreController;


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

//Offre routes

Route::get('offre', [OffreController::class, 'index']);
Route::post('offre', [OffreController::class, 'store']);
Route::get('offre/{id}',[OffreController::class, 'show']);
Route::put('offre/{id}/edit', [OffreController::class, 'update']);
Route::delete('offre/{id}/delete', [OffreController::class, 'destroy']);