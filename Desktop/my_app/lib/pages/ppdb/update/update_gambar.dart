import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import '../../../widgets/sidebar.dart';

class UpdatePPDBGambarPage extends StatefulWidget {
  final String id;

  const UpdatePPDBGambarPage({super.key, required this.id});

  @override
  State<UpdatePPDBGambarPage> createState() => _UpdatePPDBGambarPageState();
}

class _UpdatePPDBGambarPageState extends State<UpdatePPDBGambarPage> {
  File? _imageFile;
  final _picker = ImagePicker();
  bool _isLoading = false;
  String? _existingImage;

  @override
  void initState() {
    super.initState();
    fetchPPDB();
  }

  Future<void> fetchPPDB() async {
    final response = await http.get(
      Uri.parse('http://localhost:8000/api/ppdb/${widget.id}'),
    );

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      setState(() {
        _existingImage = data['ppdb_url_gambar'];
      });
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Gagal memuat data PPDB')));
    }
  }

  Future<void> _pickImage() async {
    final pickedFile = await _picker.pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        _imageFile = File(pickedFile.path);
      });
    }
  }

  Future<void> updatePPDBGambar() async {
    setState(() => _isLoading = true);

    var request = http.MultipartRequest(
      'POST',
      Uri.parse('http://localhost:8000/api/ppdb/${widget.id}'),
    );
    request.fields['_method'] = 'PUT';

    if (_imageFile != null) {
      request.files.add(
        await http.MultipartFile.fromPath('ppdb_url_gambar', _imageFile!.path),
      );
    }

    var response = await request.send();
    setState(() => _isLoading = false);

    if (response.statusCode == 200) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Gambar berhasil diupdate!')),
      );

      // Tunggu sedikit agar snackbar terlihat lalu kembali
      await Future.delayed(const Duration(seconds: 1));
      Navigator.pop(context);
    } else {
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Gagal mengupdate gambar')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Sidebar(),
      appBar: AppBar(
        title: const Text('Update Gambar PPDB'),
        backgroundColor: Colors.teal,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Center(
          // <- Tambahkan Center
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment:
                CrossAxisAlignment.center, // <- Tengah secara horizontal
            children: [
              ElevatedButton(
                onPressed: _pickImage,
                child: const Text('Pilih Gambar Baru'),
              ),
              const SizedBox(height: 10),
              if (_imageFile != null)
                Image.file(_imageFile!, height: 150)
              else if (_existingImage != null)
                Image.network(
                  'http://localhost:8000/storage/images/ppdb/$_existingImage',
                  height: 150,
                ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _isLoading ? null : updatePPDBGambar,
                child: _isLoading
                    ? const CircularProgressIndicator()
                    : const Text('Update Gambar'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
