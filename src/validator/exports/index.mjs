import ExportNotesPayloadSchema from './schema.mjs';
import InvariantError from '../../exceptions/InvariantError.mjs';

const ExportsValidator = {
    validateExportNotesPayload: (payload) => {
        const validationResult = ExportNotesPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

export default ExportsValidator;
