import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWindowDto } from './dto/create-window.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Window } from './windows.model';
import { WindowType } from './windows-types.model';
import { CreateWindowTypeDto } from "./dto/create-window-type.dto";

@Injectable()
export class WindowsService {
  constructor(
    @InjectModel(Window) private windowsRepository: typeof Window,
    @InjectModel(WindowType) private windowTypesRepository: typeof WindowType,
  ) {}

  async create(dto: CreateWindowDto) {
    const isWindowTypeExists = await this.isWindowTypeExists(dto.type);

    if (!isWindowTypeExists) {
      throw new BadRequestException(`Window type '${dto.type}' doesn't exists`);
    }

    return this.windowsRepository.create(dto);
  }

  async edit(id: number, dto: CreateWindowDto) {
    const windowToEdit = await this.windowsRepository.findOne({
      where: { id },
    });

    if (!windowToEdit) throw new Error(`Window doesn't exist`);

    return windowToEdit.update(dto);
  }

  getAll() {
    return this.windowsRepository.findAll();
  }

  delete(id: number) {
    return this.windowsRepository.destroy({ where: { id } });
  }

  async isWindowTypeExists(windowType: string) {
    const target = await this.windowTypesRepository.findOne({
      where: { value: windowType },
    });
    return Boolean(target);
  }

  createWindowType(dto: CreateWindowTypeDto) {
    return this.windowTypesRepository.create(dto);
  }
}
