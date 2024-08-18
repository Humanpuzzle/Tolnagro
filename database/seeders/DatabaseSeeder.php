<?php

namespace Database\Seeders;

use App\Models\Logmail;
use App\Models\mailList;
use App\Models\mailPocket;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        mailPocket::factory(7)->create();
        mailList::factory(50)->create();
        // Logmail::factory(15)->create();
    }
}
