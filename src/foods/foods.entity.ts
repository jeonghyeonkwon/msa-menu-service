import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Restaurant } from '../restaurants/restaurant.entity';
import { JoinColumn } from 'typeorm';

@Entity()
export class Foods {
  @Column()
  foodName: string;

  @Column()
  foodPrice: number;

  @PrimaryColumn()
  foodId: string;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Restaurant;
}
