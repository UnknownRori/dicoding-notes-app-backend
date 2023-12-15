import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';

import notes from './api/notes/index.mjs';
import NotesService from './services/postgres/NotesService.mjs';
import NotesValidator from './validator/notes/index.mjs';

import users from './api/users/index.mjs';
import UsersService from './services/postgres/UsersService.mjs';
import UsersValidator from './validator/users/index.mjs';

const init = async () => {
    dotenv.config();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    const notesService = new NotesService();
    const usersService = new UsersService();

    await server.register([
        {
            plugin: notes,
            options: {
                service: notesService,
                validator: NotesValidator,
            },
        },
        {
            plugin: users,
            options: {
                service: usersService,
                validator: UsersValidator,
            },
        },
    ]);

    await server.start();
    console.log(`Server started at ${server.info.uri}`);
};

init();
