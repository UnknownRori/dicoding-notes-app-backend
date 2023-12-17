import ClientError from './ClientError.mjs';

export default class AuthorizationError extends ClientError {
    constructor(message) {
        super(message, 403);
        this.name = 'AuthorizationError';
    }
}
