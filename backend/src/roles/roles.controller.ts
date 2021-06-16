import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import CreateRoleDto from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createRole(@Body() roleDto: CreateRoleDto) {
    try {
      return await this.rolesService.createRole(roleDto);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
