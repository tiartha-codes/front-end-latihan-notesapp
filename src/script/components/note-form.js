import NotesApi from '../data/remote/notes-api.js';
import '../../styles/style.css';

class NoteForm extends HTMLElement {
    _shadowRoot = null;

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();

        this._shadowRoot.innerHTML += `
            <style>
                h2 {
                    margin: auto;
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
                .title-section {
                    margin-block-end: 2rem;
                    font-size: 1.2em;
                    margin-left: auto;
                    margin-right: auto;
                }
            </style>
            <div>
                <div class="title-section">
                    <h2>Tambah Note</h2>
                </div>
                <form class="note-form">
                        <label for="title">Judul</label>
                        <input type="text" id="title" name="title" required>
                
                        <label for="body">Isi</label>
                        <textarea id="body" name="body" rows="5" required></textarea>
                    <button type="submit" class="submit-button">Simpan Catatan</button>
                </form>
            </div>
        `;

        this._shadowRoot
            .querySelector('form')
            .addEventListener('submit', this._handleSubmit.bind(this));
    }

    async _handleSubmit(event) {
        event.preventDefault();
        const title = this._shadowRoot.querySelector('#title').value;
        const body = this._shadowRoot.querySelector('#body').value;

        const note = {
            title,
            body,
        };

        try {
            await NotesApi.addNote(note);
            this.dispatchEvent(
                new CustomEvent('note-added', {
                    bubbles: true,
                    composed: true,
                })
            );
            this._shadowRoot.querySelector('form').reset();
            alert('Catatan berhasil ditambahkan!');
        } catch (error) {
            console.error('Error adding note:', error);
            alert('Gagal menambahkan catatan.');
        }
    }
}

customElements.define('note-form', NoteForm);