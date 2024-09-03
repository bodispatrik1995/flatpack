<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    function userLogin(Request $request){

        try{
            $validator = Validator::make($request->all(), []);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validator->errors()
                ], 401);
            }

            //If SQL isn't running, it will say the password is incorrect

            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'Email or password isn\'t correct!'
                    ],
                    401
                );
            }

            $user = User::where('email', $request -> email) -> first();

            return response()->json(
                [
                    'status' => true,
                    'message' => 'Login successful!',
                    'token' => $user->createToken('API TOKEN', ['server-update'])->plainTextToken,
                ], 200
            );
        }
        catch (\Throwable $th) {
            return response()->json(
                [
                    'status' => false,
                    'message' => $th->getMessage()
                ], 500
            );
        }
    }
    function registerUser(Request $request){
        $email = $request->input('email');
        $name = $request->input('name');
        $password = $request->input('password');

        $newUserId = User::create(['name' => $name, 'email' => $email, 'password' => $password]);

        return $newUserId;
    }
}
