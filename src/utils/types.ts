// NOTES we created a seperate types for create use since we only want to define the types where it will be stored on the DB

export type CreateUserParams = {
  username: string;
  password: string;
};
