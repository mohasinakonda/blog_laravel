<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        $data = $user->blogs()->with('user')->withCount('comment')->withAvg('comment', 'rating')->paginate(10);

        return inertia::render('Blog', [
            'blogs' => $data,
            'user' => $user,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user, Blog $blog)
    {
        $blog = Blog::where('id', $blog->id)->withCount('comment')->withAvg('comment', 'rating')->first();
        $comments = $blog->comment()->with('user')->paginate(10);

        return Inertia('Content', [
            'auth' => $user,
            'blog' => $blog,
            'comments' => $comments
        ]);
        ;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
