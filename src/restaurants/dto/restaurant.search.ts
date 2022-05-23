import { PageRequest } from '../../commons/pagenation.option';

export class RestaurantSearchOption extends PageRequest {
  restaurantName: string | null;

  constructor() {
    super();
  }
  static create(
    restaurantName: string | null,
    pageNo: number,
    pageSize: number,
  ) {
    const param = new RestaurantSearchOption();
    param.restaurantName = restaurantName;
    param.pageNo = pageNo;
    param.pageSize = pageSize;
    return param;
  }
  hasRestaurantName(): boolean {
    return this.restaurantName != null;
  }
}
