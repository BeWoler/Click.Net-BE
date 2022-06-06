import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GetUserArgs } from './dtos/args/getUser.args';
import { CreateUserInput } from './dtos/inputs/createUser.input';
import { User } from './models/user.model';
import { DeleteUserInput } from './dtos/inputs/deleteUser.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async getUser(getUserArgs: GetUserArgs): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: [{ id: getUserArgs.id }],
    });
    user.password = null;

    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    user.password = null;

    return user;
  }

  public async getUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    users.map((user) => (user.password = null));
    return users;
  }

  public async createUser(createUserData: CreateUserInput): Promise<User> {
    const user = this.usersRepository.create({ ...createUserData });
    user.password = await bcrypt.hash(user.password, 3);
    await this.usersRepository.save(user);

    return user;
  }

  public async deleteUser(id: DeleteUserInput): Promise<DeleteResult> {
    const deletedUser = await this.usersRepository.delete(id);
    return deletedUser;
  }
}
