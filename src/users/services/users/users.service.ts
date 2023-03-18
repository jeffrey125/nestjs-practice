import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import {
  DeleteUserDTO,
  GetUserByIdDTO,
  UpdateUserDTO,
} from 'src/users/dtos/User.dto';
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

  private genericError(err: Error) {
    console.log(err);

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: err?.message || 'Something went wrong!',
      data: null,
    };
  }

  public async getUsers() {
    try {
      const userList = await this.userRepository.find();

      return {
        status: HttpStatus.OK,
        count: userList.length,
        data: userList,
      };
    } catch (err) {
      return this.genericError(err);
    }
  }

  public async createUser(userDetails: CreateUserParams) {
    try {
      // Create method just creates an entity
      const newUser = this.userRepository.create({
        ...userDetails,
        createdAt: new Date(),
      });

      // NOTES in real world app we need to hash the password
      const saveUser = await this.userRepository.save(newUser);

      return {
        status: HttpStatus.CREATED,
        message: 'Success to create user!',
        data: saveUser,
      };
    } catch (err) {
      return this.genericError(err);
    }
  }

  public async getUserById({ id }: GetUserByIdDTO) {
    try {
      const selectedUser = await this.userRepository.findOneBy({ id });

      console.log(selectedUser);

      return selectedUser;
    } catch (err) {
      return this.genericError(err);
    }
  }

  public async updateUser({ id, ...newUserData }: UpdateUserDTO) {
    try {
      await this.getUserById({ id });
      await this.userRepository.update({ id }, { ...newUserData });

      return {
        status: HttpStatus.OK,
        error: '',
        data: newUserData,
      };
    } catch (err) {
      return this.genericError(err);
    }
  }

  public async deleteUser({ id }: DeleteUserDTO) {
    try {
      const deletedUser = await this.userRepository
        .exist({ where: { id } })
        .then(
          async (val) =>
            val.valueOf() && (await this.userRepository.softDelete({ id })),
        )
        .catch((reason) => {
          throw reason;
        });

      return deletedUser
        ? {
            status: HttpStatus.NO_CONTENT,
            error: '',
          }
        : {
            status: HttpStatus.NOT_FOUND,
            error: 'User Not Found!',
          };
    } catch (err) {
      return this.genericError(err);
    }
  }
}
