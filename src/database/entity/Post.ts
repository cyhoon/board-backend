import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import User from './User';
import Comment from './Comment';

@Entity({ name: 'posts' })
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'write_date' })
  writeDate: Date;

  @ManyToOne(type => User, writer => writer.id)
  @JoinColumn({ name: 'fk_writer_id' })
  writer: User;

  @OneToMany(type => Comment, comment => comment.post, { cascade: true })
  comments: Comment[];
}

export default Post;
