import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateRoleDto from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesRepository: typeof Role) {}

  async createRole(roleDto: CreateRoleDto) {
    if (await this.isRoleExists(roleDto.value)) {
      throw new HttpException(
        `Role ${roleDto} doesn't exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.rolesRepository.create(roleDto);
  }

  async isRoleExists(role: string) {
    return Boolean(
      await this.rolesRepository.findOne({ where: { value: role } }),
    );
  }
}
