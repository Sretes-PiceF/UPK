<?php

namespace App\Http\Controllers;

use App\Models\prestasi;
use App\Http\Requests\StoreprestasiRequest;
use App\Http\Requests\UpdateprestasiRequest;

class PrestasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = prestasi::all();

        return response()->json([
            "message" => "success",
            $data
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreprestasiRequest $request)
    {
        $request->validate([
            "prestasi_juara" => "required|max:225",
            "prestasi_namasiswa" => "required|max:225",
            "prestasi_kelassiswa" => "required|max:225",
            "prestasi_tahun" => "required|date"
        ]);

        $data=prestasi::create($request->all());

        return response()->json(data:$data);
        }

    /**
     * Display the specified resource.
     */
    public function show(prestasi $prestasi)
    {
        $prestasi = prestasi::where('id', $prestasi)->first();

        if(!$prestasi){
            return response()->json(["massage" => "data invicible",404]);
        }

        return response()->json($prestasi);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateprestasiRequest $request, prestasi $prestasi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(prestasi $prestasi)
    {
        //
    }
}
