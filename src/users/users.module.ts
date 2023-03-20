import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { Profile } from 'src/typeorm/entities/Profile';
import { Post } from 'src/typeorm/entities/Post';

@Module({
  // Imports field are values that are going to be used on our users.service
  imports: [
    // We import our User entity like this so it can be used on our user.service
    // TypeOrmModule.forFeature imports entity
    TypeOrmModule.forFeature([User, Profile, Post]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
