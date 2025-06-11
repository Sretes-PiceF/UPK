import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../../widgets/sidebar.dart';
import './profile_page.dart';

class UpdateProfilePage extends StatefulWidget {
  final int id;

  const UpdateProfilePage({super.key, required this.id});

  @override
  State<UpdateProfilePage> createState() => _UpdateProfilePageState();
}

class _UpdateProfilePageState extends State<UpdateProfilePage> {
  final _guruController = TextEditingController();
  final _siswaController = TextEditingController();
  final _prestasiController = TextEditingController();
  final _ekstraController = TextEditingController();

  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    fetchProfile();
  }

  Future<void> fetchProfile() async {
    final response = await http.get(
      Uri.parse('http://localhost:8000/api/profile/${widget.id}'),
    );

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      setState(() {
        _guruController.text = data['profile_guru'].toString();
        _siswaController.text = data['profile_siswa'].toString();
        _prestasiController.text = data['jumlah_prestasi'].toString();
        _ekstraController.text = data['jumlah_ekstrakulikuler'].toString();
      });
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Gagal memuat data profil')));
    }
  }

  Future<void> updateProfile() async {
    setState(() {
      _isLoading = true;
    });

    try {
      final response = await http.put(
        Uri.parse('http://localhost:8000/api/profile/${widget.id}'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'profile_guru': int.tryParse(_guruController.text) ?? 0,
          'profile_siswa': int.tryParse(_siswaController.text) ?? 0,
          'jumlah_prestasi': int.tryParse(_prestasiController.text) ?? 0,
          'jumlah_ekstrakulikuler': int.tryParse(_ekstraController.text) ?? 0,
        }),
      );

      if (response.statusCode == 200) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Profil berhasil diperbarui!')),
        );
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (_) => const ProfilePage()),
        );
      } else {
        throw Exception('Gagal mengupdate profil: ${response.statusCode}');
      }
    } catch (e) {
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFAF3F8), // background seperti di gambar
      drawer: const Sidebar(),
      appBar: AppBar(
        title: const Text('Update Profil'),
        backgroundColor: Colors.teal,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 30),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildMinimalInput('Jumlah Guru', _guruController),
            const SizedBox(height: 20),
            _buildMinimalInput('Jumlah Siswa', _siswaController),
            const SizedBox(height: 20),
            _buildMinimalInput('Jumlah Prestasi', _prestasiController),
            const SizedBox(height: 20),
            _buildMinimalInput('Jumlah Ekstrakulikuler', _ekstraController),
            const SizedBox(height: 40),
            Center(
              child: ElevatedButton(
                onPressed: _isLoading ? null : updateProfile,
                style: ElevatedButton.styleFrom(
                  elevation: 0,
                  backgroundColor: const Color(0xFFE8DFF5),
                  foregroundColor: Colors.purple,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 40,
                    vertical: 12,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
                child: _isLoading
                    ? const CircularProgressIndicator(color: Colors.purple)
                    : const Text('Update'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Widget Input Minimalis
  Widget _buildMinimalInput(String label, TextEditingController controller) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 14)),
        TextField(
          controller: controller,
          decoration: const InputDecoration(
            isDense: true,
            contentPadding: EdgeInsets.only(bottom: 5),
            border: UnderlineInputBorder(),
            focusedBorder: UnderlineInputBorder(
              borderSide: BorderSide(color: Colors.purple),
            ),
          ),
          keyboardType: TextInputType.number,
          style: const TextStyle(fontSize: 16),
        ),
      ],
    );
  }
}
