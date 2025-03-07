// Mengimpor file CSS eksternal
import '../../styles/style.css';

// Mendefinisikan custom element app-bar
class AppBar extends HTMLElement {
    // Mendeklarasikan properti _shadowRoot dengan nilai null
    _shadowRoot = null;

    // Memanggil constructor dari HTMLElement
    constructor() { 
        super(); 

        this._shadowRoot = this.attachShadow({mode: 'open'}); // Membuat shadow DOM
    }

    // Fungsi untuk mengosongkan shadow DOM
    _emptyContent() {
        this._shadowRoot.innerHTML = ''; 
    }

    // Fungsi yang akan dipanggil ketika custom element berhasil ditambahkan ke DOM
    connectedCallback() {
        this.render(); 
    }

    // Beberapa function yang akan digunakan untuk merender tampilan elemen
    render() {
        this._emptyContent(); // Mengosongkan shadow DOM

        this._shadowRoot.innerHTML += `
            <style>
                @import url('../../styles/style.css');
            </style>
            <div>
                <h1 class="brand-name">Simple Notes APP</h1>
            </div>
        `;
    }
}

// Mendefinisikan custom element dengan nama app-bar
customElements.define('app-bar', AppBar);