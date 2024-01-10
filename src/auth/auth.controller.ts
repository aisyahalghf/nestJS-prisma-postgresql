import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(
    @Body(new ValidationPipe()) dto: AuthDto,
  ) {
    // console.log({
    //   dto,
    // });

    return this.authService.signup(dto);
  }

  @Get()
  getBookmarks() {
    return 'horayyy welcome to port 3333';
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
