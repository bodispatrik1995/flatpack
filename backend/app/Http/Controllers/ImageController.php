<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image_path.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
           'name' => 'required',
            'property_id' => 'required|exists:properties,id',
        ]);
        if($request->hasFile('image_path')){
            foreach($request->file('image_path') as $image){
                Image::create([
                    'image_path' => $image->store('public/images'),
                    'name' => $request->name,
                    'property_id'=> $request->property_id
                ]);
            }
        }

            return response()->json([
                'success' => true,
                'message' => 'Image Uploaded',
                'image'=> $request->file('image_path'),

            ],200);


    }
    public function getFirstPictures($property_id)
    {
        $image = Image::where('property_id', $property_id)->first();

        if (!$image) {
            return response()->json([
                'success' => false,
                'message' => 'No image found for the given property ID.'
            ], 404);
        }

        // Return the path in a format accessible by the frontend
        $image->image_path = str_replace('public/', 'storage/', $image->image_path);

        return response()->json([
            'success' => true,
            'image' => $image->image_path,
        ], 200);
    }

}
