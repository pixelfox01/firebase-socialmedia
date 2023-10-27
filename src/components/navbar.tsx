import { Link } from "react-router-dom";
import { logout } from "../helpers/logout";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 flex h-20 p-4 text-xl text-white items-center">
      <div className="min-h-full min-w-fit border-r-2 border-r-white pl-2 pr-4 flex items-center">
        <Link to="/">
          <h2>Firebase Social Media</h2>
        </Link>
      </div>
      {user === null ? (
        <div className=" w-full flex justify-end px-4">
          <Link
            to="/login"
            className="flex items-center hover:underline underline-offset-4"
          >
            Login
          </Link>
        </div>
      ) : (
        <div className="w-full px-4 flex justify-between">
          <Link
            to="/create-post"
            className="flex items-center h-[40px] bg-blue-600 hover:bg-blue-700 rounded-md px-4 ml-4 text-lg"
          >
            Create Post
          </Link>
          <div className="flex items-center">
            <div className="flex items-center mx-6">
              <img
                src={user?.photoURL || ""}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="flex items-center hover:underline underline-offset-4"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
