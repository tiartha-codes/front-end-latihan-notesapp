const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const NotesApi = {
    async getAllNotes() {
        const response = await fetch(`${BASE_URL}/notes`);
        const responseJson = await response.json();
        if (responseJson.status === 'success') {
            return responseJson.data;
        } else {
            throw new Error(responseJson.message);
        }
    },

    async addNote(note) {
        const response = await fetch(`${BASE_URL}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });
        const responseJson = await response.json();
        if (responseJson.status === 'success') {
            return responseJson.data;
        } else {
            throw new Error(responseJson.message);
        }
    },

    async deleteNote(id) {
        const response = await fetch(`${BASE_URL}/notes/${id}`, {
            method: 'DELETE',
        });
        const responseJson = await response.json();
        if (responseJson.status === 'success') {
            return responseJson.message;
        } else {
            throw new Error(responseJson.message);
        }
    },

    async archiveNote(id) {
        const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
            method: 'POST',
        });
        const responseJson = await response.json();
        if (responseJson.status === 'success') {
            return responseJson.message;
        } else {
            throw new Error(responseJson.message);
        }
    },

    async unarchiveNote(id) {
        const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
            method: 'POST',
        });
        const responseJson = await response.json();
        if (responseJson.status === 'success') {
            return responseJson.message;
        } else {
            throw new Error(responseJson.message);
        }
    },

    async getArchivedNotes() {
        const response = await fetch(`${BASE_URL}/notes/archived`);
        const responseJson = await response.json();
        if (responseJson.status === 'success') {
            return responseJson.data;
        } else {
            throw new Error(responseJson.message);
        }
    },
};

export default NotesApi;
