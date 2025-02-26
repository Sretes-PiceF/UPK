<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ekstrakulikuler extends Model
{
    /** @use HasFactory<\Database\Factories\EkstrakulikulerFactory> */
    use HasFactory;
protected $table = "ekstrakulikuler";
protected $primaryKey = 'ekstrakulikuler_id';
protected $keyType = "string";


    public $timestamps = false;

    protected $fillable = [
        'ekstrakulikuler_id',
        'ekstrakulikuler_judul',	
        'ekstrakulikuler_deskripsi',
        'ekstrakulikuler_url_gambar'
    ];
}
