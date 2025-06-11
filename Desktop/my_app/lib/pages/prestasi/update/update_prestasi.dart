import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import '../../../widgets/sidebar.dart';
import '../prestasi_page.dart';

class UpdatePrestasiPage extends StatefulWidget {
  final String id;

  const UpdatePrestasiPage({super.key, required this.id});

  @override
  State<UpdatePrestasiPage> createState() => _UpdatePrestasiPageState();
}

class _UpdatePrestasiPageState extends State<UpdatePrestasiPage> {
  final _juaraController = TextEditingController();
  final _namaSiswaController = TextEditingController();
  final _deskripsiController = TextEditingController();

  File? _imageFile;
  final _picker = ImagePicker();
  bool _isLoading = false;
  String? _existingImage;

  @override
  void initState() {
    super.initState();
    fetchPrestasi();
  }

  Future<void> fetchPrestasi() async {
    final response = await http.get(
      Uri.parse('http://localhost:8000/api/prestasi/${widget.id}'),
    );

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      setState(() {
        _juaraController.text = data['prestasi_juara'] ?? '';
        _namaSiswaController.text = data['prestasi_namasiswa'] ?? '';
        _deskripsiController.text = data['prestasi_deskripsi'] ?? '';
        _existingImage = data['prestasi_url_gambar'];
      });
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Gagal memuat data')));
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

  Future<void> updatePrestasi() async {
    setState(() => _isLoading = true);

    var request = http.MultipartRequest(
      'POST',
      Uri.parse('http://localhost:8000/api/prestasi/${widget.id}'),
    );
    request.fields['_method'] = 'PUT';
    request.fields['prestasi_juara'] = _juaraController.text;
    request.fields['prestasi_namasiswa'] = _namaSiswaController.text;
    request.fields['prestasi_deskripsi'] = _deskripsiController.text;

    if (_imageFile != null) {
      request.files.add(
        await http.MultipartFile.fromPath(
          'prestasi_url_gambar',
          _imageFile!.path,
        ),
      );
    }

    var response = await request.send();
    setState(() => _isLoading = false);

    if (response.statusCode == 200) {
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Berhasil diupdate!')));
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const PrestasiPage()),
      );
    } else {
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Gagal mengupdate data')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Sidebar(),
      appBar: AppBar(
        title: const Text('Update Prestasi'),
        backgroundColor: Colors.teal,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            ElevatedButton(
              onPressed: _pickImage,
              child: const Text('Pilih Gambar'),
            ),
            const SizedBox(height: 10),
            if (_imageFile != null)
              Image.file(_imageFile!, height: 150)
            else if (_existingImage != null)
              Image.network(
                'http://localhost:8000/storage/images/prestasi/$_existingImage',
                height: 150,
              ),
            const SizedBox(height: 20),
            TextField(
              controller: _juaraController,
              decoration: const InputDecoration(labelText: 'Judul Juara'),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: _namaSiswaController,
              decoration: const InputDecoration(labelText: 'Nama Siswa'),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: _deskripsiController,
              decoration: const InputDecoration(labelText: 'Deskripsi'),
              maxLines: 5,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _isLoading ? null : updatePrestasi,
              child: _isLoading
                  ? const CircularProgressIndicator()
                  : const Text('Update'),
            ),
          ],
        ),
      ),
    );
  }
}
