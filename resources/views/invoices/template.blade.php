<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ $subscription->plan->name }}-{{ auth()->user()->first_name }}-{{ auth()->user()->last_name }} Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
        }

        .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }

        .invoice-number {
            color: #666;
        }

        .invoice-number span {
            color: #4666E5;
        }

        .action-buttons {
            text-align: right;
        }

        .btn {
            padding: 8px 16px;
            border-radius: 4px;
            border: none;
            color: white;
            margin-left: 10px;
            text-decoration: none;
            display: inline-block;
        }

        .btn-print {
            background-color: #E853A3;
        }

        .btn-pdf {
            background-color: #4666E5;
        }

        .billing-info {
            margin-bottom: 30px;
        }

        .company-name {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .address {
            margin-bottom: 5px;
            color: #666;
        }

        .email {
            color: #4666E5;
            margin-bottom: 5px;
        }

        .phone {
            color: #666;
        }

        .subscription-box {
            margin-bottom: 30px;
        }

        .subscription-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }

        .product-name {
            color: #666;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th {
            background-color: #f8f9fa;
            text-align: left;
            padding: 12px;
            border-bottom: 2px solid #dee2e6;
        }

        td {
            padding: 12px;
            border-bottom: 1px solid #dee2e6;
            font-size: 13px;
        }

        .status {
            color: #666;
        }

        .total-column {
            text-align: right;
        }

        .summary {
            width: 300px;
            margin-left: auto;
        }

        .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }

        .discount {
            color: #28B165;
        }

        .final-total {
            font-size: 18px;
            color: #28B165;
            font-weight: bold;
        }
        .summary-row {
            float: right;
        }
    </style>
</head>
<body>
    <!-- <div class="header">
        <div class="invoice-number">{{ $subscription->plan->name }} Invoice : <span>#{{ $subscription->id }}</span></div>
    </div> -->

    <div class="billing-info">
        <!-- <div>Billing From :</div> -->
        <!-- <div class="company-name">SPRUKO TECHNOLOGIES</div> -->
        <div class="address">{{ auth()->user()->address ? auth()->user()->address : '-' }}</div>
        <div class="address">
            {{ auth()->user()->city ? auth()->user()->city : '-' }},{{ auth()->user()->province ? auth()->user()->province : '-' }},
            {{ auth()->user()->country ? auth()->user()->country : '-' }}
            {{ auth()->user()->post_code ? auth()->user()->post_code : '-' }}
        </div>
        <div class="email">{{ auth()->user()->email ? auth()->user()->email : '-' }}</div>
        <div class="phone">{{ auth()->user()->phone ? auth()->user()->phone : '-' }}</div>
    </div>

    <div class="subscription-box">
        <div class="subscription-header">
            <div class="product-name">Product: {{ $subscription->plan->name }}</div>
            <div class="product-total">Total: ${{ $subscription->plan->price }}</div>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>ORDER</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th class="total-column">TOTAL</th>
            </tr>
        </thead>
        <tbody>
           
                @php
                $total = 0;
                @endphp
           @foreach ($otherSubscriptions as $otherSubscription)
                @php
                $total += $otherSubscription->plan->price;
                @endphp
            <tr>
                <td>{{ $otherSubscription->plan->name }} – {{ $otherSubscription->plan->interval }}</td>
                <td>{{ $otherSubscription->started_at->format('M d, Y') }}</td>
                <td class="status">To BE Determined</td>
                <td class="total-column">${{ $otherSubscription->plan->price }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="summary">
    <div class="summary-row">
            <div>Total: <span class="final-total"> ${{ $total }}</span></div>
            <!-- <div class="final-total">$3,846.53</div> -->
        </div>
    </div>
</body>
</html>