import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import Post from './Post';
import Comment from './Comment';

@Entity({ name: 'users' })
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'join_date' })
  joinDate: Date;

  @OneToMany(type => Post, post => post.writer, { cascade: true })
  posts: Post[];

  @OneToMany(type => Comment, comment => comment.writer, { cascade: true })
  comments: Comment[];
}

export default User;
