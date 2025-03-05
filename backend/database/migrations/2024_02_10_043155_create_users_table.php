<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('user_id', 16)->primary()->nullable(false);
            $table->string('user_nama', 32)->nullable(false);
            $table->string('user_email', 225)->nullable(false);
            $table->string('user_username', 225)->nullable(false);
            $table->string('user_password', 225)->nullable(false);
            $table->char('user_notelp', 16)->nullable( false);
            $table->enum('user_level', ['admin'])->default('admin')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};