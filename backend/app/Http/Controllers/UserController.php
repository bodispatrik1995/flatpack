<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    function userLogin(Request $request)
    {

        //TODO make rules for login
        /*
                try {
                    $validateUser = Validator::make($request->all(), []);
                    if ($validateUser->fails()) {
                        return response()->json([
                            'status' => false,
                            'message' => 'validation error',
                            'errors' => $validateUser->errors()
                        ], 401);
                    }

                    if(!Auth::attempt($request->only('email','password'))){
                        return response()->json([
                            'status' => false,
                            'message' => 'Email or password is not correct.'
                        ],401);
                    }

                    $user = User::where('email', $request -> email) -> first();
                    return response()->json([
                        'status' => true,
                        'message' => 'Login successfully',
                        'token' => $user->createToken('API TOKEN', ['server-update'])->plainTextToken
                    ],200);
                }catch (\Throwable $th) {
                    return response()->json([
                        'status' => false,
                        'message' => $th->getMessage()
                    ], 500);
                }

        */

        try {
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

            $user = User::where('email', $request->email)->first();

            return response()->json(
                [
                    'status' => true,
                    'message' => 'Login successful!',
                    'token' => $user->createToken('API TOKEN', ['server-update'])->plainTextToken,
                    'username' => $user->name
                ], 200
            );
        } catch (\Throwable $th) {
            return response()->json(
                [
                    'status' => false,
                    'message' => $th->getMessage()
                ], 500
            );
        }


    }

    public function registerUser(Request $request)
    {
        $email = $request->input('email');
        $name = $request->input('username');
        $password = $request->input('password');

        $newUser = User::create(['name' => $name, 'email' => $email, 'password' => $password]);

        //TODO not allow user to register on existing email address

        return response()->json([
            'status' => true,
            'message' => 'Registration successful!',
            ],201);
    }
}
