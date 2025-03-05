<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'users';
    protected $primaryKey = 'user_id';
    protected $keyType = 'string';
    public $incrementing = false;
    public $fillable = [
        "user_id",
        "user_nama",
        "user_email",
        "user_username",
        "user_password",
        "user_notelp",
        "user_level"
    ];

    protected $hidden = [
        'user_password',
        'remembet_token',
        'user_id',
        'user_email',
    ];
}
