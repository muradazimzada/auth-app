import { Controller, Get, HttpCode, HttpStatus, Inject, ParseEnumPipe, Post } from '@nestjs/common';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { ClientProxy } from '@nestjs/microservices';
import { STATUS_CODES } from 'http';
import { emitWarning } from 'process';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, @Inject('Mail_Service') private readonly client: ClientProxy) {}
  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  } 
  @Get('getByEmail/:email')
  async getUserByEmail(@Param('email') email): Promise<User> {
    //  console.log(email); 
    return await this.userService.getUserByEmail(email); 
  }  
  @Get('forgetEmail/:email') // send success or bad request
  async searchForEmail(@Param('email') email)  {
     const user = await this.userService.getUserByEmail(email);
     if(user == null) return HttpStatus.BAD_REQUEST;
     
     // if user exists 

     this.sendToUserQueue(user);

 
  } 
  @Post('addUser')  
  async addUser(@Body() user: User) { 
    console.log(user); 
    return await this.userService.addUser(user); 
  }

  //@EventPattern('sendToUsersQueue') 
   async sendToUserQueue(user: User) {
     this.client.emit('forgetPasswordEvent', user);
   }
}
