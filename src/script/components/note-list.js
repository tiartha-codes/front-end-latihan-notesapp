// Import class Utils from utils.js
import Utils from '../utils.js';

// Mendefinisikan class NoteList yang mewarisi sifat dari HTMLElement
class NoteList extends HTMLElement {
    // Mendeklarasikan _shadowRoot dan _style dengan nilai null
    _shadowRoot = null;
    _style = null;

    // Mendeklarasikan nilai _column dan _gutter dengan nilai tertentu
    _column = 3;
    _gutter = 16;

    // Mendefinisikan fungsi observedAttributes dan mengembalikan nilai array yang berisi column dan gutter
    static get observedAttributes() {
        return ['column', 'gutter'];
    }

    // Mendefinisikan constructor
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' }); // Pasang shadow root pada elemen ini
        this._style = document.createElement('style'); // Buat elemen style

        // Memanggil Function render
        this.render();
    }

    // Mendefinisikan fungsi _updateStyle
    _updateStyle() {
        this._style.textContent = `
            :host {
                display: block;
            }
      
            .list {
                display: grid;
                grid-template-columns: ${'1fr '.repeat(this.column)};
                gap: ${this.gutter}px;
            }
        `;
    }

    // Set dan Get column dan gutter
    set column(value) {
        // Definisikan column
        const newValue = Number(value);
        if (!Utils.isValidInteger(newValue)) return;

        this._column = value;
    }

    get column() {
        return this._column;
    }

    set gutter(value) {
        // Definisikan gutter
        const newValue = Number(value);
        if (!Utils.isValidInteger(newValue)) return;

        this._gutter = value;
    }

    get gutter() {
        return this._gutter;
    }

    // Mendefinisikan fungsi _emptyContent yang berisi innerHTML dari shadowRoot agar kosong
    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    render() {
        this._emptyContent(); // Panggil fungsi _emptyContent
        this._updateStyle(); // Panggil fungsi _updateStyle

        // Menambahkan elemen style ke dalam shadow DOM
        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <div class="list">
                <slot></slot>
            </div>
        `;
    }

    // Mendefinisikan fungsi attributeChangedCallback
    attributeChangedCallback(name, oldValue, newValue) {
        // Definisikan fungsi attributeChangedCallback
        switch (name) {
            case 'column':
                this.column = newValue;
                break;
            case 'gutter':
                this.gutter = newValue;
                break;
        }

        this.render();
    }

    // Mendefinisikan fungsi connectedCallback dan memanggil Function render
    connectedCallback() {
        this.render();
    }
}

// Mendefinisikan custom element dengan nama note-list
customElements.define('note-list', NoteList); // Daftarkan custom element dengan nama note-list
