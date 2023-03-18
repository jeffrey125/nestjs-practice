// This file defines the incoming payload type
// You can also use a validation here using JOI

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
