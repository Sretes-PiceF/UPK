import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:my_app/pages/prestasi/prestasi_page.dart';
import '../../../widgets/sidebar.dart';

class CreatePrestasiPage extends StatefulWidget {
  const CreatePrestasiPage({super.key, this.onDataCreated});

  final VoidCallback? onDataCreated;

  @override
  State<CreatePrestasiPage> createState() => _CreatePrestasiPageState();
}

class _CreatePrestasiPageState extends State<CreatePrestasiPage> {
  final TextEditingController _juaraController = TextEditingController();
  final TextEditingController _namaSiswaController = TextEditingController();
  final TextEditingController _deskripsiController = TextEditingController();
  File? _gambar;
  final _formKey = GlobalKey<FormState>();
  bool _isSubmitting = false;
  String? _submitError;

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    setState(() {
      _gambar = pickedFile != null ? File(pickedFile.path) : null;
    });
  }

  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate() || _gambar == null) {
      setState(
        () => _submitError = _gambar == null ? 'Gambar harus dipilih.' : null,
      );
      return;
    }

    setState(() {
      _isSubmitting = true;
      _submitError = null;
    });

    try {
      final request = http.MultipartRequest(
        'POST',
        Uri.parse('http://localhost:8000/api/prestasi'),
      );
      request.fields['prestasi_juara'] = _juaraController.text;
      request.fields['prestasi_namasiswa'] = _namaSiswaController.text;
      request.fields['prestasi_deskripsi'] = _deskripsiController.text;
      request.files.add(
        await http.MultipartFile.fromPath('prestasi_url_gambar', _gambar!.path),
      );

      final response = await request.send();

      if (response.statusCode == 200 || response.statusCode == 201) {
        if (!mounted) return;

        // Tampilkan snackbar
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Prestasi berhasil ditambahkan!')),
        );

        // Panggil callback untuk refresh data di halaman sebelumnya
        if (widget.onDataCreated != null) {
          widget.onDataCreated!();
        }

        // Kembali ke halaman sebelumnya
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => PrestasiPage()),
        );
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
      if (mounted) {
        setState(() => _isSubmitting = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Sidebar(),
      appBar: AppBar(
        title: const Text('Buat Prestasi'),
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
                      children: [
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
                                : const Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Icon(
                                        Icons.image,
                                        size: 50,
                                        color: Colors.grey,
                                      ),
                                      Text('Pilih Gambar'),
                                    ],
                                  ),
                          ),
                        ),
                        const SizedBox(height: 16),
                        TextFormField(
                          controller: _juaraController,
                          decoration: const InputDecoration(
                            labelText: 'Judul Juara',
                            border: OutlineInputBorder(),
                          ),
                          validator: (value) =>
                              value == null || value.trim().isEmpty
                              ? 'Judul juara harus diisi'
                              : null,
                        ),
                        const SizedBox(height: 16),
                        TextFormField(
                          controller: _namaSiswaController,
                          decoration: const InputDecoration(
                            labelText: 'Nama Siswa',
                            border: OutlineInputBorder(),
                          ),
                          validator: (value) =>
                              value == null || value.trim().isEmpty
                              ? 'Nama siswa harus diisi'
                              : null,
                        ),
                        const SizedBox(height: 16),
                        TextFormField(
                          controller: _deskripsiController,
                          decoration: const InputDecoration(
                            labelText: 'Deskripsi',
                            border: OutlineInputBorder(),
                          ),
                          maxLines: 3,
                          validator: (value) =>
                              value == null || value.trim().isEmpty
                              ? 'Deskripsi harus diisi'
                              : null,
                        ),
                        const SizedBox(height: 24),
                        ElevatedButton(
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

  @override
  void dispose() {
    _juaraController.dispose();
    _namaSiswaController.dispose();
    _deskripsiController.dispose();
    super.dispose();
  }
}
