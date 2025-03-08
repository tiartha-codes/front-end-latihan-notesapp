// Mendefinisikan objek Utils
const Utils = {
    // Fungsi untuk mengosongkan elemen
    emptyElement: function(element) {
        // Menghapus semua child dari elemen
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    },

    // Fungsi untuk menyembunyikan elemen
    hideElement: function(element) {
        // Mengatur display elemen menjadi 'none'
        element.style.display = 'none';
    },

    // Fungsi untuk menampilkan elemen
    showElement: function(element) {
        // Mengatur display elemen menjadi 'block'
        element.style.display = 'block';
    }
};

// Mengekspor objek Utils sebagai default export
export default Utils;