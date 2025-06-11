import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import '../../../widgets/sidebar.dart';

class CreatePpdbPage extends StatefulWidget {
  const CreatePpdbPage({super.key});

  @override
  State<CreatePpdbPage> createState() => _CreatePpdbPageState();
}

class _CreatePpdbPageState extends State<CreatePpdbPage> {
  File? _gambar;
  final _formKey = GlobalKey<FormState>();
  bool _isSubmitting = false;
  String? _submitError;
  Map<String, dynamic>? _ppdbData;

  @override
  void initState() {
    super.initState();
    _fetchPpdbData();
  }

  Future<void> _fetchPpdbData() async {
    try {
      final response = await http.get(
        Uri.parse('http://localhost:8000/api/ppdb'),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['data'] != null && data['data'].length > 0) {
          setState(() {
            _ppdbData = data['data'][0];
          });
        }
      }
    } catch (e) {
      setState(() {
        _submitError = "Gagal memuat data dasar. Silakan coba lagi.";
      });
    }
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    setState(() {
      _gambar = pickedFile != null ? File(pickedFile.path) : null;
    });
  }

  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate() || _gambar == null) {
      setState(() {
        _submitError = _gambar == null ? 'Gambar harus dipilih.' : null;
      });
      return;
    }

    if (_ppdbData == null) {
      setState(() {
        _submitError = 'Data dasar belum tersedia.';
      });
      return;
    }

    setState(() {
      _isSubmitting = true;
      _submitError = null;
    });

    try {
      final request = http.MultipartRequest(
        'POST',
        Uri.parse('http://localhost:8000/api/ppdb'),
      );

      // Add existing data from _ppdbData
      request.fields['ppdb_deskripsi1'] = _ppdbData!['ppdb_deskripsi1'] ?? '';
      request.fields['ppdb_deskripsi2'] = _ppdbData!['ppdb_deskripsi2'] ?? '';
      request.fields['ppdb_namaguru_1'] = _ppdbData!['ppdb_namaguru_1'] ?? '';
      request.fields['ppdb_namaguru_2'] = _ppdbData!['ppdb_namaguru_2'] ?? '';
      request.fields['ppdb_notelp_1'] = _ppdbData!['ppdb_notelp_1'] ?? '';
      request.fields['ppdb_notelp_2'] = _ppdbData!['ppdb_notelp_2'] ?? '';

      // Add image file
      request.files.add(
        await http.MultipartFile.fromPath('ppdb_url_gambar', _gambar!.path),
      );

      final response = await request.send();

      if (response.statusCode == 200 || response.statusCode == 201) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Data berhasil ditambahkan!')),
        );
        Navigator.pop(context);
      } else {
        final respStr = await response.stream.bytesToString();
        setState(() {
          _submitError =
              "Gagal kirim: ${json.decode(respStr)['message'] ?? 'Unknown error'}";
        });
      }
    } catch (e) {
      setState(() {
        _submitError = 'Terjadi kesalahan: $e';
      });
    } finally {
      setState(() => _isSubmitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Sidebar(),
      appBar: AppBar(
        title: const Text('Tambah Gambar'), // Judul diubah
        backgroundColor: Colors.teal,
      ),
      body: Row(
        children: [
          Expanded(
            child: Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24),
                child: Container(
                  width: 500,
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: Colors.grey[100],
                    borderRadius: BorderRadius.circular(24),
                  ),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Teks "PPDB" dan "Selamat Datang" dihapus
                        if (_submitError != null)
                          Container(
                            padding: const EdgeInsets.all(12),
                            margin: const EdgeInsets.only(bottom: 12),
                            color: Colors.red[100],
                            child: Text(
                              _submitError!,
                              style: const TextStyle(color: Colors.red),
                            ),
                          ),

                        // Image upload section
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Upload Gambar',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            const SizedBox(height: 8),
                            GestureDetector(
                              onTap: _pickImage,
                              child: Container(
                                height: 180,
                                width: double.infinity,
                                decoration: BoxDecoration(
                                  border: Border.all(color: Colors.grey),
                                  borderRadius: BorderRadius.circular(12),
                                  color: Colors.white,
                                ),
                                child: _gambar != null
                                    ? Image.file(_gambar!, fit: BoxFit.cover)
                                    : const Center(
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          children: [
                                            Icon(
                                              Icons.image,
                                              size: 50,
                                              color: Colors.grey,
                                            ),
                                            SizedBox(height: 8),
                                            Text('Pilih Gambar'),
                                          ],
                                        ),
                                      ),
                              ),
                            ),
                            if (_submitError != null &&
                                _submitError!.contains('Gambar'))
                              Text(
                                _submitError!,
                                style: const TextStyle(
                                  color: Colors.red,
                                  fontSize: 12,
                                ),
                              ),
                          ],
                        ),

                        const SizedBox(height: 24),

                        // Submit button
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.blue,
                              minimumSize: const Size.fromHeight(50),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            onPressed: _isSubmitting ? null : _submitForm,
                            child: _isSubmitting
                                ? const CircularProgressIndicator(
                                    color: Colors.white,
                                  )
                                : const Text(
                                    'Buat',
                                    style: TextStyle(color: Colors.white),
                                  ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
