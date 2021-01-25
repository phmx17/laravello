<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;

class Logout
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
      $guard = Auth::guard(config('sanctum.guard', 'web'));
      $user = $guard->user();
      $guard->logout(); // vscode will show error since it doesn't know what is going on in background

      return $user;
    }
}
