import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ScopeEntity } from './scope.entity';

@Entity('user')
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @JoinColumn()
  scope: ScopeEntity;
}
