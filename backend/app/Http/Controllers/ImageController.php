<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Services\ImageService;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    protected ImageService $imageService;

    public function __construct(){
        $this->imageService = new ImageService();
    }
    public function store(Request $request)
    {
        $request->validate([
            'image_path.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
           'name' => 'required',
            'property_id' => 'required|exists:properties,id',
        ]);
            $success = $this->imageService->upload($request);

            if($success){
                return response()->json([
                    'success' => true,
                    'message' => 'Image Uploaded',
                    'image'=> $request->file('image_path'),
                ],200);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Image not Uploaded',

                ],500);
            }
    }
    public function getFirstPictures($property_id)
    {
       $image = $this->imageService->getIndexPictures($property_id);

        if (!$image) {
            return response()->json([
                'success' => false,
                'message' => 'No image found for the given property ID.'
            ], 404);
        }

        $image->image_path = str_replace('public/', 'storage/', $image->image_path);

        return response()->json([
            'success' => true,
            'image' => $image->image_path,
        ], 200);
    }



}
