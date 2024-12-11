
import {PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './createUser.dto';

export class UpdateUserDto extends PartialType(CreateUserDto){
    //we have extended, but the keys used in createuser dto are optional in updatedUserDto because of partial type
}