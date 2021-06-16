import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './service.model';
import CreateServiceDto from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service) private servicesRepository: typeof Service,
  ) {}

  createService(serviceDto: CreateServiceDto) {
    return this.servicesRepository.create(serviceDto);
  }

  async editService(id: number, serviceDto: CreateServiceDto) {
    const service = await this.servicesRepository.findOne({ where: { id } });

    if (!service) throw new Error(`Service doesn't exist`);

    return service.update(serviceDto);
  }

  getServices(isGroup: boolean) {
    if (['true', 'false'].includes(String(isGroup))) {
      return this.servicesRepository.findAll({ where: { isGroup } });
    } else {
      return this.servicesRepository.findAll();
    }
  }

  async getServiceById(id: number) {
    return this.servicesRepository.findOne({ where: { id } });
  }

  deleteService(id: number) {
    return this.servicesRepository.destroy({ where: { id } });
  }

  async isGroup(id: number) {
    const targetService = await this.servicesRepository.findOne({ where: { id } });
    return targetService.isGroup;
  }

  async isExists(id: number) {
    const target = await this.servicesRepository.findOne({ where: { id } });
    return Boolean(target);
  }
}
