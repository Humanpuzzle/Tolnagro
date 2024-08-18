<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logmail extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'mailPocketId',
        'mailListId',
    ];       

    public function mailPocket(){
        return $this->belongsToMany(mailPocket::class);
    }

    public function mailList(){
        return $this->belongsToMany(mailList::class);
    }
}
