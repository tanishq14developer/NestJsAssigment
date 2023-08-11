import { createHmac } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';
import { NEST_SECRET } from './config';

export function cryptoPassword(password: string) {
    const hmac = createHmac('sha256', NEST_SECRET);

    return hmac.update(password).digest('hex');
}


export class ApiResponse<T> {
    constructor(public data: T, public meta: { message: string; displayMessage: string }) {

    }
    @ApiProperty()
    response: T
}

export class ApiResponsePaginated<T> {
    constructor(public data: {
        data: T,
        total: number,
    }, public meta: { message: string; displayMessage: string }) {
    }

}
