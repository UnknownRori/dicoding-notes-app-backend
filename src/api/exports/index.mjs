import ExportsHandler from './handler.mjs';
import routes from './routes.mjs';

export default {
    name: 'exports',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const exportsHandler = new ExportsHandler(service, validator);
        server.route(routes(exportsHandler));
    },
};
