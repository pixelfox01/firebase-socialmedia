import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Home = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <h1 className="text-3xl m-4 font-bold">Welcome {user?.displayName}</h1>
      <div className="flex justify-center">
        {user && (
          <img
            src={user?.photoURL || ""}
            alt=""
            className="w-48 h-48 rounded-xl"
          />
        )}
      </div>
    </div>
  );
};
