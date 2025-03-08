// Mengimpor NotesApi dari file remote/notes-api.js
import NotesApi from '../data/remote/notes-api.js';

// Mendefinisikan custom element note-item
class NoteItem extends HTMLElement {
    // Mendeklarasikan properti _shadowRoot dengan nilai null
    _shadowRoot = null;
    // Mendeklarasikan properti _note dengan nilai default
    _note = {
        id: null,
        title: null,
        body: null,
        createdAt: null,
        archived: null,
    };

    // Memanggil constructor dari HTMLElement
    constructor() {
        super();
        // Membuat shadow DOM
        this._shadowRoot = this.attachShadow({ mode: 'open' });
    }

    // Fungsi untuk mengosongkan shadow DOM
    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    // Setter untuk properti note
    set note(value) {
        this._note = value;
        this.render();
    }

    // Getter untuk properti note
    get note() {
        return this._note;
    }

    // Fungsi yang akan dipanggil ketika custom element berhasil ditambahkan ke DOM
    connectedCallback() {
        this.render();
    }

    // Fungsi untuk merender tampilan elemen
    render() {
        this._emptyContent(); // Mengosongkan shadow DOM

        this._shadowRoot.innerHTML += `
            <style>
                .note-item {
                    display: block;
                    border-radius: 8px;
                    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
                    overflow: hidden;
                    padding: 16px;
                    margin-bottom: 16px;
                    background-color: #fff;
                }
                .note-info__title h2 {
                    font-weight: bold;
                    margin: 0;
                }
                .note-info__description p {
                    margin: 10px 0;
                }
                button {
                    margin-right: 8px;
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                #deleteButton {
                    background-color: #ff4d4d;
                    color: white;
                }
                #deleteButton:hover {
                    background-color:rgb(161, 28, 28);
                    color: white;
                }
                #archiveButton {
                    background-color:rgb(11, 134, 235);
                    color: white;
                }
                #archiveButton:hover {
                    background-color:rgb(4, 89, 158);
                    color: white;
                }
                #unarchiveButton {
                    background-color:rgb(235, 138, 11);
                    color: white;
                }
                #unarchiveButton:hover {
                    background-color:rgb(150, 89, 9);
                    color: white;
                }
            </style>
            <div class="note-item">
                <div class="note-info">
                    <div class="note-info__title">
                        <h2>${this._note.title}</h2>
                    </div>
                    <div class="note-info__description">
                        <p>${this._note.body}</p>
                    </div>
                    <button id="deleteButton">Hapus</button>
                    <button id="${this._note.archived ? 'unarchiveButton' : 'archiveButton'}">${this._note.archived ? 'Batal Arsipkan' : 'Arsipkan'}</button>
                </div>
            </div>
        `;

        // Menambahkan event listener untuk tombol hapus
        this._shadowRoot
            .querySelector('#deleteButton')
            .addEventListener('click', this._handleDelete.bind(this));
        // Menambahkan event listener untuk tombol arsip
        this._shadowRoot
            .querySelector('#archiveButton')
            ?.addEventListener('click', this._handleArchive.bind(this));
        // Menambahkan event listener untuk tombol batal arsip
        this._shadowRoot
            .querySelector('#unarchiveButton')
            ?.addEventListener('click', this._handleUnarchive.bind(this));
    }

    // Fungsi untuk menangani arsip catatan
    async _handleArchive() {
        try {
            await NotesApi.archiveNote(this._note.id);
            this.dispatchEvent(
                new CustomEvent('note-archived', {
                    bubbles: true,
                    composed: true,
                    detail: this._note.id,
                })
            );
            alert('Catatan berhasil diarsipkan!');
        } catch (error) {
            console.error('Error archiving note:', error);
            alert('Gagal mengarsipkan catatan.');
        }
    }

    // Fungsi untuk menangani batal arsip catatan
    async _handleUnarchive() {
        try {
            await NotesApi.unarchiveNote(this._note.id);
            this.dispatchEvent(
                new CustomEvent('note-unarchived', {
                    bubbles: true,
                    composed: true,
                    detail: this._note.id,
                })
            );
            alert('Catatan berhasil dikembalikan!');
        } catch (error) {
            console.error('Error unarchiving note:', error);
            alert('Gagal mengembalikan catatan.');
        }
    }

    // Fungsi untuk menangani hapus catatan
    async _handleDelete() {
        if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
            try {
                await NotesApi.deleteNote(this._note.id);
                this.dispatchEvent(
                    new CustomEvent('note-deleted', {
                        bubbles: true,
                        composed: true,
                        detail: this._note.id,
                    })
                );
                alert('Catatan berhasil dihapus!');
            } catch (error) {
                console.error('Error deleting note:', error);
                alert('Gagal menghapus catatan.');
            }
        }
    }
}

// Mendefinisikan custom element dengan nama note-item
customElements.define('note-item', NoteItem);
