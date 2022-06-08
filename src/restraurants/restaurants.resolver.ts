import { Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurants.entity';

@Resolver()
// @Resolver(of => Restaurant)
// 둘 중 어느 방식으로 작성해도 문제없다.
// 중요한 것은 바로 밑에서 작성하는 @Query의 argument이다.
export class RestaurantsResolver {
  @Query(() => Restaurant)
  myRestaurant() {
    return true;
  }
}
