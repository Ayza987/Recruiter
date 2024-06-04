<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Api\PersonnelController;
use App\Http\Api\CandidatController;
use App\Http\Api\OffreController;
use App\Http\Api\CongésController;
use App\Http\Api\DocumentsController;
use App\Http\Controllers\FileUploadController;



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

//Congés routes

Route::get('congés', [CongésController::class, 'index']);
Route::post('congés', [CongésController::class, 'store']);
Route::get('congés/{id}',[CongésController::class, 'show']);
Route::put('congés/{id}/edit', [CongésController::class, 'update']);
Route::delete('congés/{id}/delete', [CongésController::class, 'destroy']);

//Documents routes

Route::get('documents', [DocumentsController::class, 'index']);
Route::post('documents', [DocumentsController::class, 'store']);
Route::get('documents/{id}',[DocumentsController::class, 'show']);
Route::put('documents/{id}/edit', [DocumentsController::class, 'update']);
Route::delete('documents/{id}/delete', [DocumentsController::class, 'destroy']);

//Files routes

Route::post('/upload', [FileUploadController::class, 'upload']);
