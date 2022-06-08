import { Args, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurants.entity';

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
  @Query(() => [Restaurant])
  Restaurant(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    return [];
  }
}
