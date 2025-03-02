<?php

namespace App\Http\Controllers;

use App\Models\prestasi;
use Illuminate\Http\Request;

class prestasiController extends Controller
{
    public function index() {
        $data = prestasi::all();

        return response()->json([
            "msg" => "Succes",
            "data" => $data
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "prestasi_juara" => "required|max:255",
            "prestasi_namasiswa" => "required|max:255",
            "prestasi_deskripsi" => "required|max:255"
        ]);
        $prestasi_id = uniqid();
        $data = prestasi::create([
            'prestasi_id' => $prestasi_id,
            'prestasi_juara' =>  $request->prestasi_juara,
            'prestasi_namasiswa' => $request->prestasi_namasiswa,
            'prestasi_deskripsi' => $request->prestasi_deskripsi
        ]);

        return response()->json($data);
    }

    public function update(){

    }

    public function destroy(){

    }
}
