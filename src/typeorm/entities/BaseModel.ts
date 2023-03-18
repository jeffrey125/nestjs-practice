import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class BaseModel extends BaseEntity {
  // Primary key that autoincrements type int
  @PrimaryGeneratedColumn()
  id: number;

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
}
