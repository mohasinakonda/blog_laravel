<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(10)->create()->each(function ($user) {
            $book_count = random_int(5, 15);
            Blog::factory($book_count)->for($user)->create()->each(function ($blog) {
                $comment = random_int(5, 30);
                Comment::factory($comment)->for($blog)->create();
            });
        });

        // Book::factory(33)->create()->each(function ($book) {
        //     $bookCount = random_int(5, 30);
        //     Review::factory()->count($bookCount)->good()->for($book)->create();
        // });

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
