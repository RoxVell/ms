import { Injectable } from '@nestjs/common';
import { CreateWindowDto } from './dto/create-window.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Window } from './windows.model';

@Injectable()
export class WindowsService {
  constructor(@InjectModel(Window) private windowsRepository: typeof Window) {}

  create(dto: CreateWindowDto) {
    // dto
    console.log(dto)
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
    return this.windowsRepository.destroy({ where: { id } })
  }
}
