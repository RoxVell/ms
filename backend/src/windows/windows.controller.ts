import {
  BadRequestException,
  Body,
  Controller, Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateWindowDto } from './dto/create-window.dto';
import { WindowsService } from './windows.service';

@Controller('windows')
export class WindowsController {
  constructor(private windowsService: WindowsService) {}

  @Post('/')
  async createWindow(@Body() dto: CreateWindowDto) {
    try {
      return await this.windowsService.create(dto);
    } catch (e) {
      console.log(e)
      throw new BadRequestException();
    }
  }

  @Put('/:id')
  async editWindow(@Param() params, @Body() dto: CreateWindowDto) {
    try {
      return await this.windowsService.edit(params.id, dto);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @Get('/')
  getAll() {
    try {
      return this.windowsService.getAll();
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @Delete('/:id')
  deleteWindow(@Param() params) {
    try {
      return this.windowsService.delete(params.id);
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
