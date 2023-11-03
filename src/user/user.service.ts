import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { EditUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    // find userId
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!user)
      throw new ForbiddenException(
        'unathourization',
      );
    // edit user

    const userUpdate =
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: dto,
      });

    delete userUpdate.hash;
    // return response
    return userUpdate;
  }
}
