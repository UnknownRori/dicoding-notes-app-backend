import InvariantError from '../../exceptions/InvariantError.mjs';
import { NotePayloadSchema } from './schema.mjs';

const NotesValidator = {
    /**
     * @param {Object} payload
     *
     * @throws {Error}
     */
    validateNotePayload: (payload) => {
        const validationResult = NotePayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

export default NotesValidator;
