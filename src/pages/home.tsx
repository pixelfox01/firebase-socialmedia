import { useAuth } from "../authContext";

export const Home = () => {
  const user = useAuth();
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
