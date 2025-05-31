import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'profile_page.dart';
import '../../widgets/sidebar.dart';

class UpdateProfilePage extends StatefulWidget {
  final int id;

  const UpdateProfilePage({super.key, required this.id});

  @override
  State<UpdateProfilePage> createState() => _UpdateProfilePageState();
}

class _UpdateProfilePageState extends State<UpdateProfilePage> {
  final TextEditingController _guruController = TextEditingController();
  final TextEditingController _siswaController = TextEditingController();
  bool _focusGuru = false;
  bool _focusSiswa = false;

  Future<void> fetchData() async {
    final response = await http.get(
      Uri.parse('http://localhost:8000/api/profile/${widget.id}'),
    );
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      setState(() {
        _guruController.text = data['profile_guru'].toString();
        _siswaController.text = data['profile_siswa'].toString();
      });
    }
  }

  Future<void> updateProfile() async {
    final response = await http.put(
      Uri.parse('http://localhost:8000/api/profile/${widget.id}'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'profile_guru': _guruController.text,
        'profile_siswa': _siswaController.text,
      }),
    );

    if (response.statusCode == 200) {
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Berhasil diupdate!')));

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const ProfilePage()),
      );
    } else {
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Gagal update data!')));
    }
  }

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Widget _buildAnimatedInput({
    required String label,
    required TextEditingController controller,
    required bool focus,
    required void Function(bool) onFocusChange,
  }) {
    return Focus(
      onFocusChange: onFocusChange,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        margin: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          color: Colors.grey[200],
          borderRadius: BorderRadius.circular(12),
          boxShadow: focus
              ? [
                  BoxShadow(
                    color: Colors.teal.withOpacity(0.3),
                    blurRadius: 10,
                    offset: const Offset(0, 4),
                  ),
                ]
              : [],
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
          child: Stack(
            children: [
              AnimatedPositioned(
                duration: const Duration(milliseconds: 300),
                top: focus || controller.text.isNotEmpty ? 0 : 18,
                left: 0,
                child: Text(
                  label,
                  style: TextStyle(
                    fontSize: focus || controller.text.isNotEmpty ? 12 : 16,
                    color: Colors.grey[700],
                  ),
                ),
              ),
              TextField(
                controller: controller,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.only(top: 20),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Sidebar(),
      appBar: AppBar(
        title: const Text('Update Data Profil'),
        backgroundColor: Colors.teal,
      ),
      backgroundColor: Colors.grey[100],
      body: Center(
        child: Container(
          width: 500,
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Colors.grey[200],
            borderRadius: BorderRadius.circular(24),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              _buildAnimatedInput(
                label: 'Jumlah Guru',
                controller: _guruController,
                focus: _focusGuru,
                onFocusChange: (value) => setState(() => _focusGuru = value),
              ),
              _buildAnimatedInput(
                label: 'Jumlah Siswa',
                controller: _siswaController,
                focus: _focusSiswa,
                onFocusChange: (value) => setState(() => _focusSiswa = value),
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  minimumSize: const Size.fromHeight(50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                onPressed: updateProfile,
                child: const Text(
                  'Update',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
