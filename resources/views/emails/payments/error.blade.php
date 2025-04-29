<!-- resources/views/emails/payment/error.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Failed for Your Pixcel360 Subscription</title>
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
            padding: 10px 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
        }
        .footer {
            padding: 20px 0;
            font-size: 12px;
            color: #777;
        }
        .details {
            margin: 20px 0;
        }
        .details ul {
            list-style-type: disc;
            padding-left: 20px;
        }
        .details li {
            margin-bottom: 8px;
        }
        .link-info {
            margin: 15px 0;
        }
        .support {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Payment Failed for Your Pixcel360 Subscription ⚠️</h2>
        </div>
        <div class="content">
            <p>Hi {{ $user['name'] ?? '[Person\'s Name]' }},</p>
            
            <p>We encountered an issue while processing the payment for your Pixcel360 subscription. Unfortunately, the payment was unsuccessful.</p>
            
            <div class="details">
                <h3>Subscription Details:</h3>
                <ul>
                    <li><strong>Subscription Type:</strong> {{ $plan->interval ?? '[Subscription Type]' }}</li>
                    <li><strong>Amount Due:</strong> USD {{ $plan->interval == 'semi_annual' ? '6 months' : ucfirst($plan->interval) }}</li>
                    <li><strong>Billing Cycle:</strong> [Billing Cycle]</li>
                </ul>
            </div>
            
            <p>Please update your payment information to ensure your subscription remains active and uninterrupted. You can do so by logging into your Pixcel360 account and visiting the <strong>"Billing"</strong> section.</p>
            
            <div class="link-info">
                <p><a href="{{ 'https://www.pixcel360.com/billing' }}">Update your payment information</a></p>
            </div>
            
            <div class="support">
                <p>If you have any questions or need assistance, don't hesitate to contact us at <a href="mailto:support@pixcel360.com">support@pixcel360.com</a> or visit our help center.</p>
                
                <p>Thank you for your attention to this matter!</p>
            </div>
        </div>
        <div class="footer">
            <p>Best regards,<br>
            The Pixcel360 Team ☀️</p>
            <p><a href="https://www.pixcel360.com">www.pixcel360.com</a></p>
        </div>
    </div>
</body>
</html>