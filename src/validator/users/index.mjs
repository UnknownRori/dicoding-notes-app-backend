import UserPayloadSchema from './schema.mjs';
import InvariantError from '../../exceptions/InvariantError.mjs';

const UsersValidator = {
    validateUserPayload: (payload) => {
        const validationResult = UserPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

export default UsersValidator;
