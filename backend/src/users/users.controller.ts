import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/operator')
  createOperator(@Body() userDto: CreateUserDto) {
    console.log(userDto);
    return this.usersService.createOperator(userDto);
  }

  @Get('/operators')
  async getOperators() {
    return await this.usersService.getOperators();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteOperator(@Param() params) {
    return await this.usersService.deleteUser(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async editOperator(@Param() params, @Body() data: CreateUserDto) {
    return await this.usersService.editUser(params.id, data);
  }
}
