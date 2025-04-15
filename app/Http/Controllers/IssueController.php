<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Models\IssueCategory;
use Inertia\Ssr\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class IssueController extends Controller
{
  public function index()
  {
      $issues = Issue::with(['user', 'category'])
          ->orderBy('created_at', 'desc')
          ->paginate(10);
          
          return Inertia::render('Issues/Index', [
            'issues' => $issues,
          ]);
  }

  public function create()
  {
      $issue_categories = IssueCategory::all();
      return Inertia::render('Issues/Create', [
        'issue_categories' => $issue_categories,
      ]);
  }

  public function store(Request $request)
  {
    
      $request->validate([
          'title' => 'required|string|max:255',
          'description' => 'required|string',
          'category' => 'required|exists:issue_categories,id',
        //   'priority' => 'required|in:low,medium,high,critical',
          'screenshots.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
      ]);

      $screenshots = [];
      if ($request->hasFile('screenshots')) {
          foreach ($request->file('screenshots') as $file) {
              $filePath = Storage::put('screenshots', $file);
              $url = Storage::url($filePath);
              $screenshots[] = $url;
          }
      }

      $issue = Issue::create([
          'title' => $request->title,
          'description' => $request->description,
          'user_id' => auth()->id(),
          'category_id' => $request->category,
          'priority' => 'high',
          'status' => 'open',
          'browser' => $request->browser ?? 'Unknown',
          'os' => $request->osName ?? 'Unknown',
          'screenshots' => $screenshots,
      ]);

      return redirect('/issues')->with('success', 'Issue submitted successfully!');
  }

  public function show($slug)
  {
      $issue = Issue::with('category')->where('slug', $slug)->firstOrFail();
      
      if ($issue->user_id !== auth()->id()) {
          abort(403,'Unauthorized access to this issue.');
          return ;
      }
      $issue_categories = IssueCategory::all();
      return Inertia::render('Issues/Create', [
          'issue' => $issue,
            'issue_categories' => $issue_categories,
      ]);
  }

  public function updateStatus(Request $request, $issue)
  {
      $request->validate([
          'status' => 'required|in:open,in_progress,resolved,closed',
      ]);

      $issue->update(['status' => $request->status]);

      return back()->with('success', 'Issue status updated!');
  }
}
