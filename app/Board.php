<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;


class Board extends Model
{
  protected $fillable = ['title', 'color', 'owner_id'];
  public function lists(): HasMany
  {
    return $this->hasMany(CardList::class, 'board_id');    // board_id in CardList
  }

  public function owner(): BelongsTo  // owner is better than user
  {
    return $this->belongsTo(User::class, 'owner_id');  // owner_id in Board (local)
  }

  protected static function booted()
  {
    static::creating(function (Board $board){ // creating, not created !!
      if (Auth::user()) {
        $board->owner()->associate(Auth::user()); // associate current user as board owner; owner() method specifies a relationship
      }
    });
  }
}
