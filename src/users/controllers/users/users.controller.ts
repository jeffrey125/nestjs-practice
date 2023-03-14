import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/CreateUser.dto';
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

  @Post()
  createUser(@Body() createUserBody: CreateUserDTO) {
    return this.userService.createUser(createUserBody);
  }
}
