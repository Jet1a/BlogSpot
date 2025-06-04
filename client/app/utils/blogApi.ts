import axios from "axios";
import { IFormValues } from "../components/ui/Input";

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

    if (!res.data) throw new Error("Error response data");

    return res.data;
  } catch (error) {
    console.error("Create Blog:", error);
    throw error;
  }
};
