import { Query } from '@src/models';

/* eslint-disable @typescript-eslint/no-explicit-any */
const isNumber = (value: any) => !Number.isNaN(parseFloat(value)) && Number.isFinite(value);

const getNumberIfValid = (value: any) => (isNumber(value) ? parseFloat(value) : null);

const getNumberIfPositive = (value: any) => {
  const n = getNumberIfValid(value);
  return n && n >= 0 ? n : null;
};

const pageNumber = (page: number | any, size: number | any) => (page - 1) * size;

const paginate = (params: Query) => {
  let limit = 10;
  let offset = 0;
  if (params.page_size) {
    limit = getNumberIfPositive(params.page_size) || limit;
  }
  if (params.page) {
    offset = pageNumber(getNumberIfPositive(params.page), limit);
  } else if (params.offset) {
    offset = getNumberIfPositive(params.offset) || offset;
  }
  return { limit, offset };
};

const sortBy = (params: Query) => {
  let sort = 'updatedAt';
  let dir = 'ASC';
  if (params.order) {
    sort = params.order;
  }
  if (params.sort_dir) {
    dir = params.sort_dir.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  }
  return { sort, dir };
};

export { paginate, sortBy };
