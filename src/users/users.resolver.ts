import { Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Query } from '@nestjs/graphql';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}
  @Query((returns) => Boolean)
  hi() {
    return true;
  }
}
