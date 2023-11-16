// eslint-disable-next-line no-unused-vars
import Hapi from '@hapi/hapi';

import { nanoid } from 'nanoid';
import notes from './notes.mjs';

/**
 * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
 * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
 */
export function addNoteHandler(request, h) {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        return h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                notesId: id,
            },
        }).code(201);
    }

    return h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    }).code(500);
}

/**
 * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
 * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
 */
export function getAllNotesHandler() {
    return {
        status: 'success',
        data: {
            notes,
        },
    };
}

/**
 * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
 * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
 */
export function getNoteByIdHandler(request, h) {
    const { id } = request.params;

    const note = notes.filter((note) => note.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note
            },
        };
    }

    return h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    }).code(404);
}

/**
 * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
 * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
 */
export function editNoteByIdHandler(request, h) {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        };

        return h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        }).code(200);
    }

    return h.response({
        status: 'fail',
        message: 'Catatan gagal diperbarui, Id tidak ditemukan',
    }).code(404);
}

/**
 * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
 * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
 */
export function deleteNoteByIdHandler (request, h) {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);
    
    if (index !== -1) {
        notes.splice(index, 1);
        
        return h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        }).code(200);
    }

    return h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus, Id tidak ditemukan',
    }).code(404);
}
