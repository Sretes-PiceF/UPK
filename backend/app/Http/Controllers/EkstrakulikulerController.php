<?php

namespace App\Http\Controllers;

use App\Models\ekstrakulikuler;
use App\Http\Requests\StoreekstrakulikulerRequest;
use App\Http\Requests\UpdateekstrakulikulerRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpParser\Node\Stmt\TryCatch;

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
            "ekstrakulikuler_judul" => "required|max:255",
            "ekstrakulikuler_deskripsi" => "required|max:5000",
            "ekstrakulikuler_url_gambar" => "required|image|mimes:jpeg,png,jpg,gif,svg|max:10000",
        ]);

        if ($request->hasFile('ekstrakulikuler_url_gambar')) {
            $image = $request->file('ekstrakulikuler_url_gambar');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/images/ekstrakulikuler'), $imageName);
        }

        $ekstrakulikuler_id = uniqid();
        $saveData = ekstrakulikuler::create([
            'ekstrakulikuler_id' => $ekstrakulikuler_id,
            'ekstrakulikuler_judul' => $request->ekstrakulikuler_judul,
            'ekstrakulikuler_deskripsi' => $request->ekstrakulikuler_deskripsi,
            'ekstrakulikuler_url_gambar' => $imageName
        ]);

        return response()->json($saveData);
    }


    public function show($ekstrakulikuler)
    {
        $ekstrakulikuler = ekstrakulikuler::where('ekstrakulikuler_id', $ekstrakulikuler)->first();

        if (!$ekstrakulikuler) {
            return response()->json(["massage" => "data invicible", 404]);
        }

        return response()->json($ekstrakulikuler);
    }


    public function update($ekstrakulikuler_id, Request $request)
    {
        try {
            $ekstrakulikuler = ekstrakulikuler::find($ekstrakulikuler_id);
            if (!$ekstrakulikuler) {
                return response()->json(["msg" => "Tidak ada ekstrakulikuler"], 400);
            }

            $request->validate([
                "ekstrakulikuler_judul" => "required|max:255",
                "ekstrakulikuler_deskripsi" => "required|max:5000",
                "ekstrakulikuler_url_gambar" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10000"
            ]);

            $ekstrakulikuler->ekstrakulikuler_judul = $request->ekstrakulikuler_judul;
            $ekstrakulikuler->ekstrakulikuler_deskripsi = $request->ekstrakulikuler_deskripsi;

            if ($request->hasFile('ekstrakulikuler_url_gambar')) {
                $storage = Storage::disk('public');

                $imageName = Str::random(32) . "." . $request->ekstrakulikuler_url_gambar->getClientOriginalExtension();
                $request->ekstrakulikuler_url_gambar->storeAs('images/ekstrakulikuler', $imageName, 'public');

                if ($ekstrakulikuler->ekstrakulikuler_url_gambar && $storage->exists('images/ekstrakulikuler/' . $ekstrakulikuler->ekstrakulikuler_url_gambar)) {
                    $storage->delete('images/ekstrakulikuler/' . $ekstrakulikuler->ekstrakulikuler_url_gambar);
                }

                $ekstrakulikuler->ekstrakulikuler_url_gambar = $imageName;
            }

            $ekstrakulikuler->save();

            return response()->json([
                'msg' => "Data berhasil diperbarui",
                'data' => $ekstrakulikuler
            ], 200);
        } catch (\Exception $e) {
            return response()->json(["msg" => "Terjadi kesalahan", "error" => $e->getMessage()], 500);
        }
    }



    public function destroy($ekstrakulikuler_id)
    {
        $ekstrakulikuler = ekstrakulikuler::find($ekstrakulikuler_id);

        if (!$ekstrakulikuler) {
            return response()->json(["Data yang kamu pilih tidak ditemukan"], 404);
        }

        // Hapus gambar jika ada
        if ($ekstrakulikuler->ekstrakulikuler_url_gambar) {
            $imagePath = public_path('storage/images/ekstrakulikuler/' . $ekstrakulikuler->ekstrakulikuler_url_gambar);
            if (File::exists($imagePath)) {
                File::delete($imagePath); // Hapus file gambar
            }
        }

        $ekstrakulikuler->delete();

        return response()->json([
            'msg' => "Data succes di hapus",
            'data' => $ekstrakulikuler
        ]);
    }
}
