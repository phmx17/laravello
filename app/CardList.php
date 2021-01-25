<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CardList extends Model
{
  protected $fillable = ['title', 'board_id'];
  public function cards(): HasMany
  {
    return $this->hasMany(Card::class, 'list_id');  // is the external column
  }

  public function board(): BelongsTo
  {
    return $this->belongsTo(Board::class, 'board_id'); // board_id is a local column
  }
}
