import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurants.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }
  createRestaurant(
    // 여기서 @Args는 사용하지 않는다. 그것은 @nestjs/graphql에서 온 것이다. 즉, resolver를 작성할 때 사용하는 것이다.
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurantRepository.create(createRestaurantDto);
    console.log(newRestaurant);
    // 이는 새로운 instance를 생성하는 것이다. DB는 전혀 건들지 않는다.
    // 여기에 있는 restaurant는 그저 javascript에서만 존재하고, DB에 실제로 저장되어 있지는 않다.
    // DB에 저장하고 싶다면 save method를 사용해야 한다.
    return this.restaurantRepository.save(newRestaurant);
  }
}
