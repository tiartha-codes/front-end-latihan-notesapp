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
                .app-bar {
                    background-color: #151616;
                    color: white;
                    padding: 3px;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 56px;
                    margin-bottom: 20px;
                }
            </style>
            <div class="app-bar">
                <h1 class="brand-name">Notes APP</h1>
            </div>
        `;
    }
}

// Mendefinisikan custom element dengan nama app-bar
customElements.define('app-bar', AppBar);