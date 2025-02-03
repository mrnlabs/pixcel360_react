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
        Schema::create('video_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->string('motion_trigger')->nullable();
            $table->string('mirror_overlay')->nullable();
            $table->string('front_or_rear_camera')->nullable();
            $table->string('camera_exposure_menu_item')->nullable();
            $table->string('qr_app_protection')->nullable();
            $table->string('boomerang')->nullable();
            $table->string('animated_gif')->nullable();
            $table->string('videos')->nullable();
            $table->string('slomo')->nullable();
            $table->string('boomerang_repeats')->nullable();
            $table->string('boomerang_speed')->nullable();
            $table->string('boomerang_bounce')->nullable();
            $table->string('duration')->nullable();
            $table->string('gif_number_of_photos')->nullable();
            $table->string('gif_frame_duration')->nullable();
            $table->string('video_maximum_duration')->nullable();
            $table->string('slomo_recording_time')->nullable();
            $table->string('slomo_boomerang')->nullable();
            $table->string('speed')->nullable();
            $table->string('add_audio_file')->nullable();
            $table->string('screen_flash')->nullable();
            $table->string('time_outs')->nullable();
            $table->string('editing')->nullable();
            $table->string('sharing')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('video_settings');
    }
};
