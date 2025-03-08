// Mengimpor NotesApi dari file remote/notes-api.js
import NotesApi from '../data/remote/notes-api.js';

// Mendefinisikan custom element note-form
class NoteForm extends HTMLElement {
    // Mendeklarasikan properti _shadowRoot dengan nilai null
    _shadowRoot = null;

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

    // Fungsi yang akan dipanggil ketika custom element berhasil ditambahkan ke DOM
    connectedCallback() {
        this.render();
    }

    // Fungsi untuk merender tampilan elemen
    render() {
        // Mengosongkan shadow DOM
        this._emptyContent();

        this._shadowRoot.innerHTML += `
            <style>
                .note-form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    max-width: 400px;
                    margin: auto;
                    margin-bottom: 10px;
                    padding: 25px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                .note-form > .title-section {
                    margin-left: auto;
                    margin-right: auto;
                    text-align: center;
                    padding: 10px;
                    border-radius: 4px;
                }
                input[type=text], textarea {
                    width: 100%;
                    padding: 12px 20px;
                    margin: 8px 0;
                    display: inline-block;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box;
                }
                .submit-button {
                    width: 100%;
                    background-color: #4CAF50;
                    color: white;
                    padding: 14px 20px;
                    margin: 8px 0;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .submit-button:hover {
                    background-color: #45a049;
                }
            </style>
            <div>
                <form class="note-form">
                    <div class="title-section">
                        <h2>Tambah Note</h2>
                    </div>
                    <label for="title">Judul</label>
                    <input type="text" id="title" name="title" required>
                    <label for="body">Isi</label>
                    <textarea id="body" name="body" rows="5" required></textarea>
                    <button type="submit" class="submit-button">Save</button>
                </form>
            </div>
        `;

        // Menambahkan event listener untuk submit form
        this._shadowRoot
            .querySelector('form')
            .addEventListener('submit', this._handleSubmit.bind(this));
    }

    // Fungsi untuk menangani submit form
    async _handleSubmit(event) {
        event.preventDefault(); // Mencegah perilaku default form submit
        const title = this._shadowRoot.querySelector('#title').value; // Mengambil nilai judul
        const body = this._shadowRoot.querySelector('#body').value; // Mengambil nilai isi

        const note = {
            title,
            body,
        };

        try {
            // Menambahkan catatan menggunakan NotesApi
            await NotesApi.addNote(note);
            // Memicu event custom 'note-added'
            this.dispatchEvent(
                new CustomEvent('note-added', {
                    bubbles: true,
                    composed: true,
                })
            );
            // Mereset form setelah berhasil menambahkan catatan
            this._shadowRoot.querySelector('form').reset();
            alert('Catatan berhasil ditambahkan!');
        } catch (error) {
            console.error('Error adding note:', error);
            alert('Gagal menambahkan catatan.');
        }
    }
}

// Mendefinisikan custom element dengan nama note-form
customElements.define('note-form', NoteForm);