import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  Get,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto, createUserSchema } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { AuthGuard } from '@nestjs/passport';
import {AuthService} from "./auth/auth.service";
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import { ZodValidationPipe } from './pipes/ValidationPipe';
import {Ad} from "./ads/entities/ad.entity";

@Controller()
export class AppController {
  constructor(
      private readonly usersService: UsersService,
      private authService: AuthService,
  ) {}

  @Get()
  hello() {
    return 'Hello World!';
  }

  @Post('auth/register')
  @ApiTags('Auth')
  @ApiResponse({
    status: 201,
    description: 'Регистрация прошла успешно',
  })
  @UsePipes(new ZodValidationPipe(createUserSchema))
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @ApiTags('Auth')
  @ApiResponse({
    status: 201,
    description: 'Авторизация прошла успешно',
  })
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
