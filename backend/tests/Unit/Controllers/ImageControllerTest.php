<?php

namespace Controllers;

use App\Http\Controllers\ImageController;
use App\Models\Image;
use App\Models\Property;
use App\Models\User;
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
        $user = User::factory()->create(); // Create a test user
        $this->actingAs($user, 'sanctum'); // Authenticate the user

        $property = Property::factory()->create(); // Create a test property

        $requestData = [
            'name' => 'Sample Image',
            'property_id' => $property->id,
            'image_path' => [
                UploadedFile::fake()->image('test1.jpg'),
                UploadedFile::fake()->image('test2.jpg'),
            ],
        ];


        $response = $this->postJson('/api/upload_image', $requestData);

        // Assertions
        $response->assertStatus(200); // Check for successful response
        $response->assertJson([ // Check JSON response structure
            'success' => true,
            'message' => 'Image Uploaded',
        ]);


        $uploadedImages = $response->json('images');


        foreach ($uploadedImages as $image) {
            $this->assertDatabaseHas('images', [
                'property_id' => $property->id,
                'name' => 'Sample Image',
                'image_path' => "public/images/$image", // Match the stored path format
            ]);
        }
    }

    /** @test */
    public function testGetFirstPicturesSuccess()
    {
        $property = Property::factory()->create();
        $image = Image::factory()->create([
            'property_id' => $property->id,
            'image_path' => 'public/images/test_image.jpg',
        ]);


        $response = $this->getJson('/api/image/' . $property->id);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'image' => 'storage/images/test_image.jpg', // Adjust if necessary
        ]);
    }

    /** @test */
    public function testGetFirstPicturesNotFound()
    {
        $property = Property::factory()->create();

        $response = $this->getJson('/api/image/' . $property->id);

        $response->assertStatus(404);
        $response->assertJson([
            'success' => false,
            'message' => 'No image found for the given property ID.',
        ]);
    }


    /** @test */



    /** @test */


    /** @test */
    public function testStoreImageValidationFails()
    {
        $user = User::factory()->create(); // Create a test user
        $this->actingAs($user, 'sanctum'); // Authenticate the user

        $property = Property::factory()->create(); // Create a test property

        // Attempt to upload images without a name
        $requestData = [
            'property_id' => $property->id,
            'image_path' => [
                UploadedFile::fake()->image('test4.jpg'),
            ],
        ];

        // Send a POST request to upload the images
        $response = $this->postJson('/api/upload_image', $requestData);

        // Assertions
        $response->assertStatus(422); // Check for validation failure
        $response->assertJsonValidationErrors(['name']);
    }

    /** @test */
    public function testStoreImageInvalidFileType()
    {
        $user = User::factory()->create(); // Create a test user
        $this->actingAs($user, 'sanctum'); // Authenticate the user

        $property = Property::factory()->create(); // Create a test property

        // Attempt to upload a non-image file
        $requestData = [
            'name' => 'Invalid Image',
            'property_id' => $property->id,
            'image_path' => [
                UploadedFile::fake()->create('test.pdf', 100), // Fake a PDF instead of an image
            ],
        ];

        // Send a POST request to upload the images
        $response = $this->postJson('/api/upload_image', $requestData);

        // Assertions
        $response->assertStatus(422); // Check for validation failure
        $response->assertJsonValidationErrors(['image_path.0']); // Check for validation on the first image
    }
}
