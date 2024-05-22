<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Personnel extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $table ='personnel';
    public $timestamps = false;

    protected $fillable = [
        'nom',
        'prenom',
        'poste',
        'email',
        'telephone',
        'password',
        'statut'
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
