<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
        }
        a {
            color: #0066cc;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <p>Hi {{ $firstname }},</p>
        
        <p>Someone has requested a new password for your Pixcel360 account. Here are the details:</p>
        <p><strong>Username:</strong> {{ $username }}</p>
        
        <p>If you didn't make this request, feel free to ignore this email, and your account will remain secure.</p>
        <p>To reset your password, click here: <a href="{{ $url }}">Reset Password Link</a></p>
        
        <p>Thanks for choosing Pixcel360!</p>
        
        <div class="footer">
            <p>
                Best regards,<br>
                The Pixcel360 Team 🌟<br>
                <a href="mailto:support@pixcel360.com">support@pixcel360.com</a><br>
                <a href="https://www.pixcel360.com">www.pixcel360.com</a>
            </p>
        </div>
    </div>
</body>
</html>