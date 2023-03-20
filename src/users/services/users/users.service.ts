import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import {
  CreateUserPostDTO,
  CreateUserProfileDTO,
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

enum ErrorTypesMessage {
  NOT_FOUND = 'Data Not Found!',
  GENERIC_ERROR = 'Something went wrong, please try again later!',
  BAD_REQUEST = 'Rejected due to Bad Request!',
}

@Injectable()
export class UsersService {
  constructor(
    // Injecting a repository to interact on our DB using typeorm
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private userProfileRepository: Repository<Profile>,
    @InjectRepository(Post)
    private userPostRepository: Repository<Post>,
  ) {}

  private genericError(err: Error) {
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (err.message === ErrorTypesMessage.NOT_FOUND)
      status = HttpStatus.NOT_FOUND;

    if (err.message === ErrorTypesMessage.BAD_REQUEST)
      status = HttpStatus.BAD_REQUEST;

    return {
      status,
      error: err?.message || ErrorTypesMessage.GENERIC_ERROR,
      data: null,
    };
  }

  public async getUsers() {
    try {
      const userList = await this.userRepository.find({
        select: {
          username: true,
          createdAt: true,
          id: true,
        },
      });

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
      });

      // NOTES in real world app we need to hash the password
      const saveUser = await this.userRepository.save(newUser);

      return {
        status: HttpStatus.CREATED,
        message: 'Success to create user!',
        data: {
          id: saveUser.id,
          username: saveUser.username,
          createdAt: saveUser.createdAt,
        },
      };
    } catch (err) {
      return this.genericError(err);
    }
  }

  public async getUserById({ id }: GetUserByIdDTO) {
    try {
      const selectedUser = await this.userRepository
        .findOneOrFail({
          where: { id },
          select: {
            username: true,
            createdAt: true,
            id: true,
          },
          relations: {
            profile: true,
          },
        })
        .catch(() => {
          throw new Error(ErrorTypesMessage.NOT_FOUND);
        });

      return {
        status: HttpStatus.OK,
        error: '',
        data: selectedUser,
      };
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
      const selectedUser = await this.getUserById({ id });

      if (selectedUser.status === HttpStatus.NOT_FOUND) {
        throw selectedUser.error;
      }

      await this.userRepository.softDelete({ id });

      return {
        status: HttpStatus.NO_CONTENT,
        error: '',
      };
    } catch (err) {
      return this.genericError(err);
    }
  }

  public async createUserProfile({
    id,
    ...userProfileDetails
  }: CreateUserProfileDTO) {
    try {
      const selectedUser = await this.userRepository.findOne({
        where: { id },
        relations: { profile: true },
      });

      if (!selectedUser.hasId()) {
        throw new Error(ErrorTypesMessage.NOT_FOUND);
      }

      if (selectedUser?.profile.id) {
        throw new Error(ErrorTypesMessage.BAD_REQUEST);
      }

      const newProfile = this.userProfileRepository.create(userProfileDetails);
      const userProfileData = await this.userProfileRepository.save(newProfile);

      const updatedUserData = {
        ...selectedUser,
        profile: userProfileData,
      };

      await this.userRepository.save(updatedUserData);

      return {
        status: HttpStatus.CREATED,
        message: 'Success to create user profile!',
        data: userProfileData,
      };
    } catch (err) {
      return this.genericError(err);
    }
  }

  public async createUserPost({ id, ...newUserPost }: CreateUserPostDTO) {
    try {
      if (!newUserPost.description || !newUserPost.title) {
        throw new Error(ErrorTypesMessage.BAD_REQUEST);
      }

      const userData = await this.userRepository.findOneBy({ id });

      if (!userData) {
        throw new Error(ErrorTypesMessage.NOT_FOUND);
      }

      const userPostData = await this.userPostRepository.save(newUserPost);
      const updatedUserData = {
        ...userData,
        posts: [...userData.posts, userPostData],
      };

      await this.userRepository.save(updatedUserData);
    } catch (err) {
      return this.genericError(err);
    }
  }
}
