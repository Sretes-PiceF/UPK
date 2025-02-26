<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ppdb extends Model
{
    /** @use HasFactory<\Database\Factories\PpdbFactory> */
    use HasFactory;
protected $table = 'ppdb';
protected $primaryKey = 'ppdb_id';
protected $keyType = "string";
public $timestamps = false;

protected $fillable = [
    'ppdb_id',
    'ppdb_deskripsi1',	
    'ppdb_deskripsi2',
    'ppdb_notelp',
    'ppdb_namaguru',	
    'ppdb_url_gambar'
];
}
