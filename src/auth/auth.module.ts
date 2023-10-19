import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule,
    JwtModule.register({
        global: true,
        secret: "12334",
        signOptions: { expiresIn: '3600s' },
      }),],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}