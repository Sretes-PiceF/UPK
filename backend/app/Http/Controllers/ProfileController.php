<?php

namespace App\Http\Controllers;

use App\Models\ekstrakulikuler;
use App\Models\prestasi;
use App\Models\profile;
use App\Http\Requests\StoreprofileRequest;
use App\Http\Requests\UpdateprofileRequest;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index ()  {
        $data = profile::all();

        return response()->json([
            "message" => "success",
            "data" => $data
        ]);
    }


    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            "profile_guru" => "required|integer",
            "profile_siswa" => "required|integer"
        ]);
    
        // Ambil jumlah data dari tabel prestasi dan ekstrakulikuler
        $jumlahDataPrestasi = prestasi::count();
        $jumlahDataEkstrakulikuler = ekstrakulikuler::count();
    
        // Buat ID unik untuk profile
        $profile = uniqid();
    
        // Simpan data ke tabel profile
        $data = Profile::create([
            'profile_id' => $profile,
            'profile_guru' => $request->profile_guru,
            'profile_siswa' => $request->profile_siswa,
            'jumlah_prestasi' => $jumlahDataPrestasi, // Simpan jumlah prestasi
            'jumlah_ekstrakulikuler' => $jumlahDataEkstrakulikuler // Simpan jumlah ekstrakulikuler
        ]);
    
        return response()->json([
            "message" => "success",
            "data" => $data
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($profile)
    {
        $profile = profile::where('profile_id', $profile)->first();

        if (!$profile) {
            return response()->json(["massage" => "data invicible"], 404);
        }

        return response()->json($profile);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateprofileRequest $request, profile $profile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(profile $profile)
    {
        //
    }
}
