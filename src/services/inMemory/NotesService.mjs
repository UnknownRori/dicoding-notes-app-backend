import InvariantError from '../../exceptions/InvariantError.mjs';
import NotFoundError from '../../exceptions/NotFoundError.mjs';

import { nanoid } from 'nanoid';

export default class NotesService {
    constructor() {
        this._notes = [];
    }

    /**
     * @param {Object} param0
     * @param {string} param0.title 
     * @param {string} param0.body 
     * @param {Array<string>} param0.tags 
     *
     * @returns {string}
     *
     * @throws {Error}
     */
    addNote({ title, body, tags }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newNote = {
            title, tags, body, id, createdAt, updatedAt,
        };

        this._notes.push(newNote);

        const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

        if (!isSuccess) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }

        return id;
    }

    /**
     * @returns {Array<Object>}
     */
    getNotes() {
        return this._notes;
    }

    /**
     * @param {string} id 
     *
     * @returns {Array<Object>}
     *
     * @throws {Error}
     */
    getNoteById(id) {
        const note = this._notes.filter((n) => n.id === id)[0];
        if (!note) {
            throw new NotFoundError('Catatan tidak ditemukan');
        }
        return note;
    }

    /**
     * @param {string} id 
     * @param {Object} param0
     * @param {string} param0.title 
     * @param {string} param0.body 
     * @param {string} param0.tags 
     *
     * @throws {Error}
     */
    editNoteById(id, { title, body, tags }) {
        const index = this._notes.findIndex((note) => note.id === id);

        if (index === -1) {
            throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
        }

        const updatedAt = new Date().toISOString();

        this._notes[index] = {
            ...this._notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
    }

    /**
     * @param {string} id 
     *
     * @throws {Error}
     */
    deleteNoteById(id) {
        const index = this._notes.findIndex((note) => note.id === id);
        if (index === -1) {
            throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        }
        this._notes.splice(index, 1);
    }
}

