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
            "msg " => "succes mengambil data",
            "data" => $data
        ]);
    }
    
    
    public function store(StoreprestasiRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(prestasi $prestasi)
    {
        //
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
