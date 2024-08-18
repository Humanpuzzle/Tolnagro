<?php

// use App\Http\Controllers\ProfileController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;
use App\Http\Controllers\Api\MailController;

Route::get('/', function () {
    return Inertia::render('Index');
});

Route::post('/emails', [FormController::class, 'store'])->name('emails.store');

Route::get('/data', [MailController::class, 'index']);
Route::delete('/data/{id}', [MailController::class, 'destroy']);

require __DIR__.'/auth.php';
