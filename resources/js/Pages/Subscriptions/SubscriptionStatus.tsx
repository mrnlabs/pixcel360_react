import { Link, usePage } from "@inertiajs/react";

export default function SubscriptionStatus() {
    const { auth } = usePage().props;
    // @ts-ignore
    const subscription = auth.user?.current_subscription;

    if (!subscription) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>Your subscription has expired. Please renew to continue accessing features.</p>
                <Link href={route('plans.index')} className="text-red-700 underline">
                    View Plans
                </Link>
            </div>
        );
    }

    const expiresAt = new Date(subscription.expires_at);
    const daysLeft = Math.ceil((expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p>Your subscription is active</p>
            <p>Days remaining: {daysLeft}</p>
        </div>
    );
}