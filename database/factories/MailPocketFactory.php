<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\mailPocket>
 */
class MailPocketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $subject = $this->faker->words(rand(2, 6), true);
        return [
            'subject' => ucfirst($subject),
            'content' => fake()->text()
        ];
    }
}
