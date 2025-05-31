import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../../widgets/sidebar.dart';
import '../ekstrakulikuler/store/create_ekstrakulikuler.dart';

class Ekstrakulikuler {
  final String id;
  final String judul;
  final String deskripsi;
  final String? gambar;

  Ekstrakulikuler({
    required this.id,
    required this.judul,
    required this.deskripsi,
    this.gambar,
  });

  factory Ekstrakulikuler.fromJson(Map<String, dynamic> json) {
    return Ekstrakulikuler(
      id: json['ekstrakulikuler_id'],
      judul: json['ekstrakulikuler_judul'],
      deskripsi: json['ekstrakulikuler_deskripsi'],
      gambar: json['ekstrakulikuler_url_gambar'],
    );
  }
}

class EkstrakulikulerPage extends StatefulWidget {
  const EkstrakulikulerPage({super.key});

  @override
  State<EkstrakulikulerPage> createState() => _EkstrakulikulerPageState();
}

class _EkstrakulikulerPageState extends State<EkstrakulikulerPage> {
  late Future<List<Ekstrakulikuler>> _ekstraData;

  @override
  void initState() {
    super.initState();
    _ekstraData = fetchEkstrakulikuler();
  }

  Future<List<Ekstrakulikuler>> fetchEkstrakulikuler() async {
    final response = await http.get(
      Uri.parse("http://localhost:8000/api/ekstrakulikuler"),
    );

    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      final List<dynamic> dataList = jsonData['data'];

      return dataList.map((item) => Ekstrakulikuler.fromJson(item)).toList();
    } else {
      throw Exception("Gagal memuat data ekstrakurikuler");
    }
  }

  Future<void> deleteEkstrakulikuler(String id) async {
    final response = await http.delete(
      Uri.parse("http://localhost:8000/api/ekstrakulikuler/$id"),
    );

    if (response.statusCode == 200) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("Data berhasil dihapus")));
      setState(() {
        _ekstraData = fetchEkstrakulikuler();
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
        title: const Text('Ekstrakurikuler'),
        backgroundColor: Colors.teal,
      ),
      backgroundColor: Colors.grey[100],
      body: FutureBuilder<List<Ekstrakulikuler>>(
        future: _ekstraData,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Terjadi kesalahan: \${snapshot.error}'));
          }

          final data = snapshot.data ?? [];

          if (data.isEmpty) {
            return const Center(child: Text('Tidak ada data ekstrakurikuler'));
          }

          return ListView.builder(
            padding: const EdgeInsets.all(16.0),
            itemCount: data.length,
            itemBuilder: (context, index) {
              final ekstra = data[index];
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
                              'Judul: ${ekstra.judul}',
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              'Deskripsi: ${ekstra.deskripsi}',
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: 6),
                            ekstra.gambar != null
                                ? ClipRRect(
                                    borderRadius: BorderRadius.circular(8),
                                    child: Image.network(
                                      'http://localhost:8000/storage/images/ekstrakulikuler/${ekstra.gambar}',
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
                              // Navigasi ke halaman edit bisa ditambahkan di sini
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
                                        deleteEkstrakulikuler(ekstra.id);
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
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.blue,
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const CreateEkstrakulikulerPage(),
            ),
          ).then((_) {
            // Refresh data setelah kembali dari halaman create
            setState(() {
              _ekstraData = fetchEkstrakulikuler();
            });
          });
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
