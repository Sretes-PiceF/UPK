import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../../../widgets/sidebar.dart';
import '../ekstrakulikuler_page.dart';
import 'dart:io';
import 'package:image_picker/image_picker.dart';

class UpdateEkstrakulikulerPage extends StatefulWidget {
  final String id;

  const UpdateEkstrakulikulerPage({super.key, required this.id});

  @override
  State<UpdateEkstrakulikulerPage> createState() =>
      _UpdateEkstrakurikulerPageState();
}

class _UpdateEkstrakurikulerPageState extends State<UpdateEkstrakulikulerPage> {
  final _namaController = TextEditingController();
  final _deskripsiController = TextEditingController();

  File? _imageFile;
  final _picker = ImagePicker();

  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    fetchEkstrakurikuler();
  }

  Future<void> fetchEkstrakurikuler() async {
    final response = await http.get(
      Uri.parse('http://localhost:8000/api/ekstrakulikuler/${widget.id}'),
    );

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      setState(() {
        _namaController.text = data['ekstrakulikuler_judul'] ?? '';
        _deskripsiController.text = data['ekstrakulikuler_deskripsi'] ?? '';
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

  Future<void> updateEkstrakurikuler() async {
    setState(() => _isLoading = true);

    var request = http.MultipartRequest(
      'POST',
      Uri.parse('http://localhost:8000/api/ekstrakulikuler/${widget.id}'),
    );
    request.fields['_method'] = 'PUT';
    request.fields['ekstrakulikuler_judul'] = _namaController.text;
    request.fields['ekstrakulikuler_deskripsi'] = _deskripsiController.text;

    if (_imageFile != null) {
      request.files.add(
        await http.MultipartFile.fromPath(
          'ekstrakulikuler_url_gambar',
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
        MaterialPageRoute(builder: (_) => const EkstrakulikulerPage()),
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
        title: const Text('Update Ekstrakurikuler'),
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
            if (_imageFile != null)
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Image.file(_imageFile!, height: 150),
              ),
            TextField(
              controller: _namaController,
              decoration: const InputDecoration(
                labelText: 'Judul Ekstrakurikuler',
              ),
            ),
            TextField(
              controller: _deskripsiController,
              decoration: const InputDecoration(labelText: 'Deskripsi'),
              maxLines: 5,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _isLoading ? null : updateEkstrakurikuler,
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
