import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private suitRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.suitRepository.find();
  }

  async findOne(_id: ObjectID): Promise<User> {
    return this.suitRepository.findOneBy({ _id });
  }
  async add(suit: User): Promise<User> {
    await this.suitRepository.insert(suit);
    return this.findOne(suit._id);
  }
  async getByEmail(userEmail: string): Promise<User> {
    return await this.suitRepository.findOne({
      where: {
        email: userEmail,
      },
    });
  }
  //   async remove(id: string): Promise<void> {
  //     await this.usersRepository.delete(id);
  //   }
}
