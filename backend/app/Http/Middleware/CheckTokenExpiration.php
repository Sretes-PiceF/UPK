<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class CheckTokenExpiration
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

        if ($token) {
            $accessToken = PersonalAccessToken::findToken($token);
            if ($accessToken && $accessToken->created_at->addHours(24)->isPast()) {
                $accessToken->delete();
                return response()->json(['message' => 'Token expired, silakan login kembali.'], 401);
            }
        }

        return $next($request);
    }
}
