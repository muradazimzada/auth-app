import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUserByEmail(userEmail: string) {
    return await this.userRepository.getByEmail(userEmail);
  }
  async addUser(user: User) {
    return await this.userRepository.add(user);
  }
  async getAll() {
    return await this.userRepository.findAll();
  }
}
