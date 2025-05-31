import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../../widgets/sidebar.dart';

class Prestasi {
  final String prestasiId;
  final String juara;
  final String namaSiswa;
  final String deskripsi;
  final String? urlGambar;

  Prestasi({
    required this.prestasiId,
    required this.juara,
    required this.namaSiswa,
    required this.deskripsi,
    this.urlGambar,
  });

  factory Prestasi.fromJson(Map<String, dynamic> json) {
    return Prestasi(
      prestasiId: json['prestasi_id'],
      juara: json['prestasi_juara'],
      namaSiswa: json['prestasi_namasiswa'],
      deskripsi: json['prestasi_deskripsi'],
      urlGambar: json['prestasi_url_gambar'],
    );
  }
}

class PrestasiPage extends StatefulWidget {
  const PrestasiPage({super.key});

  @override
  State<PrestasiPage> createState() => _PrestasiPageState();
}

class _PrestasiPageState extends State<PrestasiPage> {
  late Future<List<Prestasi>> _prestasiData;

  @override
  void initState() {
    super.initState();
    _prestasiData = fetchPrestasiData();
  }

  Future<List<Prestasi>> fetchPrestasiData() async {
    final response = await http.get(
      Uri.parse("http://localhost:8000/api/prestasi"),
    );

    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);

      if (jsonData['data'] is List) {
        return (jsonData['data'] as List)
            .map((item) => Prestasi.fromJson(item))
            .toList();
      } else {
        throw Exception("Format data tidak sesuai");
      }
    } else {
      throw Exception("Gagal mengambil data prestasi");
    }
  }

  Future<void> deletePrestasi(String id) async {
    final response = await http.delete(
      Uri.parse("http://localhost:8000/api/prestasi/$id"),
    );

    if (response.statusCode == 200) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("Data berhasil dihapus")));
      setState(() {
        _prestasiData = fetchPrestasiData();
      });
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("Gagal menghapus data")));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Sidebar(),
      appBar: AppBar(
        title: const Text('Prestasi'),
        backgroundColor: Colors.teal,
      ),
      backgroundColor: Colors.grey[100],
      body: FutureBuilder<List<Prestasi>>(
        future: _prestasiData,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Terjadi kesalahan: ${snapshot.error}'));
          }

          final data = snapshot.data ?? [];

          if (data.isEmpty) {
            return const Center(child: Text('Tidak ada data prestasi'));
          }

          return ListView.builder(
            padding: const EdgeInsets.all(16.0),
            itemCount: data.length,
            itemBuilder: (context, index) {
              final prestasi = data[index];
              return Card(
                margin: const EdgeInsets.symmetric(vertical: 8),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                elevation: 2,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${index + 1}.',
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Juara: ${prestasi.juara}',
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            const SizedBox(height: 6),
                            Text('Nama Siswa: ${prestasi.namaSiswa}'),
                            const SizedBox(height: 6),
                            Text(
                              'Deskripsi: ${prestasi.deskripsi}',
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: 6),
                            prestasi.urlGambar != null
                                ? ClipRRect(
                                    borderRadius: BorderRadius.circular(8),
                                    child: Image.network(
                                      'http://localhost:8000/storage/images/prestasi/${prestasi.urlGambar}',
                                      width: 100,
                                      height: 100,
                                      fit: BoxFit.cover,
                                      errorBuilder:
                                          (context, error, stackTrace) {
                                            return const Text(
                                              'Gambar tidak ditemukan',
                                            );
                                          },
                                    ),
                                  )
                                : const Text("Tidak ada gambar"),
                          ],
                        ),
                      ),
                      Column(
                        children: [
                          IconButton(
                            icon: const Icon(Icons.edit, color: Colors.orange),
                            onPressed: () {
                              // Navigasi ke halaman edit prestasi
                            },
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete, color: Colors.red),
                            onPressed: () {
                              showDialog(
                                context: context,
                                builder: (_) => AlertDialog(
                                  title: const Text("Konfirmasi"),
                                  content: const Text(
                                    "Yakin ingin menghapus data ini?",
                                  ),
                                  actions: [
                                    TextButton(
                                      onPressed: () => Navigator.pop(context),
                                      child: const Text("Batal"),
                                    ),
                                    ElevatedButton(
                                      onPressed: () {
                                        Navigator.pop(context);
                                        deletePrestasi(prestasi.prestasiId);
                                      },
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: Colors.red,
                                      ),
                                      child: const Text("Hapus"),
                                    ),
                                  ],
                                ),
                              );
                            },
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
