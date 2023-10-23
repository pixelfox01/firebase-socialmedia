import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Main = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <h1>Welcome {user?.displayName}</h1>
      <div className="flex justify-center">
        {user && (
          <img src={user?.photoURL || ""} alt="" className="w-48 h-48" />
        )}
      </div>
    </div>
  );
};
