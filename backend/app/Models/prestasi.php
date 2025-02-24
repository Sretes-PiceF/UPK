<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class prestasi extends Model
{
    /** @use HasFactory<\Database\Factories\PrestasiFactory> */
    use HasFactory;
    protected $table = 'prestasi';
    public $timestamp = false;
    protected $guarded = [];
}
