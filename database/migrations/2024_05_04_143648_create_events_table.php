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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->longText('description')->nullable();
            $table->string('language')->default('English');
            $table->string('country')->default('South Africa');
            $table->enum('status', ['1', '0'])->default('1');
            $table->foreignId('overlay_id')->nullable()->constrained()->onDelete('set null');
            // $table->float('overlay_position_x')->default(0);
            // $table->float('overlay_position_y')->default(0);
            // $table->float('overlay_scale')->default(1.0);
            // $table->float('overlay_opacity')->default(1.0);
            // $table->boolean('is_overlay_active')->default(true);
            $table->string('slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
