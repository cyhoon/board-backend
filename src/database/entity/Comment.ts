import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import User from './User';
import Post from './Post';

@Entity({ name: 'comments' })
class Comment {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'content' })
  content: string;

  @CreateDateColumn({ type: 'timestamp', name: 'write_date' })
  writeDate: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_date' })
  updateDate: Date;

  @ManyToOne(type => Post, post => post.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_post_id' })
  post: Post;

  @ManyToOne(type => User, writer => writer.id)
  @JoinColumn({ name: 'fk_writer_id' })
  writer: User;
}

export default Comment;
