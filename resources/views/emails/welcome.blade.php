<x-mail::message>
# Welcome to {{ config('app.name') }}!

Hi {{ $user->firstname }},

Your account has been successfully created. Here are your login credentials:

Email: {{ $user->email }}
Password: {{ $password }}

<x-mail::button :url="route('login')">
Login to Your Account
</x-mail::button>

For security reasons, we recommend changing your password after your first login.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>