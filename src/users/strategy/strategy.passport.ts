import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable,UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../services/users.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersSevice:UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  
    async validate(payload: any) {
        console.log(payload)
        const user = await this.usersSevice.findById(payload.userId );
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }
  }

