import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ServiceTreeService } from "./service-tree.service";
import { CreateServiceTreeDto } from "./dto/create-service-tree.dto";

@Controller('service-tree')
export class ServiceTreeController {
  constructor(
    private serviceTreeService: ServiceTreeService
  ) {}

  @Get('/')
  async getTree() {
    try {
      return await this.serviceTreeService.getTree();
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @Post('/')
  async add(@Body() body: CreateServiceTreeDto) {
    try {
      return await this.serviceTreeService.add(body);
    } catch (e) {
      console.error(e);
      throw e;
      // throw new BadRequestException();
    }
  }

  @Delete('/')
  async deletePath(@Query() query) {
    try {
      return await this.serviceTreeService.deletePath(query.path);
    } catch (e) {
      throw e;
    }
  }
}
