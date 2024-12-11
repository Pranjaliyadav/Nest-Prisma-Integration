import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      name: 'Alice Johnson',
      id: 1,
      email: 'alice.johnson@example.com',
      role: 'RM',
    },
    { name: 'Bob Smith', id: 5, email: 'bob.smith@example.com', role: 'ARM' },
    {
      name: 'Charlie Brown',
      id: 2,
      email: 'charlie.brown@example.com',
      role: 'CST',
    },
    {
      name: 'Diana Prince',
      id: 3,
      email: 'diana.prince@example.com',
      role: 'RM',
    },
    {
      name: 'Evan Taylor',
      id: 4,
      email: 'evan.taylor@example.com',
      role: 'ARM',
    },
  ];

  findAllUsers(role?: 'RM' | 'ARM' | 'CST') {
    if (role) {
      const roleArray = this.users.filter((rec) => rec.role === role);
      if (roleArray?.length === 0) {
        throw new NotFoundException('User role not found');
      }
      return roleArray;
    }
    return this.users;
  }

  findOneUser(id: number) {
    const user = this.users.find((rec) => rec.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  createUser(createUserDataDto: CreateUserDto) {
    const latestPreviousUser = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: latestPreviousUser[0].id + 1,
      ...createUserDataDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, userUpdatedDataDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdatedDataDto };
      }
      return user;
    });

    return this.findOneUser(id);
  }

  deleteUser(id: number) {
    const removedUser = this.findOneUser(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
