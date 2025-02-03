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
        Schema::create('sharing_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->string('thanks_message');
            $table->string('props');
            $table->string('sharing_method');
            $table->boolean('edit_active');
            $table->boolean('in_app_active');
            $table->boolean('gallery');
            $table->string('email_subject');
            $table->text('text_email');
            $table->text('text_message');
            $table->string('webgallery_email_subject');
            $table->text('webgallery_email_message');
            $table->text('social_share_description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sharing_settings');
    }
};
