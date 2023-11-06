import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { SignUpInputDto, SignUpOutputDto } from './dto/signup.dto';
import { SignInInputDto, SignInOutputDto } from './dto/signin.dto';
import { User } from './entity/user.entity';
import { JwtConfig } from 'src/config/config';

@Injectable()
export class AuthService {
  private accessTokenSecret: string;
  private accessTokenExpiration: string;
  private refreshTokenSecret: string;
  private refreshTokenExpiration: string;
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {
    const { accessTokenSecret,
    accessTokenExpiration,
    refreshTokenSecret, 
    refreshTokenExpiration,
    } = this.configService.get<JwtConfig>('app.jwt')

    this.accessTokenSecret = accessTokenSecret
    this.accessTokenExpiration = accessTokenExpiration
    this.refreshTokenSecret = refreshTokenSecret
    this.refreshTokenExpiration = refreshTokenExpiration
  }
  
  private async createAccessToken(userId: number): Promise<string> {
    return this.jwtService.sign({ userId }, {
      secret : this.accessTokenSecret,
      expiresIn : this.accessTokenExpiration
    });
  }

  private async createRefreshToken(userId: number): Promise<string> {
    return this.jwtService.sign({ userId }, {
      secret : this.refreshTokenSecret,
      expiresIn : this.refreshTokenExpiration
    });
  }


  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async signup(signUpInputData: SignUpInputDto): Promise<SignUpOutputDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try{
      const { name, email, password } = signUpInputData;
      const user = await this.getUserByEmail(email);

      if ( user ) throw new ConflictException();

      const hashPassword = await bcrypt.hash(password, 10);

      signUpInputData.password = hashPassword
      await this.userRepository.insert(signUpInputData)

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

  async signin(signInInputData: SignInInputDto): Promise<SignInOutputDto> {
    try{
      const { email, password } = signInInputData;
      
      const user = await this.userRepository.findOne({ where: { email: email } })
      if ( !user ) throw new NotFoundException();

      const hashedPassword = user.password.toString()
      const isVerifiedPassword = await bcrypt.compare(password, hashedPassword)
      if ( !isVerifiedPassword ) throw new UnauthorizedException();

      const [ accessToken, refreshToken ] = await Promise.all([
        this.createAccessToken(user.id),
        this.createRefreshToken(user.id)
      ])

      return { accessToken, refreshToken }
    } catch(error) {
      console.error(error);
      throw error;
    }
  }
}
