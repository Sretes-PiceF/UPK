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
        Schema::create('ppdb', function (Blueprint $table) {
            $table->string('ppdb_id', 16)->primary()->nullable(false);
            $table->string('ppdb_deskripsi1', 255)->nullable(false);            
            $table->string('ppdb_deskripsi2', 255)->nullable(false);            
            $table->string('ppdb_notelp_1', 15)->nullable(false);            
            $table->string('ppdb_notelp_2', 15)->nullable(false);            
            $table->string('ppdb_namaguru_1', 255)->nullable(false);         
            $table->string('ppdb_namaguru_2', 255)->nullable(false);         
            $table->string('ppdb_url_gambar')->nullable();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ppdb');
    }
};
