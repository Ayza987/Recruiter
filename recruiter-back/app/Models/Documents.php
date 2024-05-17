<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documents extends Model
{
    use HasFactory;

    protected $table ='documents';
    public $timestamps = false;

    protected $fillable = [
        'id_candidat',
        'id_offre',
        'nom',
        'document'
        
    ];
}
