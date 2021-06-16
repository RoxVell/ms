import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { OperatorsService } from './operators.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('operators')
export class OperatorsController {
  constructor(private operatorsService: OperatorsService) {}

  @Get('/')
  async getOperators() {
    try {
      return await this.operatorsService.getOperators();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @Post('/')
  async createOperator(@Body() operatorDto: Omit<CreateUserDto, 'role'>) {
    try {
      return await this.operatorsService.create(operatorDto);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
