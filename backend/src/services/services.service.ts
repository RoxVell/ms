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

  async editService(id: number, serviceDto: CreateServiceDto) {
    const service = await this.servicesRepository.findOne({ where: { id } });

    if (!service) throw new Error(`Service doesn't exist`);

    return service.update(serviceDto);
  }

  async getServices(isGroup: boolean) {
    return this.servicesRepository.findAll({ where: { isGroup } });
  }

  deleteService(id: number) {
    return this.servicesRepository.destroy({ where: { id }});
  }
}
