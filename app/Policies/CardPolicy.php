<?php

namespace App\Policies;

use App\User;
use App\card;
use Illuminate\Auth\Access\HandlesAuthorization;

class CardPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\card  $card
     * @return mixed
     */
    public function view(User $user, card $card)
    {
        //
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\card  $card
     * @return mixed
     */
    public function update(User $user, card $card)
    {
      return $user->id === $card->owner_id; // return true if same
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\card  $card
     * @return mixed
     */
    public function delete(User $user, card $card)
    {
      return $user->id === $card->owner_id;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\card  $card
     * @return mixed
     */
    public function restore(User $user, card $card)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\card  $card
     * @return mixed
     */
    public function forceDelete(User $user, card $card)
    {
        //
    }
}
