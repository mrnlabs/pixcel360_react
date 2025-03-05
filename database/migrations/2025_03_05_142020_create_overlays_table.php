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
        Schema::create('overlays', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('path');
            $table->boolean('is_admin')->default(false);
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade'); // null for admin overlays
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('overlays');
    }
};
