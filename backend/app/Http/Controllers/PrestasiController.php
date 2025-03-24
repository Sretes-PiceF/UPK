<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateprestasiRequest;
use App\Models\prestasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class prestasiController extends Controller
{
    public function index()
    {
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
            "prestasi_deskripsi" => "required|max:3000",
            "prestasi_url_gambar" => "required|image|mimes:jpeg,png,jpg,gif,svg|max:10000"
        ]);

        if ($request->hasFile('prestasi_url_gambar')) {
            $image = $request->file('prestasi_url_gambar');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/images/prestasi'), $imageName);
        }

        $prestasi_id = uniqid();
        $data = prestasi::create([
            'prestasi_id' => $prestasi_id,
            'prestasi_juara' =>  $request->prestasi_juara,
            'prestasi_namasiswa' => $request->prestasi_namasiswa,
            'prestasi_deskripsi' => $request->prestasi_deskripsi,
            'prestasi_url_gambar' => $imageName
        ]);

        return response()->json($data);
    }

    public function update($prestasi_id, Request $request)
    {
        try {
            $prestasi = Prestasi::find($prestasi_id);
            if (!$prestasi) {
                return response()->json([
                    "msg" => "Tidak ada prestasi"
                ], 404);
            }

            $request->validate([
                "prestasi_juara" => "required|max:255",
                "prestasi_namasiswa" => "required|max:255",
                "prestasi_deskripsi" => "required|max:3000",
                "prestasi_url_gambar" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10000"
            ]);

            // Mulai transaksi database
            DB::beginTransaction();

            $prestasi->prestasi_juara = $request->prestasi_juara;
            $prestasi->prestasi_namasiswa = $request->prestasi_namasiswa;
            $prestasi->prestasi_deskripsi = $request->prestasi_deskripsi;

            if ($request->hasFile('prestasi_url_gambar')) {
                $storage = Storage::disk('public');

                // Simpan gambar baru terlebih dahulu
                $imageName = Str::random(32) . "." . $request->prestasi_url_gambar->getClientOriginalExtension();
                $request->prestasi_url_gambar->storeAs('images/prestasi', $imageName, 'public');

                // Hapus gambar lama jika ada
                if ($prestasi->prestasi_url_gambar && $storage->exists('images/prestasi/' . $prestasi->prestasi_url_gambar)) {
                    $storage->delete('images/prestasi/' . $prestasi->prestasi_url_gambar);
                }

                // Update nama gambar di database
                $prestasi->prestasi_url_gambar = $imageName;
            }

            // Simpan perubahan ke database
            $prestasi->save();

            // Commit transaksi
            DB::commit();

            return response()->json([
                'msg' => 'Data success di update',
                'data' => $prestasi
            ], 200);
        } catch (\Exception $e) {
            // Rollback transaksi jika terjadi error
            DB::rollBack();
            return response()->json([
                'msg' => 'Terjadi kesalahan saat mengupdate data.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function show($prestasi)
    {
        $prestasi = prestasi::find($prestasi);

        if (!$prestasi) {
            return response()->json(["massage" => "data invicible", 404]);
        }

        return response()->json($prestasi);
    }


    public function destroy($prestasi_id)
    {
        $prestasi = prestasi::find($prestasi_id);

        if (!$prestasi) {
            return response()->json(["Data yang kamu pilih tidak ditemukan"], 404);
        }

        // Hapus gambar jika ada
        if ($prestasi->prestasi_url_gambar) {
            $imagePath = public_path('storage/images/prestasi/' . $prestasi->prestasi_url_gambar);
            if (File::exists($imagePath)) {
                File::delete($imagePath); // Hapus file gambar
            }
        }

        $prestasi->delete();

        return response()->json([
            'msg' => "Data succes di hapus",
            'data' => $prestasi
        ]);
    }
}
