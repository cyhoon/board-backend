import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tests' })
class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;
}

export default Test;
