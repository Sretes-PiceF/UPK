<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class prestasi extends Model
{
    /** @use HasFactory<\Database\Factories\PrestasiFactory> */
    use HasFactory;
    use HasFactory;
    protected $table = 'prestasi';
    protected $primaryKet = 'prestasi_id';
    protected $keyType = 'string';
    public $timestamp = false;

    protected $fillable = [
        'prestasi_id',
        'profile_guru',
        'profile_siswa',
        'profile_prestasi_id',
        'profile_ekstrakulikuler_id'
    ];
}
