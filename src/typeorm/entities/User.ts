import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Profile } from './Profile';
import { Post } from './Post';

// Entity decorator tells the typeorm that the class will be a table
@Entity({ name: 'users' })
export class User extends BaseModel {
  // Create a new column on the table
  // You can also pass inside in the decorator for the colum properties
  @Column({ type: 'varchar', length: 50, unique: false })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({
    type: 'varchar',
    name: 'auth_strategy',
    length: 255,
    nullable: true,
  })
  authStrategy: string;

  @OneToOne(() => Profile, { cascade: ['remove', 'update'] })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user, { cascade: ['remove', 'update'] })
  @JoinColumn()
  posts: Post[];
}
