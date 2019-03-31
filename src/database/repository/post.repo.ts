import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entity';

@EntityRepository(Post)
class PostRepository extends Repository<Post> {}

export default PostRepository;
