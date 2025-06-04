import axios from "axios";
import { IFormValues } from "../components/ui/Input";

export const authSignup = async (body: IFormValues) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/signup`,
      body,
      { withCredentials: true }
    );
    if (!res.data) throw new Error("Error response data");
    return res.data;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

export const authLogin = async (body: IFormValues) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`,
      body,
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const authLogout = async () => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/logout`,
      {},
      { withCredentials: true }
    );
    if (!res.data) throw new Error("Error response data");
    return res.data;
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};

export const getSession = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/session`,
      {
        withCredentials: true,
      }
    );
    if (!res.data) throw new Error("Error response data");
    return res.data;
  } catch (error) {
    console.error("Get Session Error", error);
    throw error;
  }
};
