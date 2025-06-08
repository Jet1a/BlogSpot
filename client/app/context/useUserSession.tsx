"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../types/userType";
import { authLogout, getSession } from "../utils/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"

interface UserSessionContextType {
  user: IUser | null;
  loading: boolean;
  logout: () => void;
}

const UserSessionContext = createContext<UserSessionContextType>({
  user: null,
  loading: true,
  logout: () => {},
});

export const useUserSession = () => useContext(UserSessionContext);

export const UserSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getSession();
        if (data?.user?._id) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user session:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    authLogout();
    toast.success("Logout Success");
    setUser(null);
    router.push("/");
  };

  return (
    <UserSessionContext value={{ user, loading, logout }}>
      {children}
    </UserSessionContext>
  );
};
