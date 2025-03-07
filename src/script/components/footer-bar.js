// Mengimpor file CSS eksternal
import '../../styles/style.css';

// Mendefinisikan custom element footer-bar
class FooterBar extends HTMLElement { 
    // Mendeklarasikan properti _shadowRoot dengan nilai null
    _shadowRoot = null;

    constructor() {
        super();

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

    // Beberapa function yang akan digunakan untuk merender tampilan elemen
    render() { 
        this._emptyContent(); // Mengosongkan shadow DOM

        this._shadowRoot.innerHTML += `
            <style>
                @import url('../../styles/style.css');
            </style>
            <div>
                <p>&copy; 2025 - Simple Note App</p>
            </div>
        `;
    }
}

// Mendefinisikan custom element dengan nama footer-bar
customElements.define('footer-bar', FooterBar);