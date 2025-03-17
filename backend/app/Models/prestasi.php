<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\Storage;
use function Pest\Laravel\delete;

class prestasi extends Model
{
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

    protected static function boot()
    {
        parent::boot();


        static::deleting(function ($prestasi) {
            if ($prestasi->prestasi_url_gambar && Storage::exists($prestasi->prestasi_url_gambar)) {
                Storage::delete($prestasi->prestasi_url_gambar);
            }
        });
        static::saved(function () {
            self::updateProfileCounts();
        });

        static::deleted(function () {
            self::updateProfileCounts();
        });
    }

    private static function updateProfileCounts()
    {
        $jumlahDataPrestasi = self::count();
        profile::query()->update(['jumlah_prestasi' => $jumlahDataPrestasi]);
    }
}
