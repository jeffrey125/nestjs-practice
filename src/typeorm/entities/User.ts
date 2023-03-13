import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Entity decorator tells the typeorm that the class will be a table
@Entity({ name: 'users' })
export class User {
  // Primary Key of the table (auto-increment)
  @PrimaryGeneratedColumn()
  id: number;

  // Create a new column on the table
  // You can also pass inside in the decorator for the colum properties
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;
}
