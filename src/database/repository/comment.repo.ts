import { EntityRepository, Repository } from 'typeorm';
import { Comment } from '../entity';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {}

export default CommentRepository;
