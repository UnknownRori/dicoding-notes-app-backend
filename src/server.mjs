import Hapi from '@hapi/hapi';
import Jwt from '@hapi/jwt';
import dotenv from 'dotenv';

import notes from './api/notes/index.mjs';
import NotesService from './services/postgres/NotesService.mjs';
import NotesValidator from './validator/notes/index.mjs';

import users from './api/users/index.mjs';
import UsersService from './services/postgres/UsersService.mjs';
import UsersValidator from './validator/users/index.mjs';

import authentications from './api/authentications/index.mjs';
import AuthenticationsService from './services/postgres/AuthenticationsService.mjs';
import TokenManager from './tokenize/TokenManager.mjs';
import AuthenticationsValidator from './validator/authentications/index.mjs';

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

    await server.register([
        {
            plugin: Jwt.plugin,
        },
    ]);

    server.auth.strategy('notesapp_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    });

    const notesService = new NotesService();
    const usersService = new UsersService();
    const authenticationsService = new AuthenticationsService();

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
        {
            plugin: authentications,
            options: {
                authenticationsService,
                usersService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            }
        }
    ]);

    await server.start();
    console.log(`Server started at ${server.info.uri}`);
};

init();
