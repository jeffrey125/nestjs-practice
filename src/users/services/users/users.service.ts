import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

/*
  NOTES 

  This file defines the business logic of the app

  All things related on querying on db, calling external api and etc.

*/

@Injectable()
export class UsersService {
  constructor(
    // Injecting a repository to interact on our DB using typeorm
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async getUsers() {
    try {
      const userList = await this.userRepository.find();

      return {
        status: HttpStatus.OK,
        count: userList.length,
        data: userList,
      };
    } catch (err) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
        data: null,
      };
    }
  }

  public async createUser(userDetails: CreateUserParams) {
    try {
      // Create method just creates an entity
      const newUser = this.userRepository.create({
        ...userDetails,
        createdAt: new Date(),
      });

      // HASH the password

      const saveUser = await this.userRepository.save(newUser);

      return {
        status: HttpStatus.CREATED,
        message: 'Success to create user!',
        data: saveUser,
      };
    } catch (err) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong!',
        data: null,
      };
    }
  }
}
