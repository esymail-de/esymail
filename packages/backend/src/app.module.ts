import { AccessControlModule } from '@esymail/nest-access-control';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { roles } from './auth/roles';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cf: ConfigService) => {
        return {
          type: 'mongodb',
          host: cf.get<string>('DATABASE_HOST'),
          port: cf.get<number>('DATABASE_PORT'),
          username: cf.get<string>('DATABASE_USER'),
          password: cf.get<string>('DATABASE_PASSWORD'),
          database: cf.get<string>('DATABASE_NAME'),
          entities: [UserEntity],
          useNewUrlParser: true,
          useUnifiedTopology: true,
          synchronize: true,
        };
      },
    }),
    AccessControlModule.forRoles(roles),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
