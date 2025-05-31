import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

// Import semua halaman yang ingin dijadikan tujuan
import '../pages/profile/profile_page.dart';
import '../pages/ppdb/ppdb_page.dart';
import '../pages/prestasi/prestasi_page.dart';
import '../pages/ekstrakulikuler/ekstrakulikuler_page.dart';
import '../pages/login/login_page.dart';

class Sidebar extends StatelessWidget {
  const Sidebar({super.key});

  Future<void> _handleLogout(BuildContext context) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('access_token');
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (_) => const LoginPage()),
      (route) => false,
    );
  }

  void _navigateTo(BuildContext context, String route) {
    Navigator.pop(context); // Tutup drawer

    Widget page;
    switch (route) {
      case 'profile':
        page = const ProfilePage();
        break;
      case 'ppdb':
        page = const PPDBPage();
        break;
      case 'prestasi':
        page = const PrestasiPage();
        break;
      case 'ekstrakulikuler':
        page = const EkstrakulikulerPage();
        break;
      default:
        return;
    }

    Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => page));
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: Colors.teal[700],
      child: Column(
        children: [
          const SizedBox(height: 40),
          Image.asset('assets/images/logo.png', width: 80, height: 80),
          const SizedBox(height: 20),
          _buildNavButton(context, label: 'Profil', route: 'profile'),
          _buildNavButton(context, label: 'PPDB', route: 'ppdb'),
          _buildNavButton(context, label: 'Prestasi', route: 'prestasi'),
          _buildNavButton(
            context,
            label: 'Ekstrakulikuler',
            route: 'ekstrakulikuler',
          ),
          _buildNavButton(
            context,
            label: 'Logout',
            onTap: () => _handleLogout(context),
          ),
          const Spacer(),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Image.asset(
              'assets/images/logo_bawah.png',
              width: 64,
              height: 64,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNavButton(
    BuildContext context, {
    required String label,
    String? route,
    VoidCallback? onTap,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6.0, horizontal: 12.0),
      child: SizedBox(
        width: double.infinity,
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.red[500],
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(vertical: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
          onPressed: onTap ?? () => _navigateTo(context, route!),
          child: Text(label, textAlign: TextAlign.center),
        ),
      ),
    );
  }
}
