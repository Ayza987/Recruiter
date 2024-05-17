<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Congés extends Model
{
    use HasFactory;

    protected $table ='congés';
    public $timestamps = false;

    protected $fillable = [
        'id_personnel',
        'date_debut',
        'date_fin',
        'type_congés',
        'statut_congés'
        
    ];
}
