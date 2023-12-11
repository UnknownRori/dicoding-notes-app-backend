import Hapi from '@hapi/hapi';

import notes from './api/notes/index.mjs';
import NotesService from './services/inMemory/NotesService.mjs';
import NotesValidator from './validator/notes/index.mjs';

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    const notesService = new NotesService();

    await server.register({
        plugin: notes,
        options: {
            service: notesService,
            validator: NotesValidator,
        }
    });

    await server.start();
    console.log(`Server started at ${server.info.uri}`);
};

init();
