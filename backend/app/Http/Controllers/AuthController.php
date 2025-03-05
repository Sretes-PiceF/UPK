<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use function Pest\Laravel\withCookies;

class AuthController extends Controller
{

    public function login(Request $request) {
        $request->validate([
            'user_username' => 'required|string', 
            'user_password' => 'required|string',
        ]);


        $user = User::where("user_username", $request->user_username)->first();
        if(!$user){
            return response([
                "message" => "Username atau password salah"
            ], 401);
        }

        $password_benar = Hash::check($request->user_password, $user->user_password);
        if(!$password_benar){
            return response([
                "message" => "Username atau password salah"
            ], 401);
        }

        $token = $user->createToken('token')->plainTextToken;

        $cookie = cookie('jwt', $token);

        return response()->json([
            'message' => $token,
        ])->withCookie($cookie);
    }

    public function user(Request $request)
    {
        return Auth::user();
    }

    public function logout(Request $request) {

        $user = $request->user(); // Ambil user yang sedang login

        if ($user) {
            $user->tokens()->delete(); // Hapus semua token yang dimiliki user
        }
    
        $cookie = Cookie::forget('jwt');

        return response()->json([
            "msg" => "succes",
        ])->withCookie($cookie);
    }
}