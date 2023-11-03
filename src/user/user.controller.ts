import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';
// import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../decorator';
import { JwtGuard } from '../guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(
    @GetUser() user: User,
    // @GetUser('email') email: string,
  ) {
    return user;
  }

  @Patch('edit')
  editUser(
    @GetUser('id') userId: number,
    @Body(new ValidationPipe()) dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
    // console.log(userId);
    // console.log(dto);
  }
}
