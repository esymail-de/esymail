import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, inputPassword: string): Promise<any> {
    const user = await this.userRepo.findOne({ email: email });
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    if (!(await bcrypt.compare(inputPassword, user.password))) {
      throw new BadRequestException('PASSWORD_WRONG');
    }
    const { password, ...result } = user;
    return result;
  }

  async login(user: Partial<UserEntity>) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
