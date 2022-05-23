export class FoodResponseDto{
  foodName:string;
  foodPrice:number;
  foodId:string;
  constructor(data) {
    this.foodName = data.foodName;
    this.foodPrice = data.foodPrice;
    this.foodId = data.foodId;
  }
}