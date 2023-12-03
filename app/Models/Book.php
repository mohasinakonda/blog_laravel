<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'excerpt', 'description', 'author'];
    public function reviews()
    {
        $this->hasMany('review');
    }
    public function user()
    {
        $this->hasMany('user');
    }
}
