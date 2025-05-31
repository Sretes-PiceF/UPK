import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../../widgets/sidebar.dart'; // pastikan path sesuai struktur foldermu
import 'edit_profile.dart';

class Profile {
  final int id;
  final int profileGuru;
  final int profileSiswa;
  final int jumlahPrestasi;
  final int jumlahEkstrakulikuler;

  Profile({
    required this.id,
    required this.profileGuru,
    required this.profileSiswa,
    required this.jumlahPrestasi,
    required this.jumlahEkstrakulikuler,
  });

  factory Profile.fromJson(Map<String, dynamic> json) {
    return Profile(
      id: int.tryParse(json['id'].toString()) ?? 0,
      profileGuru: int.tryParse(json['profile_guru'].toString()) ?? 0,
      profileSiswa: int.tryParse(json['profile_siswa'].toString()) ?? 0,
      jumlahPrestasi: int.tryParse(json['jumlah_prestasi'].toString()) ?? 0,
      jumlahEkstrakulikuler:
          int.tryParse(json['jumlah_ekstrakulikuler'].toString()) ?? 0,
    );
  }
}

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  late Future<List<Profile>> _profileData;

  Future<List<Profile>> fetchProfileData() async {
    final response = await http.get(
      Uri.parse("http://localhost:8000/api/profile"),
    );

    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);

      if (jsonData['data'] is List) {
        final List<dynamic> data = jsonData['data'];
        return data
            .map((item) => Profile.fromJson(item as Map<String, dynamic>))
            .toList();
      } else {
        throw Exception("Data format is incorrect");
      }
    } else {
      throw Exception("Failed to load profile data");
    }
  }

  @override
  void initState() {
    super.initState();
    _profileData = fetchProfileData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Sidebar(),
      appBar: AppBar(title: const Text('Profil'), backgroundColor: Colors.teal),
      backgroundColor: Colors.grey[100],
      body: FutureBuilder<List<Profile>>(
        future: _profileData,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Terjadi kesalahan: ${snapshot.error}'));
          }

          final profiles = snapshot.data ?? [];

          if (profiles.isEmpty) {
            return const Center(child: Text('Tidak ada data profil'));
          }

          return Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Container(
                  decoration: const BoxDecoration(
                    border: Border(
                      bottom: BorderSide(color: Colors.grey, width: 1),
                    ),
                  ),
                  child: DataTable(
                    columnSpacing: 20,
                    columns: const [
                      DataColumn(label: Center(child: Text('No'))),
                      DataColumn(label: Center(child: Text('Data Guru'))),
                      DataColumn(label: Center(child: Text('Data Siswa'))),
                      DataColumn(label: Center(child: Text('Prestasi'))),
                      DataColumn(label: Center(child: Text('Ekstrakulikuler'))),
                      DataColumn(label: Center(child: Text('Aksi'))),
                    ],
                    rows: profiles.asMap().entries.map((entry) {
                      final index = entry.key;
                      final profile = entry.value;

                      return DataRow(
                        cells: [
                          DataCell(
                            Container(
                              alignment: Alignment.centerLeft,
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 12,
                              ),
                              child: Text('${index + 1}'),
                            ),
                          ),
                          DataCell(
                            Container(
                              alignment: Alignment.centerLeft,
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 12,
                              ),
                              child: Text('${profile.profileGuru}'),
                            ),
                          ),
                          DataCell(
                            Container(
                              alignment: Alignment.centerLeft,
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 1,
                              ),
                              child: Text('${profile.profileSiswa}'),
                            ),
                          ),
                          DataCell(
                            Container(
                              alignment: Alignment.centerLeft,
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 12,
                              ),
                              child: Text('${profile.jumlahPrestasi}'),
                            ),
                          ),
                          DataCell(
                            Container(
                              alignment: Alignment.centerLeft,
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 12,
                              ),
                              child: Text('${profile.jumlahEkstrakulikuler}'),
                            ),
                          ),
                          DataCell(
                            Align(
                              alignment: Alignment.centerLeft,
                              child: IconButton(
                                icon: const Icon(
                                  Icons.edit,
                                  color: Colors.orange,
                                ),
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) =>
                                          UpdateProfilePage(id: profile.id),
                                    ),
                                  );
                                },
                              ),
                            ),
                          ),
                        ],
                      );
                    }).toList(),
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
