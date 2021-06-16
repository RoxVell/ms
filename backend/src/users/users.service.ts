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

  getUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  deleteUser(id: number) {
    return this.usersRepository.destroy({ where: { id } });
  }

  async editUser(id: number, data: CreateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new Error(`User doesn't exist`);

    return user.update(data);
  }

  getUsersWithRole(role: string) {
    return this.usersRepository.findAll({ where: { role } });
  }
}
