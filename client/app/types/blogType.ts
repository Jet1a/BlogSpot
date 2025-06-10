export interface IBlog {
  _id: string;
  imageUrl: string;
  title: string;
  author: string;
  content: string;
  user: string;
  createdOn: string;
  updatedOn: string;
}

export interface IPaginationBlogs {
  success: boolean;
  message: string;
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
  docs: IBlog[];
}

export interface IBlogs {
  success: boolean;
  message: string;
  count: number;
  blogs: IBlog[];
}
