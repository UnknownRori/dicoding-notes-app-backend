import UsersHandler from './handler.mjs';
import routes from './routes.mjs';

export default {
    name: 'users',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const usersHandler = new UsersHandler(service, validator);
        server.route(routes(usersHandler));
    },
};
