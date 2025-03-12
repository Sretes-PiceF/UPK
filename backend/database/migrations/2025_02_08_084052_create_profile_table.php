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
        Schema::create('profile', function (Blueprint $table) {
            $table->id();
            $table->integer('profile_guru')->nullable(false);
            $table->integer('profile_siswa')->nullable(false);
            $table->integer('jumlah_prestasi')->default(0);
            $table->integer('jumlah_ekstrakulikuler')->default(0);

            //Membuat Foreign Key(penyambungan colom antar table)
            // $table->foreign('profile_prestasi_id')->references('prestasi_id')->on('prestasi')->onDelete('cascade')->onUpdate('cascade');
            // $table->foreign('profile_ekstrakulikuler_id')->references('ekstrakulikuler_id')->on('ekstrakulikuler')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile');
    }
};
