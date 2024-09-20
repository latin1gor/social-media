import { createContext, PropsWithChildren, useState } from "react";
import { User } from "@supabase/auth-js";
import { ImagePickerAsset } from "expo-image-picker";

export interface ICustomUser extends User {
  image?: string | ImagePickerAsset | null | undefined;
  address?: string;
  name?: string;
  phoneNumber?: string;
  bio?: string;
}

interface IAuthContext {
  user: ICustomUser | null;
  setAuth: (user: ICustomUser | null) => void;
  setUserData: (user: ICustomUser) => void;
}

const defaultValue: IAuthContext = {
  user: null,
  setAuth: () => {},
  setUserData: () => {},
};

export const AuthContext = createContext<IAuthContext>(defaultValue);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<ICustomUser | null>(null);

  const setAuth = (authUser: ICustomUser | null) => setUser(authUser);

  const setUserData = (data: ICustomUser | null) =>
    setUser((prevUser) => (prevUser ? { ...prevUser, ...data } : data));

  return (
    <AuthContext.Provider value={{ user, setAuth, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
