// eslint-disable-next-line no-unused-vars
import Hapi from '@hapi/hapi';

// eslint-disable-next-line no-unused-vars
import NotesService from '../../services/inMemory/NotesService.mjs';

export default class NotesHandler {
    /**
     * @param {NotesService} service
     */
    constructor(service) {
        this._service = service;

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
    addNoteHandler(request, h) {
        try {
            const { title = 'untitled', body, tags } = request.payload;

            const noteId = this._service.addNote({ title, body, tags });

            return h.response({
                status: 'success',
                message: 'Catatan berhasil ditambahkan',
                data: {
                    noteId,
                },
            }).code(201);
        } catch (error) {
            return h.response({
                status: 'fail',
                message: error.message,
            }).code(400);
        }
    }

    /**
     * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
     * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
     *
     * @returns {Hapi.ResponseValue}
     */
    getNotesHandler() {
        const notes = this._service.getNotes();

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
    getNoteByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const note = this._service.getNoteById(id);

            return {
                status: 'success',
                data: {
                    note,
                },
            };
        } catch (error) {
            return h.response({
                status: 'fail',
                message: error.message,
            }).code(404);
        }
    }

    /**
     * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
     * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
     *
     * @returns {Hapi.ResponseValue}
     */
    putNoteByIdHandler(request, h) {
        try {
            const { id } = request.params;

            this._service.editNoteById(id, request.payload);

            return {
                status: 'success',
                message: 'Catatan berhasil diperbarui',
            };
        } catch (error) {
            return h.response({
                status: 'fail',
                message: error.message,
            }).code(404);
        }
    }

    /**
     * @param {Hapi.Request<Hapi.ReqRefDefaults>} request
     * @param {Hapi.ResponseToolkit<Hapi.ReqRefDefaults>} h
     *
     * @returns {Hapi.ResponseValue}
     */
    deleteNoteByIdHandler(request, h) {
        try {
            const { id } = request.params;
            this._service.deleteNoteById(id);
            return {
                status: 'success',
                message: 'Catatan berhasil dihapus',
            };
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(404);
            return response;
        }
    }
}