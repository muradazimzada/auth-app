import { Injectable } from '@nestjs/common';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  email: string;

  @Column()
  passwordHash: string;
}
