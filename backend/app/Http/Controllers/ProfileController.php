<?php

namespace App\Http\Controllers;

use App\Models\profile;
use App\Http\Requests\StoreprofileRequest;
use App\Http\Requests\UpdateprofileRequest;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = profile::all();

        return response()->json([
            "message" => "success",
            $data
        ]);

    }

   
    public function store(Request $request)
    {
        $request->validate ([
            "profile_guru" => "required |max:255",
            "profile_siswa" => "required |max:225"
        ]);

        $data = profile::create($request->all());

        return response()->json(data:$data);

    }

    /**
     * Display the specified resource.
     */
    public function show($profile)
    {
        $profile = profile::where('id', $profile)->first();

        if(!$profile){
            return response()->json(["massage" => "data invicible", 404]);
        }

        return response()->json($profile);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(profile $profile)
    {
        //
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
