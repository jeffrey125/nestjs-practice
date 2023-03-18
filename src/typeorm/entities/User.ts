import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Entity decorator tells the typeorm that the class will be a table
@Entity({ name: 'users' })
export class User {
  // Primary Key of the table (auto-increment)
  @PrimaryGeneratedColumn()
  id: number;

  // Create a new column on the table
  // You can also pass inside in the decorator for the colum properties
  @Column({ type: 'varchar', length: 50, unique: false })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  // Date Columns are needs for Insert, Update and Delete
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({
    type: 'datetime',
    name: 'deleted_at',
    default: null,
    nullable: true,
  })
  deletedAt: string;

  @Column({
    type: 'varchar',
    name: 'auth_strategy',
    length: 255,
    nullable: true,
  })
  authStrategy: string;
}
