import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtSecret } from 'src/constants/constants';
import { errors } from 'src/errors/errors';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User> | null {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new HttpException(errors.USER_NOT_EXIST, HttpStatus.BAD_REQUEST);
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    return passwordIsValid ? user : null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret,
    });

    const user = this.usersService.getUserByEmail(decoded.email);

    if (!user) {
      throw new HttpException(errors.SOMETHING_WRONG, HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
