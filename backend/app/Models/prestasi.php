<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class prestasi extends Model
{
    /** @use HasFactory<\Database\Factories\PrestasiFactory> */
    use HasFactory;

    protected $table = 'prestasi';
    protected $primaryKey = 'prestasi_id';
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'prestasi_id',
        'prestasi_juara',
        'prestasi_namasiswa',
        'prestasi_deskripsi',
        'prestasi_url_gambar'
    ];
}
