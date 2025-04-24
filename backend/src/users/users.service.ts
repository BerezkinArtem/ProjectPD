import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from 'src/orm/user.entity';

import * as bcrypt from 'bcrypt';

import { RequestWithUser, Role, UpdateUserDto, UserAccountStatus } from 'src/common/types';

 

@Injectable()

export class UsersService {
  findById(id: number) {
      throw new Error('Method not implemented.');
  }

  constructor(

    @InjectRepository(User)

    private readonly userRepository: Repository<User>,

  ) {}

 

  async findOne(username: string): Promise<User | null> {

    return this.userRepository.findOneBy({ name: username });

  }

 

  async findOneById(id: number): Promise<User | null> {

    return this.userRepository.findOneBy({ id });

  }

  async getUserReference(id: number): Promise<User> {
    const user = new User();
    user.id = id;
    return user;
    // Или, если нужно больше полей:
    // return this.userRepository.findOne({ where: { id } });
  }

  async create(

    username: string,

    password: string,

    firstname: string,

    lastname: string,

    roles: Role[] = [Role.user],

    status = UserAccountStatus.pending,

  ): Promise<User> {

    const user = new User();

   

    user.firstname = firstname;

    user.lastname = lastname;

    user.passwordHash = await bcrypt.hash(password, 5);

    user.roles = roles;

    user.status = status;

    const createdUser = await this.userRepository.save(user);

    return createdUser;

  }
  public createUserFromRequest(userData: RequestWithUser['user']): User {
    const user = new User();
    user.id = userData.id;
    user.username = userData.username;
    user.firstname = userData.firstname;
    user.lastname = userData.lastname;
    user.roles = userData.roles;
    return user;
  }
 

  async setStatus(id: number, status: UserAccountStatus): Promise<void> {

    const user = await this.userRepository.findOneBy({ id: id });

    if (user) {

      user.status = status;

      await this.userRepository.save(user);

    }

  }

 

  async findAll() {

    return (await this.userRepository.find()).map((u) => u.getSecuredDto());

  }

 

  async update(id: number, updatedUserData: UpdateUserDto) {

    const user = await this.findOneById(id);

    if (user) {

      

      user.firstname = updatedUserData.firstname;

      user.lastname = updatedUserData.lastname;

      user.roles = updatedUserData.roles;

      user.status = updatedUserData.status;
      
      return await this.userRepository.save(user);

    }

    return;

  }

}