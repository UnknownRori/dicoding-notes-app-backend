import CollaborationsHandler from './handler.mjs';
import routes from './routes.mjs';

export default {
    name: 'collaborations',
    version: '1.0.0',
    register: async (server, { collaborationsService, notesService, validator }) => {
        const collaborationsHandler = new CollaborationsHandler(
            collaborationsService, notesService, validator,
        );
        server.route(routes(collaborationsHandler));
    },
};
