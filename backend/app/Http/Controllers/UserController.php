<?php

namespace App\Http\Controllers;

use App\Models\user;
use App\Http\Requests\StoreuserRequest;
use App\Http\Requests\UpdateuserRequest;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = user::all();
        return response()->json([
            "msg" => "Data sukses",
            "data" => $data
        ]);
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "user_nama" => "required|max:255",
            "user_email" => "required|max:255|unique:users,user_email", // Tambahkan validasi unique untuk email
            "user_username" => "required|max:255|unique:users,user_username", // Tambahkan validasi unique untuk username
            "user_password" => "required|max:255",
            "user_notelp" => "required|max:16"
        ]);
    
        // Generate unique user_id
        $user_id = uniqid();
    
        // Hash password sebelum disimpan ke database
        $hashedPassword = bcrypt($request->user_password);
    
        // Buat user dengan level default 'admin'
        $data = user::create([
            'user_id' => $user_id,
            'user_nama' => $request->user_nama,
            'user_email' => $request->user_email,
            'user_username' => $request->user_username,
            'user_password' => $hashedPassword,
            'user_notelp' => $request->user_notelp,
            'user_level' => 'admin' // Set level default sebagai 'admin'
        ]);
    
        return response()->json([
            "msg" => "User berhasil dibuat",
            "data" => $data
        ]); // Kode status 201 untuk Created
    }

    /**
     * Display the specified resource.
     */
    public function show(user $user)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update( $request, user $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(user $user)
    {
        //
    }
}
