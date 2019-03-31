import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import User from './User';
import Post from './Post';

@Entity({ name: 'comments' })
class Comment {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'write_date' })
  writeDate: Date;

  @ManyToOne(type => Post, post => post.id)
  @JoinColumn({ name: 'fk_post_id' })
  post: Post;

  @ManyToOne(type => User, writer => writer.id)
  @JoinColumn({ name: 'fk_writer_id' })
  writer: User;
}

export default Comment;
