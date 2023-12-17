// eslint-disable-next-line no-unused-vars
import Hapi from '@hapi/hapi';

// eslint-disable-next-line no-unused-vars
import NotesService from '../../services/postgres/NotesService.mjs';
import ClientError from '../../exceptions/ClientError.mjs';

export default class NotesHandler {
    /**
     * @param {NotesService} service
     */
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.addNoteHandler = this.addNoteHandler.bind(this);
        this.getNotesHandler = this.getNotesHandler.bind(this);
        this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
        this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
        this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
    }

    /**
     * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
     * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
     *
     * @returns {Hapi.ResponseValue}
     */
    async addNoteHandler(request, h) {
        try {
            this._validator.validateNotePayload(request.payload);

            const { title = 'untitled', body, tags } = request.payload;
            const { id: credentialId } = request.auth.credentials;

            const noteId = await this._service.addNote({ title, body, tags, owner: credentialId });

            return h.response({
                status: 'success',
                message: 'Catatan berhasil ditambahkan',
                data: {
                    noteId,
                },
            }).code(201);
        } catch (error) {
            if (error instanceof ClientError) {
                return h.response({
                    status: 'fail',
                    message: error.message,
                }).code(error.statusCode);
            }

            // Server ERROR!
            console.error(error);
            return h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            }).code(500);
        }
    }

    /**
     * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
     * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
     *
     * @returns {Hapi.ResponseValue}
     */
    async getNotesHandler(request) {
        const { id: credentialId } = request.auth.credentials;
        const notes = await this._service.getNotes(credentialId);

        return {
            status: 'success',
            data: {
                notes,
            },
        };
    }

    /**
     * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
     * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
     *
     * @returns {Hapi.ResponseValue}
     */
    async getNoteByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const { id: credentialId } = request.auth.credentials;

            await this._service.verifyNoteAccess(id, credentialId);
            const note = await this._service.getNoteById(id, credentialId);

            return {
                status: 'success',
                data: {
                    note,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
                return h.response({
                    status: 'fail',
                    message: error.message,
                }).code(error.statusCode);
            }

            // Server ERROR!
            console.error(error);
            return h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            }).code(500);
        }
    }

    /**
     * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
     * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
     *
     * @returns {Hapi.ResponseValue}
     */
    async putNoteByIdHandler(request, h) {
        try {
            this._validator.validateNotePayload(request.payload);

            const { id } = request.params;
            const { id: credentialId } = request.auth.credentials;
            await this._service.verifyNoteAccess(id, credentialId);
            await this._service.editNoteById(id, request.payload);

            return {
                status: 'success',
                message: 'Catatan berhasil diperbarui',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                return h.response({
                    status: 'fail',
                    message: error.message,
                }).code(error.statusCode);
            }

            // Server ERROR!
            console.error(error);
            return h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            }).code(500);
        }
    }

    /**
     * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
     * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
     *
     * @returns {Hapi.ResponseValue}
     */
    async deleteNoteByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const { id: credentialId } = request.auth.credentials;
            await this._service.verifyNoteOwner(id, credentialId);
            await this._service.deleteNoteById(id);

            return {
                status: 'success',
                message: 'Catatan berhasil dihapus',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                return h.response({
                    status: 'fail',
                    message: error.message,
                }).code(error.statusCode);
            }

            // Server ERROR!
            console.error(error);
            return h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            }).code(500);
        }
    }
}
