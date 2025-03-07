import '../../styles/style.css';
import NotesApi from '../data/remote/notes-api.js';

class NoteItem extends HTMLElement {
    _shadowRoot = null;
    _note = {
        id: null,
        title: null,
        body: null,
        createdAt: null,
        archived: null,
    };

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    set note(value) {
        this._note = value;
        this.render();
    }

    get note() {
        return this._note;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();

        this._shadowRoot.innerHTML += `
            <link rel="stylesheet" href="/src/styles/style.css">
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

        this._shadowRoot
            .querySelector('#deleteButton')
            .addEventListener('click', this._handleDelete.bind(this));
        this._shadowRoot
            .querySelector('#archiveButton')
            ?.addEventListener('click', this._handleArchive.bind(this));
        this._shadowRoot
            .querySelector('#unarchiveButton')
            ?.addEventListener('click', this._handleUnarchive.bind(this));
    }

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
            window.location.reload();
        } catch (error) {
            console.error('Error archiving note:', error);
            alert('Gagal mengarsipkan catatan.');
        }
    }

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
            window.location.reload();
        } catch (error) {
            console.error('Error unarchiving note:', error);
            alert('Gagal mengembalikan catatan.');
        }
    }

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
                window.location.reload();
            } catch (error) {
                console.error('Error deleting note:', error);
                alert('Gagal menghapus catatan.');
            }
        }
    }
}

customElements.define('note-item', NoteItem);
