<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Issue;
use Inertia\Ssr\Response;
use Illuminate\Http\Request;
use App\Models\IssueCategory;
use App\Jobs\SendTicketIDMail;
use App\Jobs\SendTicketIDEmailJob;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Notifications\NewTicketCreated;
use Illuminate\Support\Facades\Storage;

class IssueController extends Controller
{
    public function index(Request $request)
    {
        $query = Issue::with(['user', 'category'])
            ->orderBy('created_at', 'desc');
    
        // If not admin, only show user's own issues
        if (!isInternalPortalUser()) {
            $query->where('user_id', auth()->id());
        }
    
        // Search by issue ID or user name
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                  ->orWhereHas('user', function($userQuery) use ($search) {
                      $userQuery->where('firstname', 'like', "%{$search}%")
                               ->orWhere('lastname', 'like', "%{$search}%");
                  });
            });
        }
    
        // Filter by priority
        if ($request->has('priority')) {
            $query->where('priority', $request->input('priority'));
        }
    
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }
    
        $issues = $query->paginate(10);
        $view = isInternalPortalUser() ? 'Support/Index' : 'Issues/Index';
      
        return Inertia::render($view, [
            'issues' => $issues,
            'filters' => $request->only(['search', 'priority', 'status'])
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

      $createdIssue = Issue::create([
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
      $issue = Issue::with('category', 'user')->where('id', $createdIssue->id)->firstOrFail();
        // Mail::to(auth()->user()->email, auth()->user()->firstname)
        // ->queue(new SendTicketIDMail($issue));
        SendTicketIDEmailJob::dispatch(
            $issue,
            auth()->user()->email,
            auth()->user()->firstname
        );

        $admins = User::getSystemAdmins();
        
        foreach($admins as $admin) {
            $admin->notify(new NewTicketCreated($issue));
        }
       
      return redirect('/issues');
  }

  public function show($slug)
  {
      $issue = Issue::with('category', 'user')->where('slug', $slug)->firstOrFail();
      $issue_priorities = ['low', 'medium', 'high', 'critical'];
      $issue_statuses = ['open', 'in_progress', 'resolved', 'closed'];
      if(isInternalPortalUser()){
          return Inertia::render('Support/Show', [
              'issue' => $issue,
              'issue_priorities' => $issue_priorities,
              'issue_statuses' => $issue_statuses,
          ]);      
      }
      
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

  public function update(Request $request)
  {
      $issue = Issue::whereSlug($request->slug);
      $request->validate([
          'status' => 'required|in:open,in_progress,resolved,closed',
          'priority' => 'required|in:low,medium,high,critical'
      ]);

      $issue->update([
        'status' => $request->status,
        'priority' => $request->priority
        ]);

      return back()->with('success', 'Ticket status updated!');
  }

  function destroy($slug) {
      $issue = Issue::where('slug', $slug)->first();
      $issue->delete();
      return back()->with('success', 'Ticket deleted successfully');
  }
}
