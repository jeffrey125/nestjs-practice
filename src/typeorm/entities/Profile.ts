import { Entity, Column } from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity({ name: 'user_profiles' })
export class Profile extends BaseModel {
  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  userImage: string;

  @Column({ type: 'text', nullable: true })
  bio: string;
}
