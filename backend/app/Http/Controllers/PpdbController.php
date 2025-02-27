<?php

namespace App\Http\Controllers;

use App\Models\ppdb;
use App\Http\Requests\StoreppdbRequest;
use App\Http\Requests\UpdateppdbRequest;
use Illuminate\Http\Request;

class PpdbController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = ppdb::all();

        return response()->json([
            "message" => "yeay!!!", 
            "data" => $data
        ]);

    }

    public function store(Request $request)
    {
        $request->validate ([
            "ppdb_deskripsi1" => "required|max:255",            
            "ppdb_deskripsi2" => "required|max:255",
            "ppdb_notelp" => "required|max:255",
            "ppdb_namaguru"	=> "required|max:255"
            // "ppdb_url_gambar" => "required | max:255"
        ]);

        $ppdb_id = uniqid();

        $data = ppdb::create([
            'ppdb_id' => $ppdb_id,
            'ppdb_deskripsi1' => $request->ppdb_deskripsi1,
            'ppdb_deskripsi2' => $request->ppdb_deskripsi2,
            'ppdb_notelp' => $request->ppdb_notelp,
            'ppdb_namaguru' => $request->ppdb_namaguru
        ]);

        return response()->json($data);

    }

    /**
     * Display the specified resource.
     */
    public function show($ppdb)
    {
        $ppdb = ppdb::where('ppdb_id', $ppdb)->first();

        if(!$ppdb){
            return response()->json(["massage" => "data invicible", 404]);
        }

        return response()->json($ppdb);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update($ppdb_id, Request $request)
    {
        $ppdb = ppdb::find($ppdb_id);
        if(!$ppdb) {
            return response()->json(["msg" => "tidak dapat termuat"]);
        }

        $request->validate([
            "ppdb_deskripsi1" => "required|max:255",            
            "ppdb_deskripsi2" => "required|max:255",
            "ppdb_notelp" => "required|max:255",
            "ppdb_namaguru"	=> "required|max:255"
        ]);

        $ppdb->update($request->all());

        return response()->json([
            "msg" => "sukses",
            "data" => $ppdb
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($ppdb_id)
    {
        $ppdb = ppdb::find($ppdb_id);

        if(!$ppdb) {
            return response()->json (["msg" => "ppdb no comment"], 404);
        }

        $ppdb->delete();

        return response()->json ([
            "message" => "Telah terhapus",
            "data" => $ppdb
        ]);
    }
}
