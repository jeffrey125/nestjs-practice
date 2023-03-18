import { Entity, Column } from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity({ name: 'user_profiles' })
export class Profile extends BaseModel {
  @Column({ type: 'varchar', length: 255, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 255, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'user_image' })
  userImage: string;

  @Column({ type: 'text', nullable: true })
  bio: string;
}
