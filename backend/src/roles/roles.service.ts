import { Injectable } from '@nestjs/common';
import CreateRoleDto from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesRepository: typeof Role) {}

  createRole(roleDto: CreateRoleDto) {
    return this.rolesRepository.create(roleDto);
  }
}
