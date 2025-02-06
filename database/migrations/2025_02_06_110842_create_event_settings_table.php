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
        Schema::create('event_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->integer('count_down')->default(1);
            $table->boolean('beep_sounds')->default(0);
            $table->boolean('face_props')->default(0);
            $table->boolean('mirror_overlay')->default(0);
            $table->boolean('front_rear_camera')->default(0);
            $table->boolean('camera_exposure')->default(0);
            $table->boolean('qr_app_protection')->default(0);
            $table->string('gallery_name')->nullable();
            $table->string('attract_screen')->nullable();
            $table->string('app_logo')->nullable();
            $table->string('app_background')->nullable();
            $table->string('webgallery_background')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_settings');
    }
};
