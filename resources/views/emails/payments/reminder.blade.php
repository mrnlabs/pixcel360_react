
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Pixcel360 Subscription is Expiring Soon</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 15px;
        }
        .content {
            padding: 20px 0;
        }
        .subscription-details {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .btn {
            display: inline-block;
            background-color: #0066cc;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
            margin: 15px 0;
        }
        .footer {
            font-size: 12px;
            color: #666;
            text-align: center;
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #eee;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{ asset('images/logo.png') }}" alt="Pixcel360 Logo" class="logo">
        <h1>Subscription Reminder</h1>
    </div>

    <div class="content">
        <p>Hi {{ $user->firstname }} {{ $user->lastname }},</p>
        
        @if($daysUntilExpiration > 1)
            <p>We wanted to remind you that your Pixcel360 subscription is set to expire on <strong>{{ $expiryDate }}</strong>. To ensure uninterrupted access to all the amazing features, you can easily renew your subscription.</p>
        @else
            <p><strong>FINAL REMINDER:</strong> Your Pixcel360 subscription expires tomorrow on <strong>{{ $expiryDate }}</strong>. To avoid losing access to all features, please renew your subscription today.</p>
        @endif

        <div class="subscription-details">
            <h3>Subscription Details:</h3>
            <ul>
                <li><strong>Subscription Type:</strong> {{ $subscription->plan->name }}</li>
                <li><strong>Expiry Date:</strong> {{ $expiryDate }}</li>
                <li><strong>Total Amount Due:</strong> USD {{ number_format($subscription->price, 2) }}</li>
            </ul>
        </div>

        <p>You can renew your subscription now by clicking the button below or logging into your Pixcel360 account and selecting your preferred plan.</p>

        <div style="text-align: center;">
            <a href="{{ $renewalLink }}" class="btn">Renew Subscription</a>
        </div>

        <p>If you have any questions or need assistance, feel free to contact us at <a href="mailto:support@pixcel360.com">support@pixcel360.com</a> or visit our help center on the website.</p>

        <p>We'd love to continue being part of your event experiences!</p>

        <p>Best regards,<br>
        The Pixcel360 Team</p>
    </div>

    <div class="footer">
        <p>© {{ date('Y') }} Pixcel360. All rights reserved.</p>
        <p><a href="{{ url('/') }}">www.pixcel360.com</a></p>
    </div>
</body>
</html>