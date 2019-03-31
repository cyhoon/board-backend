import { EntityRepository, Repository } from 'typeorm';
import { Test } from '../entity';

@EntityRepository(Test)
class TestRepository extends Repository<Test> {
  findByName(name: string) {
    return this.findOne({ name });
  }
}

export default TestRepository;
