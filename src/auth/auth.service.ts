import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
  async signup(dto: AuthDto) {
    console.log(dto);

    // generate password hash
    const hash = await argon.hash(dto.password);

    const user = {
      email: dto.email,
      pasword: hash,
    };

    console.log(hash);

    // const user = await this.prisma.user.create({
    //   data :{
    //     email : dto.email,
    //     hash : dto.hash
    //   }
    // })

    // save new user in db

    // return the save user

    return user;
  }

  signin() {
    return { msg: 'i am signin' };
  }
}
