<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    public function index()
    {
        if (isInternalPortalUser()) {
            return response()->json([
                'notifications' => auth()->user()->unreadNotifications,
                'unreadCount' => auth()->user()->unreadNotifications->count(),
            ]);
        }
        
        return response()->json([
            'notifications' => auth()->user()->unreadNotifications,
            'unreadCount' => auth()->user()->unreadNotifications->count(),
        ]);
        
    }

    function viewAllNotifications() {
        if (isInternalPortalUser()) {
            $notifications = auth()->user()->unreadNotifications;
            $unreadCount = auth()->user()->unreadNotifications->count();
            return Inertia::render('Notifications/Index', [
                'initialNotifications' => $notifications,
                'unreadCount' => $unreadCount,
            ]);
        }
        $notifications =auth()->user()->store->notifications;
        $unreadCount = auth()->user()->store->unreadNotifications->count();
        return Inertia::render('Notifications/Index', [
            'notifications' => $notifications,
            'unreadCount' => $unreadCount,
        ]);
    }
    public function markAsRead($id)
    {
        $notification = auth()->user()->notifications()->findOrFail($id);
        $notification->markAsRead();
        
        return response()->json(['success' => true]);
    }

    public function markAllAsRead(Request $request)
    {
        $notifications = $request->notifications;

        if (empty($notifications)) {
            return back()->with('error', "No notifications selected.");
        }

        DB::table('notifications')->whereIn('id', $notifications)->update(['read_at' => now()]);
        return back()->with('success', "All selected notifications marked as read.");
    }
    

    function redirectToModel($id) {
        $notification = auth()->user()->notifications()->findOrFail($id);
        $notification->markAsRead();
        return redirect($notification->data['url']);
        
    }

    function deleteSelected(Request $request){
        $ids = $request->notifications;
        DB::table('notifications')->whereIn('id', $ids)->delete();
        return back()->with('success', "Selected notifications deleted successfully.");
    }
}
