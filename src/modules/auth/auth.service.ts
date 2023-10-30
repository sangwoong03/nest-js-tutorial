import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { SignUpInputDto, SignUpOutputDto } from './dto/signup.dto';
import { User } from './entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource
  ) { }

  async signup(body: SignUpInputDto): Promise<SignUpOutputDto> {
    
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try{
      const { name, email, password, phoneNumber, birthdate, gender } = body;
      const user = await this.userRepository.findOne({ where: { email: email } })

      if ( user ) throw new ConflictException();

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, email, hashPassword, phoneNumber, birthdate, gender })

      await queryRunner.manager.save(User, newUser)

      const result = {
        account: {
          name: name,
          email: email
        }
      }

      await queryRunner.commitTransaction();

      return result
    } catch(error) {
      console.error(error);
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
