<!-- resources/views/emails/payment/success.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Pixcel360 Subscription is Ready!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 20px 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            font-size: 12px;
            color: #777;
        }
        .details {
            margin: 20px 0;
            padding: 15px;
            background-color: #fff;
            border-radius: 5px;
            border-left: 4px solid #4CAF50;
        }
        .details p {
            margin: 5px 0;
        }
        .cta-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .support {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Your Pixcel360 Subscription is Ready! 🎉</h1>
        </div>
        <div class="content">
            <p>Hi {{ $user['firstname'] ?? '[Person\'s Name]' }} {{ $user['lastname'] ?? '[Person\'s Name]' }},</p>
            
            <p>Great news! Your Pixcel360 subscription is now active and ready to use. Here are the details of your subscription:</p>
            
            <div class="details">
                <p><strong>Subscription ID:</strong> {{ $subscription['id'] ?? '[Subscription ID]' }}</p>
                <p><strong>Start Date:</strong> {{ $subscription['started_at'] ?? '[Start Date]' }}</p>
                <p><strong>End Date:</strong> {{ $subscription['expires_at'] ?? '[End Date]' }}</p>
                <p><strong>Subscription Type:</strong> {{ $plan->name }}</p>
                <p><strong>Total Amount:</strong> USD {{ $plan->price ?? '[Total Amount]' }}</p>
            </div>
            
            <p>You can now log in to your Pixcel360 account to manage your subscription, view events, or update your settings at any time.</p>
            
            <center>
                <a href="https://www.pixcel360app.com" class="cta-button">Log In to Your Account</a>
            </center>
            
            <div class="support">
                <p>Need help? Our team is always here to support you. Reach out via email at <a href="mailto:support@pixcel360.com">support@pixcel360.com</a> or visit our help center on the website.</p>
                
                <p>We're excited to have you on board and look forward to seeing you enjoy your Pixcel360 experience!</p>
            </div>
        </div>
        <div class="footer">
            <p>Best regards,<br>
            The Pixcel360 Team ☀️</p>
            <p><a href="https://www.pixcel360.com">www.pixcel360.com</a></p>
            <p>&copy; {{ date('Y') }} Pixcel360. All rights reserved.</p>
        </div>
    </div>
</body>
</html>