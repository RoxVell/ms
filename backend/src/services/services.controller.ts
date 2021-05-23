import { Body, Controller, Post } from '@nestjs/common';
import { ServicesService } from "./services.service";
import CreateServiceDto from "./dto/create-service.dto";

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {
  }

  @Post('/')
  createService(@Body() serviceDto: CreateServiceDto) {
    return this.servicesService.createService(serviceDto);
  }
}
