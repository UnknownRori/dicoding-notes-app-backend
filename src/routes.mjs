// eslint-disable-next-line no-unused-vars
import Hapi from '@hapi/hapi';

import { addNoteHandler, deleteNoteByIdHandler, editNoteByIdHandler, getAllNotesHandler, getNoteByIdHandler } from './handler.mjs';

/**
 * @type {Hapi.ServerRoute<Hapi.ReqRefDefaults> | Hapi.ServerRoute<Hapi.ReqRefDefaults>[]}
 * @const
 */
const routes = [
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
        options: {
            cors: {
                origin: ['http://notesapp-v1.dicodingacademy.com'],
            },
        },
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
        options: {
            cors: {
                origin: ['http://notesapp-v1.dicodingacademy.com'],
            },
        },
    },
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
        options: {
            cors: {
                origin: ['http://notesapp-v1.dicodingacademy.com'],
            },
        },
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
        options: {
            cors: {
                origin: ['http://notesapp-v1.dicodingacademy.com'],
            },
        },
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
        options: {
            cors: {
                origin: ['http://notesapp-v1.dicodingacademy.com'],
            },
        },
    },
];

export default routes;
