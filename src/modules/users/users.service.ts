import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GetUserArgs } from './dtos/args/getUser.args';
import { CreateUserInput } from './dtos/inputs/createUser.input';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async getUser(getUserArgs: GetUserArgs): Promise<User> {
    return this.usersRepository.findOne({
      where: [{ id: getUserArgs.id }],
    });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  public async getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public async createUser(createUserData: CreateUserInput): Promise<User> {
    const user = this.usersRepository.create({ ...createUserData });
    user.password = await bcrypt.hash(user.password, 3);
    await this.usersRepository.save(user);

    return user;
  }
}
