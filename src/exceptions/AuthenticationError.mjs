import ClientError from './ClientError.mjs';

export default class AuthenticationError extends ClientError {
    constructor(message) {
        super(message, 401);
        this.name = 'AuthenticationError';
    }
}
