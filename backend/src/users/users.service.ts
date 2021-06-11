import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private usersRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const isRoleExists = await this.rolesService.isRoleExists(userDto.role);

    if (!isRoleExists) {
      throw new BadRequestException(`Role ${userDto.role} doesn't exits`);
    }

    return this.usersRepository.create(userDto);
  }

  // createOperator(userDto: CreateUserDto) {
  //   return this.createUser({ ...userDto, role: 'operator' });
  // }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async getOperators() {
    return await this.usersRepository.findAll({ where: { role: 'operator' } });
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
