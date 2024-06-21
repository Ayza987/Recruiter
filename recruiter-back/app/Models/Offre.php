<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offre extends Model
{
    use HasFactory;

    protected $table ='offre';
    public $timestamps = false;

    protected $fillable = [
        'intitulé',
        'description',
        'departement',
        'statut_offre',
        'date_butoir',
        'type_offre',
        
        
    ];
}
