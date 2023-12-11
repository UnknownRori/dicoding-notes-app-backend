// eslint-disable-next-line no-unused-vars
import Hapi from '@hapi/hapi';

// eslint-disable-next-line no-unused-vars
import NotesService from '../../services/inMemory/NotesService.mjs';

import routes from './routes.mjs';
import NotesHandler from './handler.mjs';

export default {
    name: 'notes',
    version: '1.0.0',

    /**
     * @param {Hapi.ServerState} server
     * @param {Object} obj
     * @param {NotesService} obj.service
     * @param {Object} obj.validator
     */
    register: async (server, { service, validator }) => {
        const notesHandler = new NotesHandler(service, validator);
        server.route(routes(notesHandler));
    }
};
