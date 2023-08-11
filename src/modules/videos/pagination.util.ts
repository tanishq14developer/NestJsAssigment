// pagination.util.ts
import { parse } from 'path/posix';
import { FindManyOptions } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';

export const getPaginationOptions = (paginationDto: PaginationDto): FindManyOptions => {
    const { limit, offset, sortBy, sortOrder } = paginationDto;

    const order: { [key: string]: 'ASC' | 'DESC' } = {};
    if (sortBy) {
        order[sortBy] = sortOrder || 'ASC';
    }

    return {
        skip: parseInt(offset),
        take: parseInt(limit),
        order,
    };
};
