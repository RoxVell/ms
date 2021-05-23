import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './service.model';
import CreateServiceDto from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service) private servicesRepository: typeof Service,
  ) {}

  async createService(serviceDto: CreateServiceDto) {
    return await this.servicesRepository.create(serviceDto);
  }
}
