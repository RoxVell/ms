import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class OperatorsService {
  constructor(private usersService: UsersService) {}

  getOperators() {
    return this.usersService.getUsersWithRole('operator');
  }

  create(operatorDto: Omit<CreateUserDto, 'role'>) {
    return this.usersService.createUser({
      ...operatorDto,
      role: 'operator',
    });
  }
}
