import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateUserDTO,
  GetUserByIdDTO,
  UpdateUserDTO,
} from 'src/users/dtos/User.dto';
import { UsersService } from 'src/users/services/users/users.service';

/*
  NOTES 

  This file defines the route of the app

*/

@Controller('users')
export class UsersController {
  // We define a constructor to get the business logic from the user services folder
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUsersById(@Param() id: GetUserByIdDTO['id']) {
    return this.userService.getUserById({ id });
  }

  @Put('/:id')
  updateUser(@Param() id: number, @Body() reqBody: UpdateUserDTO) {
    return this.userService.updateUser({ id, ...reqBody });
  }

  @Delete('/:id')
  deleteUser(@Param() id: UpdateUserDTO['id']) {
    return this.userService.deleteUser({ id });
  }

  @Post()
  createUser(@Body() createUserBody: CreateUserDTO) {
    return this.userService.createUser(createUserBody);
  }
}
