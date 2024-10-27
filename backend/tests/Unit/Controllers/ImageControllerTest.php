<?php

namespace Controllers;

use App\Http\Controllers\ImageController;
use App\Models\Image;
use App\Models\Property;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ImageControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public'); // Fakes storage for testing image upload
    }

    /** @test */
    public function testStoreImageSuccessfully()
    {
        $property = Property::factory()->create();

        // Create a fake image upload request
        $requestData = [
            'name' => 'Sample Image',
            'property_id' => $property->id,
            'image_path' => [UploadedFile::fake()->image('test.jpg')],
        ];

        $response = $this->postJson('/api/upload_image/' . $property->id . '/images', $requestData);

        // Assertions
        $response->assertStatus(200);
        $response->assertJson(['success' => true, 'message' => 'Image Uploaded']);

        // Check that the image was stored
        Storage::disk('public')->assertExists('images/' . $requestData['image_path'][0]->hashName());
        $this->assertDatabaseHas('images', ['property_id' => $property->id, 'name' => 'Sample Image']);
    }

    /** @test */
    public function testGetFirstPicturesSuccess()
    {
        $property = Property::factory()->create();
        $image = Image::factory()->create([
            'property_id' => $property->id,
            'image_path' => 'public/images/test_image.jpg',
        ]);

        // Corrected route path to match the defined API route
        $response = $this->getJson('/api/image/' . $property->id);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'image' => 'storage/images/test_image.jpg',  // Expected response transformation
        ]);
    }


    /** @test */
    public function testGetFirstPicturesNotFound()
    {
        $property = Property::factory()->create();

        $response = $this->getJson('/api/property/' . $property->id . '/first-image');

        $response->assertStatus(404);
        $response->assertJson([
            'success' => false,
            'message' => 'No image found for the given property ID.',
        ]);
    }

    /** @test */
    public function testGetImagesSuccess()
    {
        $property = Property::factory()->create();
        $images = Image::factory()->count(2)->create(['property_id' => $property->id]);

        $response = $this->getJson('/api/property/' . $property->id . '/images');

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);
        $this->assertCount(2, $response->json()['images']);
    }

    /** @test */
    public function testGetImagesNotFound()
    {
        $property = Property::factory()->create();

        $response = $this->getJson('/api/property/' . $property->id . '/images');

        $response->assertStatus(404);
        $response->assertJson([
            'success' => false,
            'message' => 'No image found for the given property ID.',
        ]);
    }
}
