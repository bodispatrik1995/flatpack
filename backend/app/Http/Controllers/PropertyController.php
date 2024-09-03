<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function getAllProperties()
    {
        try {
            $properties = Property::all();

            return response()->json($properties, 200);
        } catch (\Exception $e) {
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }
    public function searchProperty(Request $request)
    {
        try {
            $title = $request->input('title');
            $description = $request->input('description');
            $city = $request->input('city');
            $street = $request->input('street');
            $houseNumber = $request->input('house_number');
            $rooms = $request->input('rooms');
            $bathroomCount = $request->input('bathroom_count');
            $floor = $request->input('floor');
            $buildingMaterial = $request->input('building_material');
            $type = $request->input('type');
            $plotSize = $request->input('plot_size');
            $garage = $request->input('garage');
            $facing = $request->input('facing');
            $price = $request->input('price');

            $query = Property::query();

            if ($title) {
                $query->where('title', 'like', '%' . $title . '%');
            }
            if ($description) {
                $query->where('description', 'like', '%' . $description . '%');
            }
            if ($city) {
                $query->where('city', 'like', '%' . $city . '%');
            }
            if ($street) {
                $query->where('street', 'like', '%' . $street . '%');
            }
            if ($houseNumber) {
                $query->where('house_number', 'like', '%' . $houseNumber . '%');
            }
            if ($rooms) {
                $query->where('rooms', '<=', $rooms);
            }
            if ($bathroomCount) {
                $query->where('bathroom_count', '<=', $bathroomCount);
            }
            if ($floor) {
                $query->where('floor', '<=', $floor);
            }
            if ($buildingMaterial) {
                $query->where('building_material', 'like', '%' . $buildingMaterial . '%');
            }
            if ($type) {
                $query->where('type', 'like', '%' . $type . '%');
            }
            if ($plotSize) {
                $query->where('plot_size', '<=', $plotSize);
            }
            if ($garage !== null) { // Check for null explicitly
                $query->where('garage', $garage);
            }
            if ($facing) {
                $query->where('facing', 'like', '%' . $facing . '%');
            }
            if ($price) {
                $query->where('price', '<=', $price);
            }

            $properties = $query->get();

            return response()->json($properties, 200);

        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while searching properties.', 'message' => $e->getMessage()], 500);
        }
    }


    public function getPropertyTypes()
    {
        try {
            $propertyTypes = Property::select('type')->distinct()->get();
            $typesArray = array();
            foreach ($propertyTypes as $propertyType) {
                $typesArray[] = $propertyType->type;
            }
//            var_dump($typesArray);

            return response()->json($typesArray, 200);
        } catch (\Exception $e) {
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }
}
