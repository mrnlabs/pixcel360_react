<!-- resources/views/emails/gallery-share.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gallery Video Link Shared With You</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #eee;
        }
        
        .logo {
            max-width: 150px;
            height: auto;
        }
        
        .content {
            padding: 30px 20px;
        }
        
        .button {
            display: inline-block;
            padding: 12px 24px;
            margin: 20px 0;
            background: linear-gradient(243deg, #FF4F84 0%, #394DFF 100%);
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 600;
            text-align: center;
        }
        
        .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 12px;
            color: #999;
            border-top: 1px solid #eee;
        }
    </style>
</head>
<body>
    <div class="container">
         <div class="header">
            @if(isset($logo))
                <img src="{{ $logo }}" alt="Logo" class="logo">
            @endif
        </div> 
        
        <div class="content">
            
            <p>Hello,</p>
            
            <p>Thank you for visiting the event. Click the link to view the event video:</p>
            
            <div style="text-align: center;">
                <a href="{{ $galleryLink }}" class="button" style="color: #ffff">View Video</a>
            </div>
            
            <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
            
            <p style="word-break: break-all; background-color: #f5f5f5; padding: 10px; border-radius: 4px;">{{ $galleryLink }}</p>
            
            <p>This link will give you access to view the video from the event.</p>
            
            <p>Thank you!</p>
        </div>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} Pixcel360. All rights reserved.</p>
            <p>This email was sent because someone shared a video link with this email address.</p>
        </div>
    </div>
</body>
</html>