<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\FavoriteService;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    private FavoriteService $favoriteService;

    public function __construct(FavoriteService $favoriteService)
    {
        $this->favoriteService = $favoriteService;
    }

    public function getUserFavorites(Request $request)
    {
        $userId = \auth('sanctum')->id();

        $favorites = $this->favoriteService->getFavorites($userId);

        return response()->json($favorites);
    }

    public function addFavorite(Request $request)
    {
        $id = \auth('sanctum')->id();
        $request->validate([
            'property_id' => 'required|exists:properties,id',
        ]);

        return $this->favoriteService->addToFavorites($id, $request->property_id) ?
            response()->json(['message' => 'Property added to favorites'], 201) :
            response()->json(['message' => 'Property is already in favorites'], 409);
    }

    public function removeFavorite(Request $request)
    {
        $id = \auth('sanctum')->id();
        $request->validate([
            'property_id' => 'required|exists:properties,id',
        ]);

        return $this->favoriteService->removeFromFavorites($id, $request->property_id) ?
            response()->json(['message' => 'Property removed from favorites'], 200) :
            response()->json(['message' => 'Property not found in favorites'], 404);
    }

    public function checkIsItIn(Request $request)
    {
        $id = \auth('sanctum')->id();
        $request->validate([
            'property_id' => 'required|exists:properties,id',
        ]);
        $user = User::find($id);
        if ($user->favorites()->where('property_id', $request->property_id)->exists()) {
            return response()->json(['status' => true], 200);
        } else {
            return response()->json(['status' => false], 200);
        }

    }

}
