import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private usersRepository: typeof User) {}

  createUser(userDto: CreateUserDto) {
    return this.usersRepository.create(userDto);
  }

  createOperator(userDto: CreateUserDto) {
    return this.usersRepository.create({ ...userDto, roleId: 2 });
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async getOperators() {
    return await this.usersRepository.findAll({ where: { roleId: 2 } });
  }

  deleteUser(id: number) {
    return this.usersRepository.destroy({ where: { id } });
  }

  async editUser(id: number, data: CreateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new Error(`User doesn't exist`);

    return user.update(data);
  }
}
