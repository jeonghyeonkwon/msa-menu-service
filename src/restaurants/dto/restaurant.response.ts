export class RestaurantResponseDto {
  restaurantId: string;
  restaurantName: string;

  constructor(data) {
    this.restaurantId = data.restaurantId;
    this.restaurantName = data.restaurantName;
  }
}
