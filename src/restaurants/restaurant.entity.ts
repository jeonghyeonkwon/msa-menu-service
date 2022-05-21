import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Foods } from '../foods/foods.entity';

@Entity()
export class Restaurant {
  @PrimaryColumn()
  restaurantId: string;

  @Column()
  restaurantName: string;

  @Column()
  ownerId: string;

  @OneToMany(() => Foods, (foods) => foods.restaurant)
  foods: Foods[];
}
