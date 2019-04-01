import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

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

  @CreateDateColumn({ type: 'timestamp', name: 'write_date' })
  writeDate: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_date' })
  updateDate: Date;

  @ManyToOne(type => User, writer => writer.id)
  @JoinColumn({ name: 'fk_writer_id' })
  writer: User;

  @OneToMany(type => Comment, comment => comment.post, { cascade: true, onDelete: 'CASCADE' })
  comments: Comment[];
}

export default Post;
