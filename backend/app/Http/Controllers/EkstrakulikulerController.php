<?php

namespace App\Http\Controllers;

use App\Models\ekstrakulikuler;
use App\Http\Requests\StoreekstrakulikulerRequest;
use App\Http\Requests\UpdateekstrakulikulerRequest;
use Illuminate\Http\Request;

class EkstrakulikulerController extends Controller
{

    public function index()
    {
        $data = ekstrakulikuler::all();

        return response()->json([
            "message" => "success",
            "data" => $data
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "*.ekstrakulikuler_judul" => "required|max:255",
            "*.ekstrakulikuler_deskripsi" => "required|max:5000",
        ]);

        $data = request()->all();
        $saveData = [];

        foreach ($data as $item) {

        $saveData [] = ekstrakulikuler::create([
            'ekstrakulikuler_id' => uniqid(),
            'ekstrakulikuler_judul' => $item['ekstrakulikuler_judul'],
            'ekstrakulikuler_deskripsi' => $item['ekstrakulikuler_deskripsi']
        ]);
    }
        return response()->json($saveData);
    }


    public function show(ekstrakulikuler $ekstrakulikuler)
    {
        $ekstrakulikuler = ekstrakulikuler::where('ekstrakulikuler_id', $ekstrakulikuler)->first();

        if (!$ekstrakulikuler) {
            return response()->json(["massage" => "data invicible", 404]);
        }

        return response()->json($ekstrakulikuler);
    }


    public function update($ekstrakulikuler_id, Request $request)
    {
        $ekstrakulikuler = ekstrakulikuler::find($ekstrakulikuler_id);
        if(!$ekstrakulikuler) {
            return response()->json(["msg" => "tidak dapat termuat"]);
        }

        $request->validate([
            "ekstrakulikuler_judul" => "required|max:255",
            "ekstrakulikuler_deskripsi" => "required|max:255",
        ]);

        $ekstrakulikuler->update($request->all());

        return response()->json([
            "msg" => "sukses",
            "data" => $ekstrakulikuler
        ]);
    }


    public function destroy($ekstrakulikuler_id)
    {
        $ekstrakulikuler = ekstrakulikuler::find($ekstrakulikuler_id);

        if (!$ekstrakulikuler) {
            return response()->json(["msg" => "tidak ketemu"], 404);
        }

        $ekstrakulikuler->delete();

        return response()->json([
            "msg" => "berhasil ke delete kawan",
            "data" => $ekstrakulikuler
        ]);
    }
}
