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
        Schema::create('sharing_methods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->boolean('email')->default(0);
            $table->boolean('sms')->default(0);
            $table->boolean('download')->default(0);
            $table->boolean('airdrop')->default(0);
            $table->boolean('qr')->default(0);
            $table->boolean('general')->default(0);
            $table->boolean('whatsapp')->default(0);
            $table->boolean('inappgallery')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sharing_methods');
    }
};
