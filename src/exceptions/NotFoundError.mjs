import ClientError from './ClientError.mjs';

export default class NotFoundError extends ClientError {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}
