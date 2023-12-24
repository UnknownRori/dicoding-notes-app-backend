import InvariantError from '../../exceptions/InvariantError.mjs';
import ImageHeadersSchema from './schema.mjs';

const UploadsValidator = {
    validateImageHeaders: (headers) => {
        const validationResult = ImageHeadersSchema.validate(headers);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

export default UploadsValidator;
