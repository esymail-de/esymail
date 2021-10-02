import { Roles } from 'src/auth/roles';
import { Column, CreateDateColumn, ObjectID, UpdateDateColumn } from 'typeorm';

export class ScopeEntity {
  @Column()
  companies: ObjectID[];

  @Column()
  servers: ObjectID[];

  @Column()
  role: Roles;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
