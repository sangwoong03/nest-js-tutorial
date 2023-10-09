import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';

import { Gender } from '../enum/user.enum';
import { SignUpInputField } from '../dto/signup.dto';

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  email: string;
  
  @Column()
  password: string;
  
  @Column({ nullable: true, default: null })
  phoneNumber: string;

  @Column({ nullable: true, default: null })
  birthdate: string;
  
  @Column({ type: 'enum', enum: Gender, nullable: true, default: null })
  gender: Gender;

  constructor(data: SignUpInputField) {
    this.name = data.name,
    this.email = data.email,
    this.password = data.hashPassword
    this.phoneNumber = data.phoneNumber || null;
    this.birthdate = data.birthdate || null;
    this.gender = data.gender || null;
  }
}