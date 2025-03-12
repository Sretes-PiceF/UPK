<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class profile extends Model
{
    /** @use HasFactory<\Database\Factories\ProfileFactory> */
    use HasFactory;
    protected $table = "profile";
    protected $primaryKey = "id";


    protected $keyType = "string";
    public $timestamps = false;

    protected $fillable = [
        'id',
        'profile_guru',
        'profile_siswa',
        'jumlah_prestasi',
        'jumlah_ekstrakulikuler'
    ];
}
