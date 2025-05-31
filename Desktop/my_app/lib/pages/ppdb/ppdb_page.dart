import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../../widgets/sidebar.dart';

class PPDBItem {
  final String ppdbId;
  final String deskripsi1;
  final String deskripsi2;
  final String namaGuru1;
  final String namaGuru2;
  final String noGuru1;
  final String noGuru2;
  final String? urlGambar;

  PPDBItem({
    required this.ppdbId,
    required this.deskripsi1,
    required this.deskripsi2,
    required this.namaGuru1,
    required this.namaGuru2,
    required this.noGuru1,
    required this.noGuru2,
    this.urlGambar,
  });

  factory PPDBItem.fromJson(Map<String, dynamic> json) {
    return PPDBItem(
      ppdbId: json['ppdb_id']?.toString() ?? '0',
      deskripsi1: json['ppdb_deskripsi1'] ?? '',
      deskripsi2: json['ppdb_deskripsi2'] ?? '',
      namaGuru1: json['ppdb_namaguru_1'] ?? '',
      namaGuru2: json['ppdb_namaguru_2'] ?? '',
      noGuru1: json['ppdb_notelp_1'] ?? '',
      noGuru2: json['ppdb_notelp_2'] ?? '',
      urlGambar: json['ppdb_url_gambar'],
    );
  }
}

class PPDBPage extends StatefulWidget {
  const PPDBPage({super.key});

  @override
  State<PPDBPage> createState() => _PPDBPageState();
}

class _PPDBPageState extends State<PPDBPage>
    with SingleTickerProviderStateMixin {
  List<PPDBItem> ppdbData = [];
  bool isLoading = true;
  String errorMessage = '';
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    fetchPPDB();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> fetchPPDB() async {
    try {
      final response = await http.get(
        Uri.parse('http://localhost:8000/api/ppdb'),
        headers: {'Accept': 'application/json'},
      );

      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        List<dynamic> data = [];

        if (jsonData is Map && jsonData['data'] is List) {
          data = jsonData['data'];
        } else if (jsonData is List) {
          data = jsonData;
        } else {
          throw Exception('Format data tidak valid');
        }

        if (mounted) {
          setState(() {
            ppdbData = data.map((item) => PPDBItem.fromJson(item)).toList();
            isLoading = false;
          });
        }
      } else {
        throw Exception('Gagal memuat data: ${response.statusCode}');
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          isLoading = false;
          errorMessage = 'Error: ${e.toString()}';
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final gambarData = ppdbData
        .where((item) => item.urlGambar != null && item.urlGambar!.isNotEmpty)
        .toList();

    return Scaffold(
      drawer: const Sidebar(),
      appBar: AppBar(
        title: const Text('PPDB'),
        backgroundColor: Colors.teal,
        bottom: TabBar(
          controller: _tabController,
          labelColor: Colors.white,
          unselectedLabelColor: Colors.white70,
          tabs: const [
            Tab(text: 'Data PPDB'),
            Tab(text: 'Gambar PPDB'),
          ],
        ),
      ),
      backgroundColor: Colors.grey[100],
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : errorMessage.isNotEmpty
          ? Center(child: Text(errorMessage))
          : ppdbData.isEmpty
          ? const Center(child: Text("Tidak ada data tersedia"))
          : TabBarView(
              controller: _tabController,
              children: [
                _buildDataPPDBView(ppdbData.first),
                _buildGambarPPDBView(gambarData),
              ],
            ),
      floatingActionButton: AnimatedBuilder(
        animation: _tabController,
        builder: (context, child) {
          return _tabController.index == 1
              ? FloatingActionButton(
                  onPressed: () {
                    // Tambah gambar baru
                  },
                  backgroundColor: Colors.teal,
                  child: const Icon(Icons.add, color: Colors.white),
                )
              : const SizedBox.shrink();
        },
      ),
    );
  }

  Widget _buildDataPPDBView(PPDBItem data) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Card(
            elevation: 3,
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildDataRow('Deskripsi 1', data.deskripsi1),
                  const Divider(),
                  _buildDataRow('Deskripsi 2', data.deskripsi2),
                  const Divider(),
                  _buildDataRow('Guru 1', data.namaGuru1),
                  const Divider(),
                  _buildDataRow('Guru 2', data.namaGuru2),
                  const Divider(),
                  _buildDataRow('No Telp 1', data.noGuru1),
                  const Divider(),
                  _buildDataRow('No Telp 2', data.noGuru2),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          Align(
            alignment: Alignment.centerRight,
            child: ElevatedButton.icon(
              onPressed: () {
                // Edit data
              },
              icon: const Icon(Icons.edit, size: 18),
              label: const Text('Edit Data'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.orange,
                foregroundColor: Colors.white,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDataRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 120,
            child: Text(
              label,
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Text(
              value.isNotEmpty ? value : '-',
              style: const TextStyle(fontSize: 16),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGambarPPDBView(List<PPDBItem> gambarData) {
    if (gambarData.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            IconButton(
              icon: const Icon(Icons.add_circle, size: 50, color: Colors.teal),
              onPressed: () {
                // Tambah gambar baru
              },
            ),
            const SizedBox(height: 10),
            const Text(
              'Tidak ada gambar. Tap + untuk menambahkan',
              style: TextStyle(fontSize: 16),
            ),
          ],
        ),
      );
    }

    return Padding(
      padding: const EdgeInsets.all(16),
      child: GridView.builder(
        shrinkWrap: true,
        physics: const BouncingScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 4,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
          childAspectRatio: 0.8,
        ),
        itemCount: gambarData.length,
        itemBuilder: (context, index) {
          final item = gambarData[index];
          return Card(
            elevation: 3,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
            child: Column(
              children: [
                Expanded(
                  child: ClipRRect(
                    borderRadius: const BorderRadius.vertical(
                      top: Radius.circular(10),
                    ),
                    child: item.urlGambar != null
                        ? Image.network(
                            'http://localhost:8000/storage/images/ppdb/${item.urlGambar}',
                            fit: BoxFit.cover,
                            width: double.infinity,
                            loadingBuilder: (context, child, progress) =>
                                progress == null
                                ? child
                                : const Center(
                                    child: CircularProgressIndicator(),
                                  ),
                            errorBuilder: (context, error, stackTrace) =>
                                const Center(child: Icon(Icons.broken_image)),
                          )
                        : const Center(child: Icon(Icons.image_not_supported)),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.edit, size: 18),
                        color: Colors.orange,
                        onPressed: () {
                          // Edit gambar
                        },
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete, size: 18),
                        color: Colors.red,
                        onPressed: () {
                          // Hapus gambar
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
