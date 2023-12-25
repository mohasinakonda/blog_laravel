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
    public function index(User $user, Request $request)
    {
        $bookmarkQuery = $request['query'];
        $loggedInUser = Auth::user();


        $userBookmark = $loggedInUser ? $loggedInUser->bookmark()->get() : [];
        $userBookmarkedId = $loggedInUser ? $loggedInUser->bookmark()->pluck('blog_id') : [];

        if ($bookmarkQuery === 'bookmarked') {

            $data = Blog::whereIn('id', $userBookmarkedId)->with('user')->withCount('comment')->withAvg('comment', 'rating')->paginate(10);
            return response([
                'blogs' => $data,
                'user' => $user,
                'bookmark' => $userBookmark
            ]);

        } else {
            $data = Blog::with('user')->withCount('comment')->withAvg('comment', 'rating')->paginate(10);
            return inertia::render('Blog', [
                'blogs' => $data,
                'user' => $user,
                'bookmark' => $userBookmark
            ]);
        }



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
        $user = Auth::user();
        $blog = Blog::find($id);
        if ($user->id === $blog->user_id) {
            $blog->delete();
            return response([
                'status' => true,
                'message' => 'blog post has been deleted!'
            ]);
        } else {
            return response([
                'status' => false,

            ]);
        }
    }
}



