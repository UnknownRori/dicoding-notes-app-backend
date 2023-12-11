import Hapi from '@hapi/hapi';
import routes from './routes.mjs';

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    server.route(routes);

    await server.start();
    console.log(`Server started at ${server.info.uri}`);
};

init();
