<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        $loggedInUser = Auth::user();
        $data = Blog::with('user')->withCount('comment')->withAvg('comment', 'rating')->paginate(10);

        $userBookmark = $loggedInUser ? $loggedInUser->bookmark()->pluck('blog_id') : [];
        return inertia::render('Blog', [
            'blogs' => $data,
            'user' => $user,
            'bookmark' => $userBookmark
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
    public function show(Blog $blog)
    {
        $blog = Blog::where('id', $blog->id)->with('user')->withCount('comment')->withAvg('comment', 'rating')->first();
        $comments = $blog->comment()->with('user')->paginate(10);

        return Inertia('Content', [
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
