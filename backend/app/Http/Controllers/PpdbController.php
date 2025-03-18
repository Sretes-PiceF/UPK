<?php

namespace App\Http\Controllers;

use App\Models\ppdb;
use App\Http\Requests\StoreppdbRequest;
use App\Http\Requests\UpdateppdbRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
        $request->validate([
            "ppdb_deskripsi1" => "required|max:255",
            "ppdb_deskripsi2" => "required|max:255",
            "ppdb_notelp_1" => "required|max:15",
            "ppdb_notelp_2" => "required|max:15",
            "ppdb_namaguru_1"    => "required|max:255",
            "ppdb_namaguru_2"    => "required|max:255",
            "ppdb_url_gambar" => "required|image|mimes:jpeg,png,jpg,gif,svg|max:10000",
        ]);

        if ($request->hasFile('ppdb_url_gambar')) {
            $image = $request->file('ppdb_url_gambar');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/images/ppdb'), $imageName);
        }

        ppdb::query()->update(['status' => false]);

        $ppdb_id = uniqid();

        $data = ppdb::create([
            'ppdb_id' => $ppdb_id,
            'ppdb_deskripsi1' => $request->ppdb_deskripsi1,
            'ppdb_deskripsi2' => $request->ppdb_deskripsi2,
            'ppdb_notelp_1' => $request->ppdb_notelp_1,
            'ppdb_notelp_2' => $request->ppdb_notelp_2,
            'ppdb_namaguru_1' => $request->ppdb_namaguru_1,
            'ppdb_namaguru_2' => $request->ppdb_namaguru_2,
            'ppdb_url_gambar' => $imageName
        ]);

        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */

    /**
     * Update the specified resource in storage.
     */
    public function update($ppdb_id, Request $request)
    {
        try {
            // Cari data berdasarkan ppdb_id
            $ppdb = ppdb::find($ppdb_id);
            if (!$ppdb) {
                return response()->json(["msg" => "Data tidak ditemukan"], 404);
            }

            // Validasi hanya untuk field yang dikirim di request
            $rules = [];
            if ($request->has('ppdb_deskripsi1')) {
                $rules['ppdb_deskripsi1'] = 'required|max:255';
            }
            if ($request->has('ppdb_deskripsi2')) {
                $rules['ppdb_deskripsi2'] = 'required|max:255';
            }
            if ($request->has('ppdb_notelp_1')) {
                $rules['ppdb_notelp_1'] = 'required|max:15';
            }
            if ($request->has('ppdb_notelp_2')) {
                $rules['ppdb_notelp_2'] = 'required|max:15';
            }
            if ($request->has('ppdb_namaguru_1')) {
                $rules['ppdb_namaguru_1'] = 'required|max:255';
            }
            if ($request->has('ppdb_namaguru_2')) {
                $rules['ppdb_namaguru_2'] = 'required|max:255';
            }
            if ($request->hasFile('ppdb_url_gambar')) {
                $rules['ppdb_url_gambar'] = 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10000';
            }

            // Validasi request
            $request->validate($rules);

            // Update field teks hanya jika ada di request
            if ($request->has('ppdb_deskripsi1')) {
                $ppdb->ppdb_deskripsi1 = $request->ppdb_deskripsi1;
            }
            if ($request->has('ppdb_deskripsi2')) {
                $ppdb->ppdb_deskripsi2 = $request->ppdb_deskripsi2;
            }
            if ($request->has('ppdb_notelp_1')) {
                $ppdb->ppdb_notelp_1 = $request->ppdb_notelp_1;
            }
            if ($request->has('ppdb_notelp_2')) {
                $ppdb->ppdb_notelp_2 = $request->ppdb_notelp_2;
            }
            if ($request->has('ppdb_namaguru_1')) {
                $ppdb->ppdb_namaguru_1 = $request->ppdb_namaguru_1;
            }
            if ($request->has('ppdb_namaguru_2')) {
                $ppdb->ppdb_namaguru_2 = $request->ppdb_namaguru_2;
            }

            // Update gambar hanya jika diupload
            if ($request->hasFile('ppdb_url_gambar')) {
                $storage = Storage::disk('public');

                // Hapus gambar lama jika ada
                if ($ppdb->ppdb_url_gambar) {
                    $oldImagePath = 'images/ppdb/' . $ppdb->ppdb_url_gambar;
                    if ($storage->exists($oldImagePath)) {
                        $storage->delete($oldImagePath);
                    }
                }

                // Simpan gambar baru
                $imageName = Str::random(32) . "." . $request->ppdb_url_gambar->getClientOriginalExtension();
                $request->ppdb_url_gambar->storeAs('images/ppdb', $imageName, 'public');
                $ppdb->ppdb_url_gambar = $imageName;
            }

            // Simpan perubahan pada data yang diupdate
            $ppdb->save();

            // Update semua data lainnya (kecuali gambar) dengan nilai yang sama
            ppdb::where('ppdb_id', '!=', $ppdb_id)->update([
                'ppdb_deskripsi1' => $ppdb->ppdb_deskripsi1,
                'ppdb_deskripsi2' => $ppdb->ppdb_deskripsi2,
                'ppdb_notelp_1' => $ppdb->ppdb_notelp_1,
                'ppdb_notelp_2' => $ppdb->ppdb_notelp_2,
                'ppdb_namaguru_1' => $ppdb->ppdb_namaguru_1,
                'ppdb_namaguru_2' => $ppdb->ppdb_namaguru_2,
            ]);

            return response()->json([
                'msg' => "Data berhasil diperbarui",
                'data' => $ppdb
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "msg" => "Terjadi kesalahan",
                "error" => $e->getMessage() // Tampilkan pesan error untuk debugging
            ], 500);
        }
    }

    public function show($ppdb)
    {
        $ppdb = ppdb::where('ppdb_id', $ppdb)->first();

        if (!$ppdb) {
            return response()->json(["massage" => "data invicible", 404]);
        }

        return response()->json($ppdb);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($ppdb_id)
    {
        $ppdb = ppdb::find($ppdb_id);

        if (!$ppdb) {
            return response()->json(["msg" => "ppdb no comment"], 404);
        }

        // Jika data yang dihapus aktif, aktifkan data lain
        if ($ppdb->status) {
            $otherData = ppdb::where('ppdb_id', '!=', $ppdb_id)->first();
            if ($otherData) {
                $otherData->status = true;
                $otherData->save();
            }
        }

        // Hapus gambar jika ada
        if ($ppdb->ppdb_url_gambar) {
            $imagePath = public_path('storage/images/ppdb/' . $ppdb->ppdb_url_gambar);
            if (File::exists($imagePath)) {
                File::delete($imagePath);
            }
        }

        $ppdb->delete();

        return response()->json([
            "message" => "Telah terhapus",
            "data" => $ppdb
        ]);
    }
}
