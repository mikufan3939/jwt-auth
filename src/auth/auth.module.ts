import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { UsersModule } from 'src/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '70m' },
        }),
        UsersModule
      ],
    providers:[AuthService,
      {provide: APP_GUARD,
        useClass: AuthGuard}],
    controllers:[AuthController],
    exports: [AuthService],
})
export class AuthModule{}