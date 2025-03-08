// Mendefinisikan custom element footer-bar
class FooterBar extends HTMLElement {
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
        this._emptyContent(); // Mengosongkan shadow DOM

        // Menambahkan konten HTML ke dalam shadow DOM
        this._shadowRoot.innerHTML += `
            <style>
                .footer-bar {
                    display: block;
                    padding: 5px; 
                    background-color: #151616;
                    color: #fff; 
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.8em; 
                    margin-top: 0;
                    margin-bottom: 0;
                }
            </style>
            <div class="footer-bar">
                <p>&copy; 2025 - Note App</p>
            </div>
        `;
    }
}

// Mendefinisikan custom element dengan nama footer-bar
customElements.define('footer-bar', FooterBar);