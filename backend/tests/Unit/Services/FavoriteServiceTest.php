<?php

namespace Services;

use App\Models\Property;
use App\Models\User;
use App\Services\FavoriteService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FavoriteServiceTest extends TestCase
{
    use RefreshDatabase;

    protected FavoriteService $favoriteService;
    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->favoriteService = new FavoriteService();
        $this->user = User::factory()->create();
    }

    /** @test */
    public function testGetFavoritesReturnsUserFavorites()
    {
        // Arrange: create favorite properties for the user
        $properties = Property::factory()->count(2)->create();
        $this->user->favorites()->attach($properties->pluck('id'));

        // Act: retrieve favorites using the service
        $favorites = $this->favoriteService->getFavorites($this->user->id);

        // Assert: the favorites returned match the properties attached
        $this->assertCount(2, $favorites);
        $this->assertEquals($properties->pluck('id')->toArray(), $favorites->pluck('id')->toArray());
    }

    /** @test */
    public function testGetFavoritesReturnsNotFoundIfUserDoesNotExist()
    {
        // Act: attempt to get favorites for a non-existent user
        $response = $this->favoriteService->getFavorites(999);

        $this->assertEquals(404, $response->status());

    }

    /** @test */
    public function testAddToFavoritesAddsPropertyToFavorites()
    {
        // Arrange: create a property to be added as a favorite
        $property = Property::factory()->create();

        // Act: add the property to favorites
        $result = $this->favoriteService->addToFavorites($this->user->id, $property->id);

        // Assert: addition was successful and property is in favorites
        $this->assertTrue($result);
        $this->assertDatabaseHas('favorites', [
            'user_id' => $this->user->id,
            'property_id' => $property->id
        ]);
    }

    /** @test */
    public function testAddToFavoritesReturnsFalseIfPropertyAlreadyFavorite()
    {
        // Arrange: create a property and add it as a favorite
        $property = Property::factory()->create();
        $this->user->favorites()->attach($property->id);

        // Act: try to add the same property to favorites again
        $result = $this->favoriteService->addToFavorites($this->user->id, $property->id);

        // Assert: addition was unsuccessful and property was not duplicated
        $this->assertFalse($result);
        $this->assertDatabaseCount('favorites', 1); // Ensure only one entry exists
    }

    /** @test */
    public function testRemoveFromFavoritesRemovesPropertyFromFavorites()
    {
        // Arrange: create a property and add it to favorites
        $property = Property::factory()->create();
        $this->user->favorites()->attach($property->id);

        // Act: remove the property from favorites
        $result = $this->favoriteService->removeFromFavorites($this->user->id, $property->id);

        // Assert: removal was successful and property is no longer in favorites
        $this->assertTrue($result);
        $this->assertDatabaseMissing('favorites', [
            'user_id' => $this->user->id,
            'property_id' => $property->id
        ]);
    }

    /** @test */
    public function testRemoveFromFavoritesReturnsFalseIfPropertyNotInFavorites()
    {
        // Arrange: create a property without adding it to favorites
        $property = Property::factory()->create();

        // Act: attempt to remove a property not in favorites
        $result = $this->favoriteService->removeFromFavorites($this->user->id, $property->id);

        // Assert: removal attempt returns false, and database remains unaffected
        $this->assertFalse($result);
        $this->assertDatabaseMissing('favorites', [
            'user_id' => $this->user->id,
            'property_id' => $property->id
        ]);
    }
}
