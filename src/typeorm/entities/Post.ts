import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './BaseModel';
import { User } from './User';

@Entity({ name: 'user_post' })
export class Post extends BaseModel {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  // This is how you set up the Many to One | One to Many relationship
  // NOTES second argument points out the reference of the model of the Parent/Children Entity
  @ManyToOne(() => User, (user) => user.posts, {
    cascade: ['remove', 'update'],
  })
  user: User;
}
