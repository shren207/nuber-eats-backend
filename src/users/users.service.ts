import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({ email, password, role }: CreateAccountInput) {
    // check new users
    // create users
    try {
      const exists = await this.users.findOneBy({ email });
      // findOne 사용하면 에러난다. 공홈보니까 더 이상 지원안하는듯.
      if (exists) {
        return;
      }
      await this.users.save(this.users.create({ email, password, role }));
      return true;
      // create()와 save()는 다르다는 것을 꼭 명심할 것.
    } catch (e) {
      // make error
      return;
    }
    // & hash the password (이 기능은 createAccount인 여기서 일어나지는 않을 것이다)
  }
}
