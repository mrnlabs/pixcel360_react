<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
protected $fillable = ['invoice_number', 'amount', 'issued_at', 'status'];

// Define the enum values
const STATUS_PAID = 'paid';
const STATUS_UNPAID = 'unpaid';

// Set the default value for the status attribute
protected $attributes = [
'status' => self::STATUS_UNPAID,
];

// Define a mutator to set the status attribute
public function setStatusAttribute($value)
{
$this->attributes['status'] = in_array($value, [self::STATUS_PAID, self::STATUS_UNPAID]) ? $value : self::STATUS_UNPAID;
}

// Define an accessor to get the human-readable status
public function getStatusAttribute($value)
{
return ucfirst($value);
}
}
