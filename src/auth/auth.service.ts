import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../contants/testApi.enums';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signIn(username, pass) {
    const user = await Object.values(UserRole).includes(username);
    const password=this.configService.get("USER_PASSWORD")
    if (pass !== password ) {
      throw new UnauthorizedException();
    }
    const payload = { password: password, username:username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}