import axios from "axios";
import { IFormValues } from "../components/ui/Input";
import { ParamValue } from "next/dist/server/request/params";

export const getAllBlog = async (page?: number) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?page=${page}`
    );
    if (res.status !== 200) {
      throw new Error("Failed fetch all blogs");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching blogs", error);
    throw new Error("FError fetching blogs");
  }
};

export const getBlogById = async (blogId: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blogId}`
    );
    if (res.status !== 200) {
      throw new Error("Failed fetch blog detail");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching blog detail", error);
    throw new Error("FError fetching blog detail");
  }
};

export const getAllUserBlog = async (userId?: ParamValue) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/users/${userId}`
    );
    if (res.status !== 200) {
      throw new Error("Failed fetch all user blogs");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching blogs", error);
    throw new Error("FError fetching user blogs");
  }
};

export const createBlog = async (userId: string, body: IFormValues) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`,
      {
        ...body,
        userId,
      },
      { withCredentials: true }
    );

    if (!res.data) throw new Error("Error Creating data");

    return res.data;
  } catch (error) {
    console.error("Create Blog:", error);
    throw error;
  }
};

export const updateBlog = async (
  blogId: string,
  userId: string,
  body: IFormValues
) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blogId}`,
      {
        ...body,
        userId,
      },
      { withCredentials: true }
    );

    if (!res.data) throw new Error("Error Updating data");

    return res.data;
  } catch (error) {
    console.error("Updating Blog:", error);
    throw error;
  }
};

export const deleteBlog = async (userId: string, blogId: string) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blogId}`,
      {
        data: {
          userId: userId,
        },
      }
    );
  } catch (error) {
    console.error("Delete failed:", error);
  }
};
