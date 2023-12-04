<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'comment' => fake()->sentences(random_int(2, 5), true),
            'rating' => fake()->numberBetween(1, 5),
            'user_id' => User::factory(),
            'blog_id' => null
        ];
    }
    public function good()
    {
        return $this->state(
            function (array $attributes) {
                return [
                    'rating' => fake()->numberBetween(4, 5)
                ];
            }
        );
    }
    public function average()
    {
        return $this->state(function (array $attributes) {
            return [
                'rating' => fake()->numberBetween(2, 3)
            ];
        });
    }
    public function bad()
    {
        return $this->state(function (array $attributes) {
            return [
                'rating' => fake()->numberBetween(1, 2)
            ];
        });
    }
}
