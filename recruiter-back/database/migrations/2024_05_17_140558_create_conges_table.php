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
        Schema::create('congés', function (Blueprint $table) {
            $table->id();
            $table->integer('nom_personnel');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->string('type_congés');
            $table->string('statut_congés');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('congés');
    }
};
