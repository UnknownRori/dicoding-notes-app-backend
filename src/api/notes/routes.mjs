// eslint-disable-next-line no-unused-vars
import Hapi from '@hapi/hapi';

// eslint-disable-next-line no-unused-vars
import NotesHandler from './handler.mjs';

/**
 * @type {Hapi.ServerRoute<Hapi.ReqRefDefaults> | Hapi.ServerRoute<Hapi.ReqRefDefaults>[]}
 * @param {NotesHandler} handler
 * @const
 */
const routes = (handler) => [
    {
        method: 'GET',
        path: '/notes',
        handler: handler.getNotesHandler,
        options: {
            cors: {
                origin: ['http://notesapp-v1.dicodingacademy.com'],
            },
            auth: 'notesapp_jwt',
        },
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: handler.getNoteByIdHandler,
        options: {
            cors: {
                origin: ['http://notesapp-v1.dicodingacademy.com'],
            },
            auth: 'notesapp_jwt',
        },
    },
    {
        method: 'POST',
        path: '/notes',
        handler: handler.addNoteHandler,
        options: {
            cors: {
                origin: ['http://notesapp-v1.dicodingacademy.com'],
            },
        },
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: handler.putNoteByIdHandler,
        options: {
            cors: {
                origin: ['http://notesapp-v1.dicodingacademy.com'],
            },
            auth: 'notesapp_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: handler.deleteNoteByIdHandler,
        options: {
            cors: {
                origin: ['http://notesapp-v1.dicodingacademy.com'],
            },
            auth: 'notesapp_jwt',
        },
    },
];

export default routes;
