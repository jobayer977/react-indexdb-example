/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './../ENV';

@Module({
    imports: [TypeOrmModule.forRoot(ormConfig)],

})
export class DatabaseModule {}
