<!-- resources/views/emails/cart-abandonment.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cart Abandonment - Pixcel360</title>
</head>
<body>
    <p>Hi {{ $firstName }},</p>
    
    <p>It looks like you were just about to activate your Pixcel360 subscription — but didn't quite finish. No worries! We've saved everything in your cart so you can pick up right where you left off.</p>
    
    <p>Whether you're preparing for your next big booking or just getting set up, we're ready when you are.</p>
    
    <p><a href="{{ $resumeUrl }}" style="display: inline-block; padding: 10px 20px; background-color: #ff9339; color: white; text-decoration: none; border-radius: 5px;">Resume My Subscription</a></p>
    
    <p>If you need any help or have questions about the plans, feel free to reach out— we're here to support your events every step of the way.</p>
    <br>
    <p>Spin you soon,<br><strong>The Pixcel360 Team</strong></p>
</body>
</html>