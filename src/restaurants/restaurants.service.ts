import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurants.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    // Data Mapper 방식에서는, Service에 Repository를 주입해야 한다.
    // 따라서 constructor에 @InjectRepository() 사용해서 repository를 생성해야 한다.
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
    // 이는 새로운 instance를 생성하는 것이다. DB는 전혀 건들지 않는다.
    // 여기에 있는 restaurant는 그저 javascript에서만 존재하고, DB에 실제로 저장되어 있지는 않다.
    // DB에 저장하고 싶다면 save method를 사용해야 한다.
    return this.restaurantRepository.save(newRestaurant);
  }
  updateRestaurant({ id, data }: UpdateRestaurantDto) {
    return this.restaurantRepository.update(id, { ...data });
  }
}
