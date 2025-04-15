<x-mail::message>
# Welcome to {{ config('app.name') }}!

Hi {{ $user->firstname }} {{ $user->lastname }},
<p>Welcome to Pixcel360! Your account has been created, and you’ll receive a separate email with your username and a link to set your password. 
    You can manage your account and subscriptions at any time on your account page.</p>
<p>Your account has been successfully created. Here are your login credentials:</p>

<p>If you need assistance, we’re here for you:</p>
<p>
    <ul>
        <li><b>24/7 Live Chat Support</b> on Pixcel360.com</li><br>
        <li><b>Email Support</b>: <a href="mailto:support@pixcel360.com">support@pixcel360. (response within 1 business day)</a></li><br>
    </ul>

</p>
<p>You can also explore our website on <a href="https://www.pixcel360.com">www.pixcel360.com</a></p>
<p>Want to connect with other Pixcel360 users? Join our community on Facebook: <a href="https://www.facebook.com/groups/pixcel360">Pixcel360 User Group.</a></p>
<p>We’re excited to see what you’ll create with Pixcel360!</p>
{{-- Email: {{ $user->email }}<br>
Password: {{ $password }} --}}

{{-- <x-mail::button :url="route('login')">
Login to Your Account
</x-mail::button> --}}

{{-- For security reasons, we recommend changing your password after your first login. --}}

Best regards,<br>
<a href="mailto:support@pixcel360.com">support@pixcel360.com</a><br>
<a href="https://www.pixcel360.com">www.pixcel360.com</a>
</x-mail::message>