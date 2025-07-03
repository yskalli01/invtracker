import type { ReactNode} from 'react';

import { createContext, useReducer, useContext, useState, useCallback, useEffect } from 'react';

import { useRouter } from 'src/routes/hooks';

import { axios } from 'src/api';

import { UserProps } from 'src/sections/user/config';
import { LoginProps, RegisterProps } from 'src/sections/auth/config';

export interface AuthContextType {
    user: UserProps | undefined;
    login: (data: LoginProps) => Promise<boolean | undefined>;
    register: (data: RegisterProps, filePath: File | null) => Promise<boolean | undefined>;
    logout: () => void;
    isAuthenticated : boolean
}

const AuthContext = createContext<AuthContextType | null>(null);


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | undefined>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : undefined;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() =>
      localStorage.getItem("isAuth") === "true"
  );

  const router = useRouter();
  
  const login = useCallback(async (data: LoginProps) => {
    try {
      console.log(data);
      const response = await axios.post("users/login", data);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data)); // Save user
      localStorage.setItem("isAuth", "true");
      // console.log("The login ",response.data)
      setIsAuthenticated(true);
      router.push('/');
    } catch (error) {
      console.log(error);
      return false;
    }
  }, [router]);

  const register = useCallback(async (data: RegisterProps, filePath: File | null) => {
    try {
      const formData = new FormData();

      const registerData = {
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
        country: data.country,
        password: data.password,
      };

      // console.log(registerData);

      formData.append("user", new Blob([JSON.stringify(registerData)], { type: "application/json" }));

      if (filePath) {
        formData.append("image", filePath);
      }

      const response = await axios.post("users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("The register ",response.data);

      setUser(response.data);
      // console.log(response.data)
      localStorage.setItem("user", JSON.stringify(response.data)); // Save user
      localStorage.setItem("isAuth", "true");
      setIsAuthenticated(true);
      router.push('/');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuth");
    setUser(undefined);
    setIsAuthenticated(false);
    router.push('/');
  }, [router]);


  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
  
  
// Custom hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useContextHook must be used within its corresponding Provider');
      }
    return context;
};