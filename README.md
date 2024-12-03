# **Dokumentasi Website E-Commerce Notasi/Tablature Gitar**

Selamat datang di dokumentasi untuk **Website E-Commerce Notasi/Tablature Gitar**. Website ini dirancang khusus untuk membantu musisi menjual dan membeli tablature/aransemen gitar seperti fingerstyle atau gitar klasik dalam format PDF. Berikut adalah daftar fitur fitur dari website.

---

## **Fitur Website**

### **1. Halaman Utama (Homepage)**

- **Produk Terbaru**
  - Menampilkan hingga 9 produk terbaru.
  - Menggunakan carousel atau grid layout untuk tampilan menarik.

---

### **2. Eksplorasi (Explore)**

- **Pencarian Produk**

  - Kolom pencarian.

- **Filter & Urutkan**

  - **Filter:**
    - Tingkat Kesulitan: "Beginner," "Intermediate," "Advanced."
  - **Urutkan:**
    - Harga: Dari termurah ke termahal atau sebaliknya.

- **Daftar Produk**

  - Menampilkan hasil pencarian, filter, dan urutan dalam bentuk grid.
  - Setiap produk mencantumkan:
    - Gambar, nama, harga, nama, dan link untuk melihat detail.

- **Detail Produk**
  - Menampilkan informasi produk:
    - Gambar, judul, deskripsi, kategori, tingkat kesulitan, harga.
    - Tombol **"Add to Cart."**
    - **Produk Serupa:** Rekomendasi produk berdasarkan kategori.

---

### **3. Jual Produk (Start Selling)**

- **Dashboard Analitik**

  - Menampilkan data seperti:
    - Total penjualan, produk terjual, dan total pendapatan.

- **Produk yang Dibeli**

  - Daftar produk yang telah dibeli oleh pengguna.
  - Fitur:
    - Tombol Link download dilindungi.

- **Produk Anda**

  - Daftar produk yang telah diunggah oleh penjual.
  - Fitur:
    - Tambah, edit, dan hapus produk.

- **Tambah Produk**

  - Form untuk menambahkan produk baru dengan input seperti:
    - Judul, link gambar, deskripsi, harga, tingkat kesulitan, kategori, dan link PDF.

- **Hapus Produk**
  - Menghapus produk dari daftar penjual.

---

### **4. Keranjang Belanja (Cart)**

- Menampilkan produk yang telah ditambahkan pengguna ke keranjang.
- Fitur:
  - Hapus produk dari keranjang (produk tidak bisa diduplikasi).
  - Menampilkan total produk dan total harga.

---

### **5. Checkout**

- Proses checkout meliputi:

  - Simulasi checkout.
  - Email konfirmasi berisi link download PDF setelah pembayaran berhasil.

- **Catatan:** Integrasi payment gateway masih dalam tahap pengembangan.

---

### **6. Autentikasi (Authentication)**

- **Registrasi & Login Pengguna**
  - Menggunakan **Clerk** dengan opsi login melalui email/password atau media sosial.
- **Akses Berdasarkan Role**
  - **Pembeli:** Dapat membeli dan mendownload produk.
  - **Penjual:** Dapat mengelola produk dan melihat analitik penjualan.

---

## **Teknologi yang Digunakan**

- **Frontend:** React.js dengan Next.js (Hooks, State Management).
- **Backend:** Node.js dan Express.js.
- **Database:** MongoDB dengan Mongoose.
- **Autentikasi:** Clerk untuk login dan role-based access.
- **Email Service:** (dalam pengembangan).
- **Payment Gateway:** (sedang dikembangkan).

---

## **Fitur yang Akan Dikembangkan**

- Integrasi payment gateway.
- Email konfirmasi

---
