<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

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
}
