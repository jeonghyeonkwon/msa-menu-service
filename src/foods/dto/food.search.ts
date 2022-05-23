import { PageRequest } from '../../commons/pagenation.option';

export class FoodSearchOption extends PageRequest {
  constructor() {
    super();
  }
  static create(pageNo: number, pageSize: number) {
    const param = new FoodSearchOption();
    param.pageNo = pageNo;
    param.pageSize = pageSize;
    return param;
  }
}
