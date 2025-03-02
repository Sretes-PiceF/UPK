<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class profil extends Model
{
    /** @use HasFactory<\Database\Factories\ProfilFactory> */
    use HasFactory;
    protected $table = 'profile';
    protected $primaryKet = 'profile_id';
    protected $keyType = 'string';
    public $timestamp = false;

    protected $fillable = [
        'profile_id',
        'profile_guru',
        'profile_siswa',
        'profile_prestasi_id',
        'profile_ekstrakulikuler_id'
    ];
}
