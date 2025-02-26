<?php

namespace App\Http\Controllers;

use App\Models\ekstrakulikuler;
use App\Http\Requests\StoreekstrakulikulerRequest;
use App\Http\Requests\UpdateekstrakulikulerRequest;

class EkstrakulikulerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = ekstrakulikuler::all();

        return response()->json([
            "message" => "success",
            $data
        ]);

    }

    public function store(StoreekstrakulikulerRequest $request)
    {
        $request->validate ([
          "ekstrakulikuler_judul" => "required|max:255",
          "ekstrakulikuler_deskripsi" => "required|max:255",
        ]);

        $ekstrakulikuler = uniqid();

        $data = ekstrakulikuler::create([
            'ekstrakulikuler_id' => $ekstrakulikuler,
            'ekstrakulikuler_judul' => $request->ekstrakulikuler_judul,
            'ekstrakulikuler_deskripsi' => $request->ekstrakulikuler_deskripsi
        ]);

        return response()->json(data:$data);

    }

    /**
     * Display the specified resource.
     */
    public function show(ekstrakulikuler $ekstrakulikuler)
    {
        $ekstrakulikuler = ekstrakulikuler::where('id', $ekstrakulikuler)->first();

        if(!$ekstrakulikuler){
            return response()->json(["massage" => "data invicible", 404]);
        }

        return response()->json($ekstrakulikuler);

    }

    
    public function update(UpdateekstrakulikulerRequest $request, ekstrakulikuler $ekstrakulikuler)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ekstrakulikuler $ekstrakulikuler)
    {
        //
    }
}
