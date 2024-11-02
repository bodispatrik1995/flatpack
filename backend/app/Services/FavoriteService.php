<?php

namespace App\Services;

use App\Models\User;

class FavoriteService
{
    public function getFavorites($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return $user->favorites;
    }

    public function addToFavorites($userId, $propertyId): bool
    {
        $user = User::find($userId);
        if ($user->favorites()->where('property_id', $propertyId)->exists()) {
            return false;
        } else {
            $user->favorites()->attach($propertyId);
            return true;
        }
    }

    public function removeFromFavorites($userId, $propertyId): bool
    {
        $user = User::find($userId);
        if (!$user->favorites()->where('property_id', $propertyId)->exists()) {
            return false;
        } else {
            $user->favorites()->detach($propertyId);
            return true;
        }
    }

}
