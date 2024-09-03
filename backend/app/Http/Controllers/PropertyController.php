<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use PHPUnit\Util\Exception;

class PropertyController extends Controller
{
    public function getAllProperties(){
        try {

        $properties = Property::all();

        return response()->json($properties, 200);
        }catch (\Exception $e){
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    public function addProperty(Request $request)
    {

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'size' => 'required|numeric',
            'city' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'house_number' => 'required|string|max:10',
            'rooms' => 'required|integer|min:1',
            'bathroom_count' => 'required|integer|min:1',
            'floor' => 'nullable|integer',
            'building_material' => 'nullable|string|max:255',
            'type' => 'required|string|max:255',
            'plot_size' => 'nullable|numeric',
            'garage' => 'nullable|boolean',
            'facing' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0'
        ]);

        try {
            $id = \auth('sanctum')->user()->id;
            var_dump($id);

            $property = Property::create([
                'title' => $request->title,
                'user_id' => $id,
                'description' => $request->description,
                'size' => $request->size,
                'city' => $request->city,
                'street' => $request->street,
                'house_number' => $request->house_number,
                'rooms' => $request->rooms,
                'bathroom_count' => $request->bathroom_count,
                'floor' => $request->floor,
                'building_material' => $request->building_material,
                'type' => $request->type,
                'plot_size' => $request->plot_size,
                'garage' => $request->garage,
                'facing' => $request->facing,
                'price' => $request->price,
            ]);


            return response()->json([
                'status' => true,
                'message' => 'Property added successfully',
                'property' => $property
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function deleteProperty ($request)
{
    try{
        $id = $request->id;
        Property::where('id', $id)->delete();
        return response()->json(['message' => 'Property deleted successfully']);
    }catch(Exception $e){
        return response()->json(["error" => $e->getMessage()], 500);
    }

}

}
