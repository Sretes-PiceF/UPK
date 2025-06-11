import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../../../widgets/sidebar.dart';
import '../ppdb_page.dart';

class UpdatePPDBPage extends StatefulWidget {
  final String id;

  const UpdatePPDBPage({super.key, required this.id});

  @override
  State<UpdatePPDBPage> createState() => _UpdatePPDBPageState();
}

class _UpdatePPDBPageState extends State<UpdatePPDBPage> {
  final _deskripsi1Controller = TextEditingController();
  final _deskripsi2Controller = TextEditingController();
  final _namaGuru1Controller = TextEditingController();
  final _namaGuru2Controller = TextEditingController();
  final _noTelp1Controller = TextEditingController();
  final _noTelp2Controller = TextEditingController();

  bool _isLoading = false;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    fetchPPDB();
  }

  Future<void> fetchPPDB() async {
    setState(() => _isLoading = true);

    try {
      final response = await http.get(
        Uri.parse('http://localhost:8000/api/ppdb/${widget.id}'),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          _deskripsi1Controller.text = data['ppdb_deskripsi1'] ?? '';
          _deskripsi2Controller.text = data['ppdb_deskripsi2'] ?? '';
          _namaGuru1Controller.text = data['ppdb_namaguru_1'] ?? '';
          _namaGuru2Controller.text = data['ppdb_namaguru_2'] ?? '';
          _noTelp1Controller.text = data['ppdb_notelp_1'] ?? '';
          _noTelp2Controller.text = data['ppdb_notelp_2'] ?? '';
        });
      } else {
        throw Exception('Gagal memuat data: ${response.statusCode}');
      }
    } catch (e) {
      setState(() {
        _errorMessage = e.toString();
      });
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Future<void> updatePPDB() async {
    if (_deskripsi1Controller.text.isEmpty ||
        _deskripsi2Controller.text.isEmpty ||
        _namaGuru1Controller.text.isEmpty ||
        _namaGuru2Controller.text.isEmpty) {
      setState(() {
        _errorMessage = 'Semua field harus diisi kecuali nomor telepon';
      });
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final response = await http.put(
        Uri.parse('http://localhost:8000/api/ppdb/${widget.id}'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'ppdb_deskripsi1': _deskripsi1Controller.text,
          'ppdb_deskripsi2': _deskripsi2Controller.text,
          'ppdb_namaguru_1': _namaGuru1Controller.text,
          'ppdb_namaguru_2': _namaGuru2Controller.text,
          'ppdb_notelp_1': _noTelp1Controller.text,
          'ppdb_notelp_2': _noTelp2Controller.text,
          'update_all': true,
        }),
      );

      if (response.statusCode == 200) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Data PPDB berhasil diperbarui!')),
        );
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (_) => const PPDBPage()),
        );
      } else {
        throw Exception('Gagal mengupdate data: ${response.statusCode}');
      }
    } catch (e) {
      setState(() {
        _errorMessage = e.toString();
      });
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Sidebar(),
      appBar: AppBar(
        title: const Text('Update PPDB'),
        backgroundColor: Colors.teal,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Column(
                children: [
                  if (_errorMessage != null)
                    Container(
                      padding: const EdgeInsets.all(12),
                      margin: const EdgeInsets.only(bottom: 16),
                      color: Colors.red[100],
                      child: Text(
                        _errorMessage!,
                        style: const TextStyle(color: Colors.red),
                      ),
                    ),

                  TextField(
                    controller: _deskripsi1Controller,
                    decoration: const InputDecoration(
                      labelText: 'Deskripsi 1*',
                      border: OutlineInputBorder(),
                    ),
                    maxLines: 3,
                  ),
                  const SizedBox(height: 15),
                  TextField(
                    controller: _deskripsi2Controller,
                    decoration: const InputDecoration(
                      labelText: 'Deskripsi 2*',
                      border: OutlineInputBorder(),
                    ),
                    maxLines: 3,
                  ),
                  const SizedBox(height: 15),
                  TextField(
                    controller: _namaGuru1Controller,
                    decoration: const InputDecoration(
                      labelText: 'Nama Guru 1*',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 15),
                  TextField(
                    controller: _namaGuru2Controller,
                    decoration: const InputDecoration(
                      labelText: 'Nama Guru 2*',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 15),
                  TextField(
                    controller: _noTelp1Controller,
                    decoration: const InputDecoration(
                      labelText: 'Nomor Telepon Guru 1',
                      border: OutlineInputBorder(),
                    ),
                    keyboardType: TextInputType.phone,
                  ),
                  const SizedBox(height: 15),
                  TextField(
                    controller: _noTelp2Controller,
                    decoration: const InputDecoration(
                      labelText: 'Nomor Telepon Guru 2',
                      border: OutlineInputBorder(),
                    ),
                    keyboardType: TextInputType.phone,
                  ),
                  const SizedBox(height: 25),
                  ElevatedButton(
                    onPressed: _isLoading ? null : updatePPDB,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.teal,
                      foregroundColor: Colors.white,
                      minimumSize: const Size(double.infinity, 50),
                    ),
                    child: _isLoading
                        ? const CircularProgressIndicator(color: Colors.white)
                        : const Text('UPDATE SEMUA DATA'),
                  ),
                ],
              ),
            ),
    );
  }
}
