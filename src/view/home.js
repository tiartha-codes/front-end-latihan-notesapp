import Utils from '../script/utils.js';
import NotesApi from '../script/data/remote/notes-api.js';

const home = {
    noteListContainerElement: document.querySelector('#noteListContainer'),
    noteListElement: document.createElement('note-list'),
    archivedNoteListElement: document.createElement('note-list'),
    loadingElement: document.createElement('div'),

    init() {
        this.noteListContainerElement.addEventListener(
            'note-deleted',
            (event) => {
                this.showAllNotes();
            }
        );
        this.noteListContainerElement.addEventListener(
            'note-archived',
            (event) => {
                this.showAllNotes();
            }
        );
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

        this.showAllNotes();
    },

    showAllNotes: async function (query) {
        this.showLoading();
        try {
            const allNotes = await NotesApi.getAllNotes(query);
            const archivedNotes = await NotesApi.getArchivedNotes();

            this.displayResult(allNotes, this.noteListElement);
            this.displayResult(archivedNotes, this.archivedNoteListElement);

            this.showNoteList();
        } catch (error) {
            console.error('Error fetching notes:', error);
            alert('Gagal memuat catatan.');
        } finally {
            this.hideLoading();
        }
    },

    displayResult: function (notes, element) {
        const noteItemElements = notes.map((note) => {
            const noteItemElement = document.createElement('note-item');
            noteItemElement.note = note;
            return noteItemElement;
        });

        Utils.emptyElement(element);
        element.append(...noteItemElements);
    },

    showNoteList: function () {
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

    showLoading: function () {
        this.loadingElement.textContent = 'Loading...';
        this.noteListContainerElement.parentElement.insertBefore(
            this.loadingElement,
            this.noteListContainerElement
        );
    },

    hideLoading: function () {
        if (this.loadingElement.parentElement) {
            this.loadingElement.parentElement.removeChild(this.loadingElement);
        }
    },
};

home.init();
export default home;
