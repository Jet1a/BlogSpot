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

export interface IBlogs {
  success: boolean;
  message: string;
  count: number;
  blogs: IBlog[];
}
