import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Gender } from '../enum/user.enum';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: null })
  phoneNumber: string;
  
  @Column({ type: 'enum', enum: Gender, nullable: true, default: null })
  gender: Gender;
}
