# Khurin Zakiyyah — Portfolio

Portofolio pribadi Khurin Zakiyyah, lulusan Instrumentation & Control Engineering (Gadjah Mada University). Dibuat dengan HTML, CSS, dan JavaScript murni (tanpa framework), tema warna pink-hitam.

## Struktur file
```
├── index.html          # Halaman utama
├── style.css           # Semua styling (tema pink-hitam)
├── script.js           # Interaksi (nav, animasi, role rotator)
└── assets/
    └── img/
        ├── profile.jpg          # Foto profil (sudah ada)
        ├── exp-clsentosa.jpg    # (opsional) foto pengalaman AGV — tambahkan sendiri
        └── exp-pln.jpg          # (opsional) foto pengalaman PLN — tambahkan sendiri
```

Jika foto `exp-clsentosa.jpg` / `exp-pln.jpg` belum ada, halaman otomatis menampilkan placeholder — tidak akan error.

## Cara publish ke GitHub Pages (gratis)

1. **Buat repository baru** di GitHub, misalnya bernama `portfolio` (bisa publik).
2. **Upload semua file** di folder ini ke repository tersebut (drag & drop lewat web GitHub, atau via git):
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/USERNAME/portfolio.git
   git push -u origin main
   ```
3. Buka **Settings → Pages** di repository tersebut.
4. Di bagian **Branch**, pilih `main` dan folder `/ (root)`, lalu klik **Save**.
5. Tunggu 1–2 menit, situs akan aktif di:
   `https://USERNAME.github.io/portfolio/`

## Yang bisa disesuaikan lagi
- Ganti/tambahkan foto kegiatan di `assets/img/` untuk bagian Experience.
- Update link LinkedIn/GitHub di `index.html` bila diperlukan.
- Warna tema bisa diubah lewat variabel `--pink`, `--bg`, dll di bagian atas `style.css`.
