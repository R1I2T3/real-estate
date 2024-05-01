import { createContext, useContext, useState, ReactNode } from "react";
interface User {
  email: string;
  id: string;
  imageUrl: string;
}

interface AuthContextType {
  user: User;
  setUser: (value: User) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: { email: "", id: "", imageUrl: "" },
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("real-estate-user")) || null
  );
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
