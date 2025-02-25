<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prestasi', function (Blueprint $table) {
            $table->string('prestasi_id', 16)->primary()->nullable(false);
            $table->string('prestasi_juara', 225)->nullable(false);
            $table->string('prestasi_namasiswa', 225)->nullable(false);
            $table->string('prestasi_deskripsi', 225)->nullable(false);
            $table->string('prestasi_url_gambar')->nullable();
            
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prestasi');
    }
};
