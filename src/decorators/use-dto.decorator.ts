/* eslint-disable @typescript-eslint/no-explicit-any */
// import type { AbstractDto } from './../shared/dto/abstract.dto';
// import type { AbstractEntity } from './../shared/entity/abstract.entity';
// import type { Constructor } from './../shared/types';

export function UseDto(dtoClass: any): ClassDecorator {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass;
  };
}
