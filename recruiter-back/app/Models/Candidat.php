<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidat extends Model
{
    use HasFactory;

    protected $table ='candidat';
    public $timestamps = false;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'Date_de_naissance',
        'telephone',
        'Adresse',
        'statut',
        'intitule'
        
    ];
}
