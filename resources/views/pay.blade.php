
    <div class="container">
        <script src="https://www.payfast.co.za/onsite/engine.js"></script>
        <h2>Payment</h2>

                    {{ $uuid }}
                    {{ $return_url }}
                    {{ $cancel_url }}
                    {{ $notify_url }}
                    {{ $amount }}

                    <button onclick="initiatePayment()">Pay Now</button>
    </div>
    <script>
        // Attach the function to the window object
        window.initiatePayment = function () {
          window.payfast_do_onsite_payment({
            uuid: "{{ $uuid }}",
            return_url: "{{ $return_url }}",
            cancel_url: "{{ $cancel_url }}",
            notify_url: "{{ $notify_url }}",
            amount: "{{ $amount }}"
          }, function (result) {
            if (result === true) {
              alert('Payment successful');
            } else {
              alert('Payment failed');
            }
          });
        };
      </script>
