import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from 'src/dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(private service: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() b: LoginDTO, @Request() req) {
    return this.service.login(req.user);
  }

  @Get('/me')
  async getOwnScopes() {
    return {};
  }
}
