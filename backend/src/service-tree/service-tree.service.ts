import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ServiceTree } from './service-tree.model';
import { CreateServiceTreeDto } from './dto/create-service-tree.dto';
import { ServicesService } from '../services/services.service';
import { Op } from 'sequelize';

@Injectable()
export class ServiceTreeService {
  constructor(
    @InjectModel(ServiceTree) private serviceTreeRepository: typeof ServiceTree,
    private servicesService: ServicesService,
  ) {}

  getTree() {
    return this.serviceTreeRepository.findAll();
  }

  getById(id: number) {
    return this.serviceTreeRepository.findOne({ where: { id } });
  }

  async add(dto: CreateServiceTreeDto) {
    const isServiceExists = await this.servicesService.isExists(dto.service_id);

    if (!isServiceExists) {
      throw new HttpException('Service is not exists', HttpStatus.BAD_REQUEST);
    }

    let parentServiceTreeEntity;

    if (typeof dto.parent_id === 'number') {
      parentServiceTreeEntity = await this.getById(dto.parent_id);

      const isServiceGroup = await this.servicesService.isGroup(
        parentServiceTreeEntity.service_id,
      );

      if (!isServiceGroup) {
        throw new HttpException(
          'Parent is not a group',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return this.serviceTreeRepository.create({
      path: `${parentServiceTreeEntity ? parentServiceTreeEntity.path : ''}${
        dto.service_id
      }/`,
      service_id: dto.service_id,
    });
  }

  async deletePath(path: string) {
    const deletedItems = await this.serviceTreeRepository.destroy({
      where: {
        path: {
          [Op.like]: `${path}%`,
        },
      },
    });

    console.log(`Удалено ${deletedItems} элементов`);

    return deletedItems;
  }
}
