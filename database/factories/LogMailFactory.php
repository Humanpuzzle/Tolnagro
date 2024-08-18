<?php

namespace Database\Factories;

use App\Models\MailList;
use App\Models\mailPocket;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LogMail>
 */
class LogMailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'mailPocketId' => mailPocket::all()->random()->id,
            'mailListId' => MailList::all()->random()->id,            
        ];
    }
}
