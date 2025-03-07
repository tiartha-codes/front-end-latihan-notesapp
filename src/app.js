// Mengimpor semua komponen yang ada di folder components
import './script/components/index.js';

// Mengimpor halaman home
import home from './view/home.js';

// Menambahkan event listener untuk DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Menjalankan fungsi showAllNotes() dari objek home ketika halaman sudah selesai dimuat
    home.showAllNotes();
});