<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'excerpt', 'description', 'author'];
    public function comment()
    {
        $this->hasMany('comment');
    }
    public function user()
    {
        $this->hasMany('user');
    }
}
