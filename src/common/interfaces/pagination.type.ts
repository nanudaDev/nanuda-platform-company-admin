// import { Default } from '..';

export class PaginatedResponse<T> {
  items!: T[];
  totalCount!: number;
}

export class Pagination {
  limit: number;
  page = 1;
  totalCount?: number;
  constructor(limit = 10) {
    this.limit = limit;
  }
}
