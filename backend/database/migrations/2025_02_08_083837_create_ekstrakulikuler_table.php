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
        Schema::create('ekstrakulikuler', function (Blueprint $table) {
            $table->string('ekstrakulikuler_id', 16)->primary()->nullable(false);
            $table->string('ekstrakulikuler_judul', 255)->nullable(false);
            $table->string('ekstrakulikuler_deskripsi', 5000)->nullable(false);
            $table->string('ekstrakulikuler_url_gambar')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ekstrakulikuler');
    }
};
