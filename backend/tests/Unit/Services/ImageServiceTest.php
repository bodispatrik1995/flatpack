<?php

namespace Services;

use App\Models\Image;
use App\Models\Property;
use App\Models\User;
use App\Services\ImageService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ImageServiceTest extends TestCase
{
    use RefreshDatabase;

    protected ImageService $imageService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->imageService = new ImageService();
        Storage::fake('public'); // Fake storage for image uploads
    }

    /** @test */
    /** @test */
    /** @test */
    public function testUploadImagesSuccessfully()
    {
        // Prepare data
        $user = User::factory()->create(); // Create a test user
        $this->actingAs($user, 'sanctum'); // Authenticate the user

        $property = Property::factory()->create(); // Create a test property

        // Prepare the request data with fake images
        $images = [
            UploadedFile::fake()->image('test1.jpg'),
            UploadedFile::fake()->image('test2.jpg'),
        ];

        $requestData = [
            'name' => 'Sample Image',
            'property_id' => $property->id,
            'image_path' => $images, // Ensure this is an array of UploadedFile instances
        ];

        // Mock the request with the images
        $request = new \Illuminate\Http\Request();
        $request->replace($requestData);
        $request->files->set('image_path', $images); // Explicitly set the files in the request

        // Call the upload method
        $result = $this->imageService->upload($request);

        // Assertions
        $this->assertTrue($result); // Check if the upload method returned true
        $this->assertDatabaseCount('images', 2); // Ensure 2 images were saved

        // Check if the images are saved correctly in the database
        foreach ($images as $image) {
            $this->assertDatabaseHas('images', [
                'name' => 'Sample Image',
                'property_id' => $property->id,
                'image_path' => 'public/images/' . $image->hashName(), // Ensure it matches the stored path format
            ]);
        }
    }



    /** @test */
    public function testUploadImagesNoFiles()
    {
        // Prepare data with no images
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $property = Property::factory()->create();
        $requestData = [
            'name' => 'Sample Image',
            'property_id' => $property->id,
            'image_path' => [],
        ];

        // Mock the request
        $request = new \Illuminate\Http\Request($requestData);

        // Call the upload method
        $result = $this->imageService->upload($request);

        // Assertions
        $this->assertFalse($result);
        $this->assertDatabaseCount('images', 0); // No images should be saved
    }




    /** @test */
    public function testGetPicturesReturnsEmptyForNoImages()
    {
        // Create a property without images
        $property = Property::factory()->create();

        // Call the getPictures method
        $response = $this->imageService->getPictures($property->id);

        // Assertions
        $this->assertCount(0, json_decode($response->getContent(), true)); // Ensure no images returned
    }
}
