import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import CreateServiceDto from './dto/create-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Delete('/:id')
  async deleteServices(@Param() params) {
    return await this.servicesService.deleteService(params.id);
  }

  @Get('/')
  getServices(@Query('isGroup') isGroup: boolean) {
    return this.servicesService.getServices(isGroup);
  }

  @Post('/')
  createService(@Body() serviceDto: CreateServiceDto) {
    return this.servicesService.createService(serviceDto);
  }

  @Put('/:id')
  async editService(@Param() params, @Body() serviceDto: CreateServiceDto) {
    return await this.servicesService.editService(params.id, serviceDto);
  }
}
