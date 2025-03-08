// Mengimpor Utils dari file utils.js
import Utils from '../script/utils.js';
// Mengimpor NotesApi dari file remote/notes-api.js
import NotesApi from '../script/data/remote/notes-api.js';

// Mendefinisikan objek home
const home = {
    // Mendeklarasikan elemen kontainer daftar catatan
    noteListContainerElement: document.querySelector('#noteListContainer'),
    // Membuat elemen daftar catatan
    noteListElement: document.createElement('note-list'),
    // Membuat elemen daftar catatan yang diarsipkan
    archivedNoteListElement: document.createElement('note-list'),
    // Membuat elemen loading
    loadingElement: document.createElement('div'),

    // Fungsi inisialisasi
    init() {
        // Menambahkan event listener untuk event 'note-deleted'
        this.noteListContainerElement.addEventListener(
            'note-deleted',
            (event) => {
                this.showAllNotes();
            }
        );
        // Menambahkan event listener untuk event 'note-archived'
        this.noteListContainerElement.addEventListener(
            'note-archived',
            (event) => {
                this.showAllNotes();
            }
        );
        // Menambahkan event listener untuk event 'note-unarchived'
        this.noteListContainerElement.addEventListener(
            'note-unarchived',
            (event) => {
                this.showAllNotes();
            }
        );

        // Tambahkan elemen daftar catatan dan catatan yang diarsipkan terlebih dahulu
        this.noteListContainerElement.appendChild(this.noteListElement);
        this.noteListContainerElement.appendChild(this.archivedNoteListElement);

        // Tambahkan elemen judul untuk catatan
        const noteListTitleElement = document.createElement('h2');
        noteListTitleElement.textContent = 'All Notes';
        this.noteListContainerElement.insertBefore(noteListTitleElement, this.noteListElement);

        // Tambahkan elemen judul untuk catatan yang diarsipkan
        const archivedNoteListTitleElement = document.createElement('h2');
        archivedNoteListTitleElement.textContent = 'Archived Notes';
        this.noteListContainerElement.insertBefore(archivedNoteListTitleElement, this.archivedNoteListElement);

        // Menampilkan semua catatan
        this.showAllNotes();
    },

    // Fungsi untuk menampilkan semua catatan
    showAllNotes: async function (query) {
        this.showLoading();
        try {
            // Mengambil semua catatan
            const allNotes = await NotesApi.getAllNotes(query);
            // Mengambil semua catatan yang diarsipkan
            const archivedNotes = await NotesApi.getArchivedNotes();

            // Menampilkan hasil catatan
            this.displayResult(allNotes, this.noteListElement);
            // Menampilkan hasil catatan yang diarsipkan
            this.displayResult(archivedNotes, this.archivedNoteListElement);

            // Menampilkan daftar catatan
            this.showNoteList();
        } catch (error) {
            console.error('Error fetching notes:', error);
            alert('Gagal memuat catatan.');
        } finally {
            this.hideLoading();
        }
    },

    // Fungsi untuk menampilkan hasil catatan
    displayResult: function (notes, element) {
        // Membuat elemen item catatan
        const noteItemElements = notes.map((note) => {
            const noteItemElement = document.createElement('note-item');
            noteItemElement.note = note;
            return noteItemElement;
        });

        // Mengosongkan elemen
        Utils.emptyElement(element);
        // Menambahkan elemen item catatan ke dalam elemen
        element.append(...noteItemElements);
    },

    // Fungsi untuk menampilkan daftar catatan
    showNoteList: function () {
        // Menyembunyikan semua elemen anak dari kontainer daftar catatan
        Array.from(this.noteListContainerElement.children).forEach(
            (element) => {
                Utils.hideElement(element);
            }
        );

        // Menampilkan judul dan elemen daftar catatan
        Utils.showElement(this.noteListContainerElement.querySelector('h2'));
        Utils.showElement(this.noteListElement);

        // Menampilkan judul dan elemen daftar catatan yang diarsipkan
        Utils.showElement(this.noteListContainerElement.querySelector('h2:nth-of-type(2)'));
        Utils.showElement(this.archivedNoteListElement);
    },

    // Fungsi untuk menampilkan elemen loading
    showLoading: function () {
        this.loadingElement.textContent = 'Loading...';
        this.noteListContainerElement.parentElement.insertBefore(
            this.loadingElement,
            this.noteListContainerElement
        );
    },

    // Fungsi untuk menyembunyikan elemen loading
    hideLoading: function () {
        if (this.loadingElement.parentElement) {
            this.loadingElement.parentElement.removeChild(this.loadingElement);
        }
    },
};

// Inisialisasi objek home
home.init();
// Mengekspor objek home sebagai default export
export default home;
