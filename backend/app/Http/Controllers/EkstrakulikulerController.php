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
            $data
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "ekstrakulikuler_judul" => "required|max:255",
            "ekstrakulikuler_deskripsi" => "required|max:255",
        ]);

        $ekstrakulikuler = uniqid();

        $data = ekstrakulikuler::create([
            'ekstrakulikuler_id' => $ekstrakulikuler,
            'ekstrakulikuler_judul' => $request->ekstrakulikuler_judul,
            'ekstrakulikuler_deskripsi' => $request->ekstrakulikuler_deskripsi
        ]);

        return response()->json(data: $data);
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
