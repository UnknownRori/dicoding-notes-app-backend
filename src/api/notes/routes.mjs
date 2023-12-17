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
            auth: 'notesapp_jwt',
        },
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: handler.getNoteByIdHandler,
        options: {
            auth: 'notesapp_jwt',
        },
    },
    {
        method: 'POST',
        path: '/notes',
        handler: handler.addNoteHandler,
        options: {
            auth: 'notesapp_jwt',
        },
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: handler.putNoteByIdHandler,
        options: {
            auth: 'notesapp_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: handler.deleteNoteByIdHandler,
        options: {
            auth: 'notesapp_jwt',
        },
    },
];

export default routes;
