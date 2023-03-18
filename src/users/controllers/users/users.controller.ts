import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateUserDTO,
  CreateUserProfileDTO,
  DeleteUserDTO,
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

  @Post()
  createUser(@Body() createUserBody: CreateUserDTO) {
    return this.userService.createUser(createUserBody);
  }

  @Get(':id')
  getUsersById(@Param('id', ParseIntPipe) id: GetUserByIdDTO['id']) {
    return this.userService.getUserById({ id });
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: UpdateUserDTO['id'],
    @Body() reqBody: UpdateUserDTO,
  ) {
    return this.userService.updateUser({ id, ...reqBody });
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: DeleteUserDTO['id']) {
    return this.userService.deleteUser({ id });
  }

  @Post(':id/profile')
  createUserProfile(
    @Param('id', ParseIntPipe) id: CreateUserProfileDTO['id'],
    @Body() createUserProfileBody: Omit<CreateUserProfileDTO, 'id'>,
  ) {
    return this.userService.createUserProfile({ id, ...createUserProfileBody });
  }
}
