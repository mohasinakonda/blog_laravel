<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __invoke(Request $request)
    {
        // dd($request->query);
        $data = Blog::where('title', 'LIKE', '%' . $request['query'] . '%')
            ->orWhere('excerpt', 'LIKE', '%' . $request['query'] . '%')
            ->get();
        return $data;
    }
}
