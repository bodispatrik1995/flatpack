<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'name' => 'required',
            'property_id' => 'required|exists:properties,id',
        ]);
        try{
          Image::create([
              'image_path' => $request->file('image_path')->store('public/images'),
              'name' => $request->name,
              'property_id'=> $request->property_id
          ]);
            return response()->json([
                'success' => true,
                'message' => 'Image Uploaded',
                'image'=> $request->file('image_path'),

            ],200);
        }catch (\Exception $e){
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
