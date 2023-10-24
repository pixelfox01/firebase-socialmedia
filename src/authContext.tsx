import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User as firebaseUser } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";

interface AuthContextProps {
  currentUser: firebaseUser | null | undefined;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context.currentUser;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState<
    firebaseUser | null | undefined
  >(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
