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
            $table->string('profile_id', 16)->primary()->nullable(false);
            $table->char('profile_guru', 225)->nullable(false);
            $table->char('profile_siswa', 225)->nullable(false);
            $table->char('profile_prestasi_id', 225)->nullable(false);
            $table->char('profile_ekstrakulikuler_id', 225)->nullable(false);

            //Membuat Foreign Key(penyambungan colom antar table)
            $table->foreign('profile_prestasi_id')->references('prestasi_id')->on('prestasi')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('profile_ekstrakulikuler_id')->references('ekstrakulikuler_id')->on('ekstrakulikuler')->onDelete('cascade')->onUpdate('cascade');
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
