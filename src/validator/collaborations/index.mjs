import InvariantError from '../../exceptions/InvariantError.mjs';
import CollaborationPayloadSchema from './schema.mjs';

const CollaborationsValidator = {
    validateCollaborationPayload: (payload) => {
        const validationResult = CollaborationPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

export default CollaborationsValidator;
