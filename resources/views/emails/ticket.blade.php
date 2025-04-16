<x-mail::message>

Hi {{ $fullname }},
<p>Thank you for reaching out to Pixcel360 support! We’ve received your request and one of our team members will be in touch with you shortly to assist. 
  </p>


<p><b>Your Support Request Details:</b>:</p>
<p>
    <ul>
        <li><b>Request ID:</b> {{ $ticketID }}</li><br>
        <li><b>Submitted On:</b> {{ $submittedDate }} {{ $time }}</li><br>
        <li><b>Issue Type::</b> {{ $category }}</li><br>
    </ul>

</p>
<p>Our goal is to provide you with the best possible service, and we aim to respond as quickly as possible. You can expect a reply within 24 hours.</p>
<p>In the meantime, feel free to browse our <a href="https://pixcel360.com">Help Center</a> or check out our <a href="https://pixcel360.com">Knowledge Base</a> for solutions to common issues: </p>
<p>If your issue is urgent, please don’t hesitate to follow up with us.</p>
<br>
<p>Thanks for choosing Pixcel360!</p><br>

Best regards,<br>
The Pixcel360 Support Team 🌟<br>
<a href="https://www.pixcel360.com">www.pixcel360.com</a>
</x-mail::message>