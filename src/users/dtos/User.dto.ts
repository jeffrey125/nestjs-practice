// This file defines the incoming payload type
// You can also use a validation here using Class validator

export class CreateUserDTO {
  username: string;
  password: string;
}

export class GetUserByIdDTO {
  id: number;
}

export class UpdateUserDTO extends CreateUserDTO {
  id: number;
}

export class DeleteUserDTO extends GetUserByIdDTO {}

export class CreateUserProfileDTO extends GetUserByIdDTO {
  firstName: string;
  lastName: string;
  userImage: string;
  bio: string;
}

export class CreateUserPostDTO extends GetUserByIdDTO {
  title: string;
  description: string;
}
