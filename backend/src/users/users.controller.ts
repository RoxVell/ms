import { BadRequestException, Body, Controller, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteUser(@Param() params) {
    try {
      return await this.usersService.deleteUser(params.id);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async editUser(@Param() params, @Body() data: CreateUserDto) {
    try {
      return await this.usersService.editUser(params.id, data);
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
