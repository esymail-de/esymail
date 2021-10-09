import { ACGuard, UseRoles } from '@esymail/nest-access-control';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from 'src/dtos/login.dto';
import { RegisterDTO } from 'src/dtos/register.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  async login(@Body() b: LoginDTO, @Request() req) {
    return this.service.login(b);
  }

  @ApiBearerAuth()
  @Get('/me')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'user',
    possession: 'own',
    action: 'read',
  })
  async getOwnScopes(@Request() req) {
    return req.user;
  }

  @Post('register')
  // @UseGuards(JwtStrategy, ACGuard)
  async register(@Body() b: RegisterDTO, @Request() req) {
    return this.service.register(b);
  }
}
