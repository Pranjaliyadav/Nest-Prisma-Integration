import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // /users
  findAllUsers(@Query('role') role?: 'RM' | 'ARM' | 'CST') {
    return this.usersService.findAllUsers(role);
  }

  @Get(':id') // /users/:id
  findOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneUser(id);
  }

  @Post() //post /users
  createUser(
    @Body(ValidationPipe)
    userData: CreateUserDto,
  ) {
    return this.usersService.createUser(userData);
  }

  @Patch(':id') //patch /users/:id
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    userUpdateData: UpdateUserDto,
  ) {
    return this.usersService.updateUser(+id, userUpdateData)
  }

  @Delete(':id') //delete /users/:id
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(+id);
  }
}
