import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { NEST_SECRET } from './../../config';
import type { RoleType } from './../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: NEST_SECRET,
    });
  }

  validate(payload: { userId: number; email: string; role: RoleType }) {
    const { userId, email, role } = payload;

    return { id: userId, email, role };
  }
}
