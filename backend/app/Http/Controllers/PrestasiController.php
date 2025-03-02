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
            "prestasi_juara" => "required|integer",
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

    public function update($prestasi_id, Request $request){
        $prestasi = prestasi::find($prestasi_id);
        if (!$prestasi) {
            return response()->json(["msg" => "Tidak ada data"], 404);
        }
        $prestasi->update($request->all());

        return response()->json([
            "msg" => "Data berhasil di update",
            "data" => $prestasi
        ]);
    }

    public function destroy(){

    }
}
