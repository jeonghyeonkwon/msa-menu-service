export abstract class PageRequest {
  pageNo: number | 1;
  pageSize: number | 1;

  getOffset(): number {
    return (this.pageNo - 1) * this.pageSize;
  }
  getLimit(): number {
    return this.pageSize;
  }
}
