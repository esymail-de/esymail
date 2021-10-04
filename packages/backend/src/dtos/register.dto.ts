import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles';

export class RegisterDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  scope: Roles[];
}
